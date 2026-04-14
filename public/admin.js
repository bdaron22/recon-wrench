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
      html += `<tr>
        <td>${esc(u.name)}</td>
        <td>${esc(u.username)}</td>
        <td><span class="role-badge role-${u.role}">${u.role}</span></td>
        <td><span class="status-badge status-${u.active ? 'active' : 'inactive'}">${u.active ? 'Active' : 'Inactive'}</span></td>
        <td>
          <button class="btn-sm" onclick="toggleUser('${u.id}', ${!u.active})">${u.active ? 'Deactivate' : 'Activate'}</button>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = '<p class="error">Failed to load users.</p>';
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
