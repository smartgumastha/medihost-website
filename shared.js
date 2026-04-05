var MEDIHOST = {
  API_BASE: 'https://smartgumastha-backend-production.up.railway.app',
  FRONTEND_URL: 'https://medihost.in',
  APP_URL: 'https://app.hemato.in',
  ADMIN_KEY: 'MediHost@2026',
  TOKEN_KEY: 'medihost_token',
  PARTNER_KEY: 'medihost_partner',

  getToken: function() {
    try { return localStorage.getItem(this.TOKEN_KEY); } catch(e) { return null; }
  },

  saveAuth: function(token, partner) {
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      if (partner) localStorage.setItem(this.PARTNER_KEY, JSON.stringify(partner));
    } catch(e) { console.error('Auth save error:', e); }
  },

  getPartner: function() {
    try {
      var data = localStorage.getItem(this.PARTNER_KEY);
      return data ? JSON.parse(data) : null;
    } catch(e) { return null; }
  },

  logout: function() {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.PARTNER_KEY);
    } catch(e) {}
    window.location.href = this.FRONTEND_URL;
  },

  isLoggedIn: function() {
    return !!this.getToken();
  },

  // Use relative /api/ path to go through Vercel proxy (avoids CORS)
  // Falls back to direct API_BASE for non-medihost domains
  _apiUrl: function(path) {
    var host = window.location.hostname;
    if (host === 'medihost.in' || host === 'www.medihost.in' || host === 'localhost' || host === '127.0.0.1') {
      return path; // Vercel proxies /api/* to Railway backend
    }
    return this.API_BASE + path;
  },

  apiGet: function(path) {
    var headers = { 'Content-Type': 'application/json' };
    var token = this.getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(this._apiUrl(path), { method: 'GET', headers: headers }).then(function(r) { return r.json(); });
  },

  apiPost: function(path, body) {
    var headers = { 'Content-Type': 'application/json' };
    var token = this.getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(this._apiUrl(path), { method: 'POST', headers: headers, body: JSON.stringify(body) }).then(function(r) { return r.json(); });
  },

  apiPut: function(path, body) {
    var headers = { 'Content-Type': 'application/json' };
    var token = this.getToken();
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(this._apiUrl(path), { method: 'PUT', headers: headers, body: JSON.stringify(body) }).then(function(r) { return r.json(); });
  },

  adminGet: function(path) {
    return fetch(this.API_BASE + path, { method: 'GET', headers: { 'Content-Type': 'application/json', 'x-admin-key': this.ADMIN_KEY } }).then(function(r) { return r.json(); });
  },

  adminPost: function(path, body) {
    return fetch(this.API_BASE + path, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': this.ADMIN_KEY }, body: JSON.stringify(body) }).then(function(r) { return r.json(); });
  },

  adminPut: function(path, body) {
    return fetch(this.API_BASE + path, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-key': this.ADMIN_KEY }, body: JSON.stringify(body) }).then(function(r) { return r.json(); });
  },

  adminDelete: function(path) {
    return fetch(this.API_BASE + path, { method: 'DELETE', headers: { 'Content-Type': 'application/json', 'x-admin-key': this.ADMIN_KEY } }).then(function(r) { return r.json(); });
  },

  timeAgo: function(timestamp) {
    if (!timestamp) return 'Never';
    var seconds = Math.floor((Date.now() - Number(timestamp)) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + 'm ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + 'h ago';
    if (seconds < 2592000) return Math.floor(seconds / 86400) + 'd ago';
    return new Date(Number(timestamp)).toLocaleDateString('en-IN');
  },

  formatPrice: function(amount) {
    if (!amount || amount === 0) return 'Free';
    return '\u20B9' + Number(amount).toLocaleString('en-IN');
  },

  getParam: function(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  },

  toast: function(message, type) {
    type = type || 'success';
    var colors = { success: '#1D9E75', error: '#E24B4A', warning: '#EF9F27', info: '#378ADD' };
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;top:20px;right:20px;padding:12px 20px;border-radius:8px;color:#fff;font-size:14px;font-family:Inter,sans-serif;z-index:99999;opacity:0;transform:translateY(-10px);transition:all 0.3s;background:' + (colors[type] || colors.success);
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(function() { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 10);
    setTimeout(function() { el.style.opacity = '0'; el.style.transform = 'translateY(-10px)'; setTimeout(function() { el.remove(); }, 300); }, 3000);
  }
};
