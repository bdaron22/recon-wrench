// Shared auth utilities for Recon Wrench

function getToken() {
  return localStorage.getItem('rw_token');
}

function getUser() {
  const data = localStorage.getItem('rw_user');
  return data ? JSON.parse(data) : null;
}

function isLoggedIn() {
  return !!getToken();
}

function isAdmin() {
  const user = getUser();
  return user && user.role === 'admin';
}

function logout() {
  localStorage.removeItem('rw_token');
  localStorage.removeItem('rw_user');
  window.location.href = '/login.html';
}

async function authFetch(url, options = {}) {
  const token = getToken();
  if (!options.headers) options.headers = {};
  if (token) options.headers['Authorization'] = 'Bearer ' + token;
  if (!options.headers['Content-Type'] && options.body) {
    options.headers['Content-Type'] = 'application/json';
  }
  const res = await fetch(url, options);
  if (res.status === 401) {
    logout();
    return;
  }
  return res;
}

function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = '/login.html';
  }
}

function requireAdminAccess() {
  requireLogin();
  if (!isAdmin()) {
    window.location.href = '/';
  }
}
