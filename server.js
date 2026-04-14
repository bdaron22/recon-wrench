require('dotenv').config();
const express = require('express');
const path = require('path');
const PocketBase = require('pocketbase/cjs');

const app = express();
const PORT = process.env.PORT || 3003;
const PB_URL = process.env.POCKETBASE_URL;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create a fresh PocketBase client per request (avoids shared auth state)
function getPb() {
  const client = new PocketBase(PB_URL);
  client.autoCancellation(false);
  return client;
}

// Auth middleware — validates token from Authorization header
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const client = getPb();
    client.authStore.save(token);
    const user = await client.collection('staff').authRefresh();
    if (!user.record.active) {
      return res.status(403).json({ error: 'Account deactivated' });
    }
    req.user = user.record;
    req.pb = client;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Admin middleware — must be called after requireAuth
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'recon-wrench', timestamp: new Date().toISOString() });
});

// --- Auth endpoints ---

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const client = getPb();
    // PocketBase uses email as identity field — we store usernames as email@bobeuckman.local
    const identity = username.includes('@') ? username : username + '@bobeuckman.local';
    const auth = await client.collection('staff').authWithPassword(identity, password);
    if (!auth.record.active) {
      return res.status(403).json({ error: 'Account deactivated. Contact your admin.' });
    }
    res.json({
      token: auth.token,
      user: {
        id: auth.record.id,
        username: auth.record.email.split('@')[0],
        name: auth.record.name,
        role: auth.record.role
      }
    });
  } catch (err) {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get('/api/auth/me', requireAuth, (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.email ? req.user.email.split('@')[0] : req.user.id,
    name: req.user.name,
    role: req.user.role
  });
});

// --- Repair endpoints ---

app.post('/api/repairs', requireAuth, async (req, res) => {
  try {
    const { repair_type, concern, condition, correction } = req.body;
    if (!repair_type || !concern || !condition || !correction) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const record = await req.pb.collection('repairs').create({
      repair_type,
      concern,
      condition,
      correction,
      created_by: req.user.id
    });
    res.json({ success: true, id: record.id });
  } catch (err) {
    console.error('PocketBase error:', err.message);
    res.json({ success: false, error: 'Failed to log repair, but your text was generated.' });
  }
});

// --- Admin endpoints ---

app.get('/api/admin/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await req.pb.collection('staff').getFullList({ filter: 'id != ""' });
    res.json(users.map(u => ({
      id: u.id,
      username: u.email ? u.email.split('@')[0] : u.id,
      name: u.name,
      role: u.role,
      active: u.active,
      created: u.created
    })));
  } catch (err) {
    console.error('List users error:', err.message);
    res.status(500).json({ error: 'Failed to load users' });
  }
});

app.post('/api/admin/users', requireAuth, requireAdmin, async (req, res) => {
  const { username, password, name, role } = req.body;
  if (!username || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    const email = username.toLowerCase() + '@bobeuckman.local';
    const record = await req.pb.collection('staff').create({
      email,
      password,
      passwordConfirm: password,
      name,
      role,
      active: true
    });
    res.json({ success: true, id: record.id });
  } catch (err) {
    console.error('Create user error:', err.message);
    res.status(400).json({ error: err.message || 'Failed to create user' });
  }
});

app.patch('/api/admin/users/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const updates = {};
    if (req.body.active !== undefined) updates.active = req.body.active;
    if (req.body.role) updates.role = req.body.role;
    if (req.body.name) updates.name = req.body.name;
    if (req.body.username) updates.email = req.body.username.toLowerCase() + '@bobeuckman.local';
    if (req.body.password) {
      updates.password = req.body.password;
      updates.passwordConfirm = req.body.password;
    }
    // Use superuser client for admin updates (allows password changes without oldPassword)
    const adminClient = getPb();
    const adminAuth = await adminClient.collection('_superusers').authWithPassword(
      process.env.PB_ADMIN_EMAIL || 'gotobobrent@gmail.com',
      process.env.PB_ADMIN_PASSWORD || 'Emmyslice21!'
    );
    await adminClient.collection('staff').update(req.params.id, updates);
    res.json({ success: true });
  } catch (err) {
    console.error('Update user error:', err.message);
    res.status(400).json({ error: err.message || 'Failed to update user' });
  }
});

app.get('/api/admin/repairs', requireAuth, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 25;
    const result = await req.pb.collection('repairs').getList(page, perPage, {
      sort: '-created',
      expand: 'created_by'
    });
    res.json({
      items: result.items.map(r => ({
        id: r.id,
        repair_type: r.repair_type,
        concern: r.concern,
        condition: r.condition,
        correction: r.correction,
        created: r.created,
        created_by_name: r.expand?.created_by?.name || 'Unknown'
      })),
      page: result.page,
      totalPages: result.totalPages,
      totalItems: result.totalItems
    });
  } catch (err) {
    console.error('List repairs error:', err.message);
    res.status(500).json({ error: 'Failed to load repairs' });
  }
});

app.listen(PORT, () => {
  console.log(`Recon Wrench running on http://localhost:${PORT}`);
});
