require('dotenv').config();
const express = require('express');
const path = require('path');
const PocketBase = require('pocketbase/cjs');

const app = express();
const PORT = process.env.PORT || 3003;
const pb = new PocketBase(process.env.POCKETBASE_URL);
pb.autoCancellation(false);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'recon-wrench', timestamp: new Date().toISOString() });
});

// Log a completed repair order to PocketBase
app.post('/api/repairs', async (req, res) => {
  try {
    const { repair_type, concern, condition, correction } = req.body;
    if (!repair_type || !concern || !condition || !correction) {
      return res.status(400).json({ error: 'All fields required' });
    }
    const record = await pb.collection('repairs').create({
      repair_type,
      concern,
      condition,
      correction
    });
    res.json({ success: true, id: record.id });
  } catch (err) {
    console.error('PocketBase error:', err.message);
    // Still return success to the user — logging failure shouldn't block their work
    res.json({ success: false, error: 'Failed to log repair, but your text was generated.' });
  }
});

app.listen(PORT, () => {
  console.log(`Recon Wrench running on http://localhost:${PORT}`);
});
