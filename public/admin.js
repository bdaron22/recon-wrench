// Require admin
requireAdminAccess();

document.getElementById('logout-btn').addEventListener('click', logout);

// Tab switching
const tabs = document.querySelectorAll('.admin-tab');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    if (tab.dataset.tab === 'history') loadRepairs(1);
  });
});

// --- Users ---
const addUserBtn = document.getElementById('add-user-btn');
const addUserForm = document.getElementById('add-user-form');
const cancelUserBtn = document.getElementById('cancel-user-btn');
const saveUserBtn = document.getElementById('save-user-btn');
const formError = document.getElementById('form-error');

addUserBtn.addEventListener('click', () => {
  addUserForm.classList.remove('hidden');
  addUserBtn.classList.add('hidden');
});

cancelUserBtn.addEventListener('click', () => {
  addUserForm.classList.add('hidden');
  addUserBtn.classList.remove('hidden');
  clearForm();
});

function clearForm() {
  document.getElementById('new-name').value = '';
  document.getElementById('new-username').value = '';
  document.getElementById('new-password').value = '';
  document.getElementById('new-role').value = 'tech';
  formError.classList.add('hidden');
}

saveUserBtn.addEventListener('click', async () => {
  const name = document.getElementById('new-name').value.trim();
  const username = document.getElementById('new-username').value.trim();
  const password = document.getElementById('new-password').value;
  const role = document.getElementById('new-role').value;

  if (!name || !username || !password) {
    formError.textContent = 'All fields are required';
    formError.classList.remove('hidden');
    return;
  }
  if (password.length < 6) {
    formError.textContent = 'Password must be at least 6 characters';
    formError.classList.remove('hidden');
    return;
  }

  saveUserBtn.disabled = true;
  saveUserBtn.textContent = 'Creating...';

  try {
    const res = await authFetch('/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ name, username, password, role })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create user');
    addUserForm.classList.add('hidden');
    addUserBtn.classList.remove('hidden');
    clearForm();
    loadUsers();
  } catch (err) {
    formError.textContent = err.message;
    formError.classList.remove('hidden');
  } finally {
    saveUserBtn.disabled = false;
    saveUserBtn.textContent = 'Create User';
  }
});

async function loadUsers() {
  const container = document.getElementById('users-list');
  container.innerHTML = '<p class="loading">Loading users...</p>';
  try {
    const res = await authFetch('/api/admin/users');
    const users = await res.json();
    if (!users.length) {
      container.innerHTML = '<p>No users found.</p>';
      return;
    }
    let html = '<table class="admin-table"><thead><tr><th>Name</th><th>Username</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
    users.forEach(u => {
      html += `<tr id="user-row-${u.id}">
        <td>${esc(u.name)}</td>
        <td>${esc(u.username)}</td>
        <td><span class="role-badge role-${u.role}">${u.role}</span></td>
        <td><span class="status-badge status-${u.active ? 'active' : 'inactive'}">${u.active ? 'Active' : 'Inactive'}</span></td>
        <td class="action-cell">
          <button class="btn-sm" onclick="showEditUser('${u.id}', '${esc(u.name)}', '${esc(u.username)}', '${u.role}')">Edit</button>
          <button class="btn-sm" onclick="toggleUser('${u.id}', ${!u.active})">${u.active ? 'Deactivate' : 'Activate'}</button>
        </td>
      </tr>
      <tr id="edit-row-${u.id}" class="edit-row hidden">
        <td colspan="5">
          <div class="inline-edit-form">
            <div class="form-row">
              <div class="form-group">
                <label>Display Name</label>
                <input type="text" id="edit-name-${u.id}" value="${esc(u.name)}">
              </div>
              <div class="form-group">
                <label>Username</label>
                <input type="text" id="edit-username-${u.id}" value="${esc(u.username)}">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>New Password <span class="hint">(leave blank to keep current)</span></label>
                <input type="password" id="edit-password-${u.id}" placeholder="Leave blank to keep current">
              </div>
              <div class="form-group">
                <label>Role</label>
                <select id="edit-role-${u.id}">
                  <option value="tech" ${u.role === 'tech' ? 'selected' : ''}>Tech</option>
                  <option value="admin" ${u.role === 'admin' ? 'selected' : ''}>Admin</option>
                </select>
              </div>
            </div>
            <div id="edit-error-${u.id}" class="login-error hidden"></div>
            <div class="form-actions">
              <button class="btn-primary" onclick="saveEditUser('${u.id}')">Save Changes</button>
              <button class="btn-secondary" onclick="cancelEditUser('${u.id}')">Cancel</button>
            </div>
          </div>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = '<p class="error">Failed to load users.</p>';
  }
}

function showEditUser(id) {
  // Hide any other open edit rows
  document.querySelectorAll('.edit-row').forEach(r => r.classList.add('hidden'));
  document.getElementById('edit-row-' + id).classList.remove('hidden');
}

function cancelEditUser(id) {
  document.getElementById('edit-row-' + id).classList.add('hidden');
}

async function saveEditUser(id) {
  const name = document.getElementById('edit-name-' + id).value.trim();
  const username = document.getElementById('edit-username-' + id).value.trim();
  const password = document.getElementById('edit-password-' + id).value;
  const role = document.getElementById('edit-role-' + id).value;
  const errorEl = document.getElementById('edit-error-' + id);
  errorEl.classList.add('hidden');

  if (!name || !username) {
    errorEl.textContent = 'Name and username are required';
    errorEl.classList.remove('hidden');
    return;
  }
  if (password && password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters';
    errorEl.classList.remove('hidden');
    return;
  }

  const updates = { name, username, role };
  if (password) updates.password = password;

  try {
    const res = await authFetch('/api/admin/users/' + id, {
      method: 'PATCH',
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update user');
    loadUsers();
  } catch (err) {
    errorEl.textContent = err.message;
    errorEl.classList.remove('hidden');
  }
}

async function toggleUser(id, active) {
  try {
    await authFetch('/api/admin/users/' + id, {
      method: 'PATCH',
      body: JSON.stringify({ active })
    });
    loadUsers();
  } catch (err) {
    alert('Failed to update user');
  }
}

// --- Repair History ---
let currentPage = 1;

async function loadRepairs(page) {
  currentPage = page;
  const container = document.getElementById('repairs-list');
  container.innerHTML = '<p class="loading">Loading repair history...</p>';
  try {
    const res = await authFetch('/api/admin/repairs?page=' + page + '&perPage=15');
    const data = await res.json();
    if (!data.items || !data.items.length) {
      container.innerHTML = '<p>No repair orders found.</p>';
      document.getElementById('pagination').innerHTML = '';
      return;
    }
    let html = '<table class="admin-table"><thead><tr><th>Date</th><th>User</th><th>Repair Type</th><th>Concern</th></tr></thead><tbody>';
    data.items.forEach(r => {
      const date = new Date(r.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
      html += `<tr>
        <td class="nowrap">${date}</td>
        <td>${esc(r.created_by_name)}</td>
        <td>${esc(r.repair_type)}</td>
        <td class="truncate">${esc(r.concern)}</td>
      </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;

    // Pagination
    let pagHtml = '';
    if (data.totalPages > 1) {
      for (let i = 1; i <= data.totalPages; i++) {
        pagHtml += `<button class="page-btn${i === currentPage ? ' active' : ''}" onclick="loadRepairs(${i})">${i}</button>`;
      }
    }
    document.getElementById('pagination').innerHTML = pagHtml;
  } catch (err) {
    container.innerHTML = '<p class="error">Failed to load repair history.</p>';
  }
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

// Init
loadUsers();
