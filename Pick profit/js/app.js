const STORAGE = {
  users: 'pick_profit_users',
  predictions: 'pick_profit_predictions',
  vip: 'pick_profit_vip',
  notifications: 'pick_profit_notifications',
  session: 'pick_profit_session',
  payments: 'pick_profit_payments',
  paymentSettings: 'pick_profit_payment_settings',
  rememberMe: 'pick_profit_remember_me',
  chat: 'pick_profit_chat_messages'
};

const demoUsers = [
  {
    id: 'admin-1',
    fullName: 'Pick Profit Admin',
    username: 'admin',
    email: 'admin@pickprofit.com',
    phone: '+2348000000000',
    password: 'admin123',
    role: 'admin',
    vipStatus: 'inactive',
    vipExpiresAt: '',
    paymentSubmittedAt: '',
    paymentScreenshot: '',
    profileImage: '',
    accountStatus: 'active',
    suspensionReason: '',
    suspendedAt: '',
    restoredAt: '',
    adminNote: '',
    createdAt: new Date().toISOString()
  }
];

const demoPredictions = [
  {
    id: 'pred-1',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    matchDate: '2026-10-15',
    kickoffTime: '18:00',
    market: 'Over 1.5 Goals',
    selection: 'Over 1.5',
    odds: '1.67',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pred-2',
    homeTeam: 'Barcelona',
    awayTeam: 'Real Madrid',
    league: 'La Liga',
    matchDate: '2026-10-16',
    kickoffTime: '20:00',
    market: 'Both Teams To Score',
    selection: 'Yes',
    odds: '1.82',
    status: 'WON',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pred-3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    league: 'Bundesliga',
    matchDate: '2026-10-17',
    kickoffTime: '17:30',
    market: 'Home Win',
    selection: 'Bayern Munich',
    odds: '1.54',
    status: 'LOST',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'pred-4',
    homeTeam: 'Liverpool',
    awayTeam: 'Man City',
    league: 'Premier League',
    matchDate: '2026-10-18',
    kickoffTime: '19:45',
    market: 'Double Chance',
    selection: 'Liverpool or Draw',
    odds: '1.43',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const demoVIP = [
  {
    id: 'vip-1',
    homeTeam: 'Inter Milan',
    awayTeam: 'Juventus',
    league: 'Serie A',
    matchDate: '2026-10-20',
    kickoffTime: '21:00',
    market: '1X2',
    selection: 'Inter Milan Win',
    odds: '1.92',
    accent: 'Featured Pick',
    createdAt: new Date().toISOString()
  },
  {
    id: 'vip-2',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    league: 'Ligue 1',
    matchDate: '2026-10-21',
    kickoffTime: '20:30',
    market: 'Over 2.5 Goals',
    selection: 'Over 2.5',
    odds: '1.79',
    accent: 'Premium Edge',
    createdAt: new Date().toISOString()
  }
];

const defaultNotifications = [
  { id: 'n-1', userId: null, type: 'info', title: 'Welcome to PICK PROFIT', message: 'Your premium match insights are ready for today.', createdAt: new Date().toISOString(), read: false },
  { id: 'n-2', userId: null, type: 'warning', title: 'VIP update', message: 'Two featured VIP locks are available for members only.', createdAt: new Date().toISOString(), read: false }
];

const defaultChatMessages = [
  {
    id: 'chat-demo-1',
    userId: 'demo-member',
    sender: 'member',
    senderName: 'Ayo Johnson',
    text: 'Hi admin, I just paid for the VIP package and need confirmation.',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: 'chat-demo-2',
    userId: 'demo-member',
    sender: 'admin',
    senderName: 'Pick Profit Admin',
    text: 'Thanks for reaching out. Your payment is being reviewed and we will confirm shortly.',
    createdAt: new Date(Date.now() - 1000 * 60 * 24).toISOString()
  }
];

const demoPalmPay = {
  accountName: 'PICK PROFIT LIMITED',
  accountNumber: '09034502975',
  accountPhone: '+2348100000001'
};

const demoPaymentSettings = {
  id: 'primary-palmpay',
  provider: 'PalmPay',
  accountHolderName: 'PICK PROFIT LIMITED',
  accountNumber: '09034502975',
  contactReference: '9166990914',
  whatsappSupport: '+234 916 548 7057',
  paymentInstructions: 'Send the VIP payment to the verified PalmPay account above, then upload the payment screenshot for review.',
  vipPrice: 5000,
  subscriptionDurationDays: 30,
  published: true,
  lastUpdated: new Date().toISOString(),
  isActive: true
};

const currency = '₦';
const THEME_KEY = 'pick_profit_theme';
let page = document.body.dataset.page || 'home';

function getStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function setStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createNotification({ userId = null, type = 'info', title, message }) {
  const notifications = getStored(STORAGE.notifications, []);
  const item = { id: `n-${Date.now()}-${Math.random().toString(16).slice(2)}`, userId, type, title, message, createdAt: new Date().toISOString(), read: false };
  notifications.unshift(item);
  setStored(STORAGE.notifications, notifications);
  return item;
}

function getNotificationsForUser(user) {
  const all = getStored(STORAGE.notifications, []);
  if (!user) return all.filter((item) => !item.userId);
  return all.filter((item) => !item.userId || item.userId === user.id);
}

function getUsers() {
  return getStored(STORAGE.users, demoUsers);
}

function getPaymentSettings() {
  return getStored(STORAGE.paymentSettings, demoPaymentSettings);
}

function getPublishedPaymentSettings() {
  const settings = getPaymentSettings();
  return settings && settings.published ? settings : demoPaymentSettings;
}

function getChatMessages() {
  return getStored(STORAGE.chat, defaultChatMessages);
}

function getPredictions() {
  return getStored(STORAGE.predictions, demoPredictions);
}

function getVIPTips() {
  return getStored(STORAGE.vip, demoVIP);
}

function getCurrentUser() {
  const session = getStored(STORAGE.session, null);
  if (!session || !session.userId) return null;
  const users = getUsers();
  return users.find((user) => user.id === session.userId) || null;
}

function setCurrentUser(user) {
  setStored(STORAGE.session, user ? { userId: user.id } : null);
}

function getUserAvatar(user, size = 'small') {
  if (!user) return '';
  const image = user.profileImage || '';
  if (image) return `<img src="${image}" alt="${user.fullName || 'User'} profile" class="avatar-image avatar-${size}" />`;
  const initials = (user.fullName || user.username || 'U').split(' ').map((part) => part.charAt(0)).slice(0, 2).join('').toUpperCase();
  return `<span class="avatar-fallback avatar-${size}">${initials}</span>`;
}

function getThemePreference() {
  const storedValue = localStorage.getItem(THEME_KEY);
  if (storedValue === 'dark' || storedValue === 'light') return storedValue;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', nextTheme);
  localStorage.setItem(THEME_KEY, nextTheme);

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const icon = button.querySelector('.theme-toggle-icon');
    const label = button.querySelector('.theme-label');
    if (icon) {
      icon.textContent = nextTheme === 'dark' ? '☀️' : '🌙';
    }
    if (label) {
      label.textContent = nextTheme === 'dark' ? 'Light mode' : 'Dark mode';
    }
    if (button.dataset.themeLabel) {
      button.setAttribute('aria-label', nextTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  });
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function buildUserDisplay(user) {
  if (!user) return { name: 'Member', username: '', status: 'active' };
  return {
    name: user.fullName || user.username || 'Member',
    username: user.username || '',
    status: user.accountStatus || 'active'
  };
}

function seedData() {
  const users = getUsers();
  users.forEach((user) => {
    user.profileImage = user.profileImage || '';
    user.accountStatus = user.accountStatus || 'active';
    user.suspensionReason = user.suspensionReason || '';
    user.suspendedAt = user.suspendedAt || '';
    user.restoredAt = user.restoredAt || '';
    user.adminNote = user.adminNote || '';
  });
  setStored(STORAGE.users, users);

  if (!localStorage.getItem(STORAGE.predictions)) {
    setStored(STORAGE.predictions, demoPredictions);
  }
  if (!localStorage.getItem(STORAGE.vip)) {
    setStored(STORAGE.vip, demoVIP);
  }
  if (!localStorage.getItem(STORAGE.notifications)) {
    setStored(STORAGE.notifications, defaultNotifications);
  }
  if (!localStorage.getItem(STORAGE.payments)) {
    setStored(STORAGE.payments, []);
  }
  if (!localStorage.getItem(STORAGE.paymentSettings)) {
    setStored(STORAGE.paymentSettings, demoPaymentSettings);
  }
  if (!localStorage.getItem(STORAGE.chat)) {
    setStored(STORAGE.chat, defaultChatMessages);
  }
}

function statusLabel(status) {
  return status ? status.toUpperCase() : 'PENDING';
}

function renderHeader() {
  const currentUser = getCurrentUser();
  const notifications = getNotificationsForUser(currentUser).slice(0, 6);
  const firstName = currentUser ? currentUser.fullName.split(' ')[0] : 'Account';
  const header = document.getElementById('site-header');
  const currentHash = window.location.hash;
  const isActivePage = (targetPage, hash = '') => page === targetPage && (!hash || currentHash === hash);

  if (!header) return;

  const nav = `
    <div class="topbar" id="mainTopbar">
      <div class="topbar-inner">
        <a href="index.html" class="brand" aria-label="PICK PROFIT home">
          <span class="logo-wrap" aria-hidden="true">
            <span class="logo-ball"></span>
            <span class="logo-arrow"></span>
            <span class="logo-check"></span>
          </span>
          <span class="brand-wordmark"><strong>PICK</strong> PROFIT</span>
        </a>

        <nav class="main-nav" aria-label="Primary navigation">
          <a href="index.html" class="${isActivePage('home') ? 'active' : ''}">Home</a>
          <a href="free-tips.html" class="${isActivePage('free-tips') ? 'active' : ''}">Free Tips</a>
          <a href="vip.html" class="${isActivePage('vip') ? 'active' : ''}">VIP Predictions</a>
          <a href="chat.html" class="${isActivePage('chat') ? 'active' : ''}">Chat</a>
          <a href="dashboard.html" class="${isActivePage('dashboard') ? 'active' : ''}">Dashboard</a>
          <details class="nav-more">
            <summary class="${isActivePage('payment') || isActivePage('admin') || isActivePage('home', '#results') || isActivePage('home', '#how-it-works') || isActivePage('home', '#contact') ? 'active' : ''}">More</summary>
            <div class="nav-more-menu">
              <a href="payment.html" class="${isActivePage('payment') ? 'active' : ''}">VIP Payment</a>
              <a href="index.html#results" class="${isActivePage('home', '#results') ? 'active' : ''}">Results</a>
              <a href="index.html#how-it-works" class="${isActivePage('home', '#how-it-works') ? 'active' : ''}">How It Works</a>
              <a href="index.html#contact" class="${isActivePage('home', '#contact') ? 'active' : ''}">Contact</a>
              ${currentUser && currentUser.role === 'admin' ? `<a href="admin.html" class="${isActivePage('admin') ? 'active' : ''}">Admin Panel</a>` : ''}
            </div>
          </details>
        </nav>

        <div class="top-actions">
          <button type="button" class="icon-btn" id="themeToggle" data-theme-toggle aria-label="Toggle theme">
            <span class="theme-toggle-icon">${document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}</span>
          </button>
          <div class="notification-wrap">
            <button type="button" class="icon-btn" id="notificationToggle" aria-label="Notifications" aria-expanded="false" aria-controls="notificationPanel">
              <span>🔔</span>
              <span class="bell-count">${notifications.length}</span>
            </button>
            <div id="notificationPanel" class="notification-panel" aria-live="polite">
              <ul class="notification-list">
                ${notifications.length ? notifications.map((item) => `
                  <li>
                    <div class="notification-meta">
                      <span class="notification-badge ${item.type}">${item.type}</span>
                      <span>${new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div><strong>${item.title}</strong></div>
                    <div>${item.message}</div>
                  </li>
                `).join('') : '<li><div class="empty-state">No notifications yet.</div></li>'}
              </ul>
            </div>
          </div>

          ${currentUser ? `
            <div class="user-menu" tabindex="0">
              <span class="avatar">${getUserAvatar(currentUser, 'small')}</span>
              <span>${firstName}</span>
              <div class="menu-dropdown">
                <a href="dashboard.html">Dashboard</a>
                <a href="chat.html">Support Chat</a>
                <a href="payment.html">VIP Payment</a>
                <a href="vip.html">VIP Picks</a>
                ${currentUser.role === 'admin' ? '<a href="admin.html">Admin Panel</a>' : ''}
                <button type="button" id="logoutButton">Logout</button>
              </div>
            </div>
          ` : `
            <a href="auth.html" class="nav-pill">Login</a>
            <a href="auth.html?mode=register" class="btn btn-primary">Register</a>
          `}
          <button type="button" class="icon-btn mobile-toggle" id="mobileMenuButton" aria-label="Open menu" aria-expanded="false" aria-controls="mobileDrawer"><span aria-hidden="true">☰</span></button>
        </div>
      </div>
      <div class="mobile-drawer" id="mobileDrawer">
        <div class="mobile-nav">
          <div class="mobile-nav-group">
            <span class="mobile-nav-label">Explore</span>
            <a href="index.html" class="${isActivePage('home') ? 'active' : ''}">Home</a>
            <a href="free-tips.html" class="${isActivePage('free-tips') ? 'active' : ''}">Free Tips</a>
            <a href="vip.html" class="${isActivePage('vip') ? 'active' : ''}">VIP Predictions</a>
          </div>
          <div class="mobile-nav-group">
            <span class="mobile-nav-label">${currentUser ? 'Your account' : 'Member access'}</span>
            ${currentUser ? `
              <a href="dashboard.html" class="${isActivePage('dashboard') ? 'active' : ''}">Dashboard</a>
              <a href="payment.html" class="${isActivePage('payment') ? 'active' : ''}">VIP Payment</a>
              <a href="chat.html" class="${isActivePage('chat') ? 'active' : ''}">Support Chat</a>
              ${currentUser.role === 'admin' ? `<a href="admin.html" class="${isActivePage('admin') ? 'active' : ''}">Admin Panel</a>` : ''}
            ` : `
              <a href="auth.html">Login</a>
              <a href="auth.html?mode=register">Create account</a>
            `}
          </div>
          <div class="mobile-nav-group">
            <span class="mobile-nav-label">More</span>
            <a href="index.html#results" class="${isActivePage('home', '#results') ? 'active' : ''}">Results</a>
            <a href="index.html#how-it-works" class="${isActivePage('home', '#how-it-works') ? 'active' : ''}">How It Works</a>
            <a href="index.html#contact" class="${isActivePage('home', '#contact') ? 'active' : ''}">Contact</a>
          </div>
          <div class="mobile-nav-actions">
            ${currentUser ? '<button type="button" id="mobileLogoutButton" class="mobile-logout">Log out</button>' : ''}
            <button type="button" class="theme-switch theme-switch-mobile" data-theme-toggle>
              <span class="theme-label">${document.body.getAttribute('data-theme') === 'dark' ? 'Light mode' : 'Dark mode'}</span>
              <span class="theme-toggle-icon">${document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  header.innerHTML = nav;

  const notificationToggle = document.getElementById('notificationToggle');
  const notificationPanel = document.getElementById('notificationPanel');
  const mobileMenuButton = document.getElementById('mobileMenuButton');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const themeToggle = document.getElementById('themeToggle');

  if (notificationToggle && notificationPanel) {
    notificationToggle.addEventListener('click', () => {
      const isOpen = notificationPanel.classList.toggle('show');
      notificationToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
    if (toggle.id === 'themeToggle') return;
    toggle.addEventListener('click', toggleTheme);
  });

  if (mobileMenuButton && mobileDrawer) {
    const closeMobileMenu = () => {
      mobileDrawer.classList.remove('open');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
      mobileMenuButton.setAttribute('aria-label', 'Open menu');
      mobileMenuButton.querySelector('span').textContent = '☰';
    };

    mobileMenuButton.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
      mobileMenuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      mobileMenuButton.querySelector('span').textContent = isOpen ? '×' : '☰';
    });

    mobileDrawer.querySelectorAll('a, button').forEach((item) => {
      if (item.id !== 'mobileLogoutButton' && !item.matches('[data-theme-toggle]')) {
        item.addEventListener('click', closeMobileMenu);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMobileMenu();
    });
  }

  const logoutButton = document.getElementById('logoutButton');
  const mobileLogoutButton = document.getElementById('mobileLogoutButton');

  [logoutButton, mobileLogoutButton].forEach((button) => {
    if (button) {
      button.addEventListener('click', () => {
        setCurrentUser(null);
        window.location.href = 'index.html';
      });
    }
  });

  const topbar = document.getElementById('mainTopbar');
  if (topbar) {
    window.addEventListener('scroll', () => {
      topbar.classList.toggle('compact', window.scrollY > 12);
    });
  }
}

function renderHomePage() {
  const predictions = getPredictions().slice(0, 3);
  const vip = getVIPTips().slice(0, 2);
  const currentUser = getCurrentUser();
  const vipUnlocked = currentUser && currentUser.vipStatus === 'active';

  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <div class="eyebrow">Smart Predictions. Better Decisions.</div>
          <h1>Make Every <span class="accent">Prediction</span> Count.</h1>
          <p>Explore football predictions, track match results, and unlock premium selections with PICK PROFIT.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="free-tips.html">Explore Free Tips</a>
            <a class="btn btn-warning" href="vip.html">Unlock VIP Access</a>
          </div>
          <div class="hero-stats">
            <div class="metric"><strong>Daily</strong><span>Match coverage</span></div>
            <div class="metric"><strong>VIP</strong><span>Premium cards</span></div>
            <div class="metric"><strong>Safe</strong><span>Verified access</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="graph-panel">
            <div class="graph-top">
              <span class="pill">Match Pulse</span>
              <span class="pill" style="background: rgba(255,212,59,0.14); color: #895b00;">Live</span>
            </div>
            <div class="chart-card">
              <svg viewBox="0 0 420 250" preserveAspectRatio="none" role="img" aria-label="Match trend chart">
                <defs>
                  <linearGradient id="chartLine" x1="0" x2="1">
                    <stop offset="0%" stop-color="#13a653"/>
                    <stop offset="100%" stop-color="#ffd43b"/>
                  </linearGradient>
                </defs>
                <path d="M0 190 C80 170, 120 110, 180 125 S260 210, 330 148 S410 60, 420 40 L420 250 L0 250 Z" fill="rgba(19,166,83,0.08)"/>
                <path d="M0 190 C80 170, 120 110, 180 125 S260 210, 330 148 S410 60, 420 40" fill="none" stroke="url(#chartLine)" stroke-width="5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="floating-card top-left">
              <div class="mini-icon">⚽</div>
              <div>
                <div>4 Picks</div>
                <small>Today</small>
              </div>
            </div>
            <div class="floating-card top-right">
              <div class="mini-icon">📈</div>
              <div>
                <div>+6.8%</div>
                <small>Momentum</small>
              </div>
            </div>
            <div class="floating-card bottom-left">
              <div class="mini-icon">✓</div>
              <div>
                <div>Confirmed</div>
                <small>Value plays</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="container">
      <section class="section" id="free-tips">
        <div class="section-header">
          <div>
            <div class="eyebrow">Latest picks</div>
            <h2>Today's Free Tips</h2>
          </div>
          <a href="free-tips.html" class="section-link">View all →</a>
        </div>
        <div class="grid-3">
          ${predictions.map((prediction) => renderCard(prediction, false)).join('')}
        </div>
      </section>

      <section class="section" id="vip-picks">
        <div class="section-header">
          <div>
            <div class="eyebrow">Members only</div>
            <h2>Featured VIP Predictions</h2>
          </div>
          <a href="vip.html" class="section-link">Unlock VIP →</a>
        </div>
        <div class="grid-2">
          ${vip.map((tip) => renderVIPCard(tip, vipUnlocked)).join('')}
        </div>
      </section>

      <section class="section" id="results">
        <div class="section-header">
          <div>
            <div class="eyebrow">Outcomes</div>
            <h2>Latest Match Results</h2>
          </div>
        </div>
        <div class="result-grid">
          <div class="result-card card">
            <div class="eyebrow" style="display: inline-flex;">Winning picks</div>
            <strong>12</strong>
            <span>Recent successful selections</span>
          </div>
          <div class="result-card card">
            <div class="eyebrow" style="display: inline-flex;">Pending</div>
            <strong>4</strong>
            <span>Matches still in play</span>
          </div>
          <div class="result-card card">
            <div class="eyebrow" style="display: inline-flex;">VIP access</div>
            <strong>${vipUnlocked ? 'Active' : 'Locked'}</strong>
            <span>${vipUnlocked ? 'Premium access enabled' : 'Upgrade to unlock'}</span>
          </div>
        </div>
      </section>

      <section class="section" id="how-it-works">
        <div class="section-header">
          <div>
            <div class="eyebrow">How it works</div>
            <h2>How PICK PROFIT Works</h2>
          </div>
        </div>
        <div class="steps">
          <div class="step-card card">
            <div class="step-number">1</div>
            <h3>Choose your plan</h3>
            <p>Start with free tips or unlock premium predictions with a VIP subscription.</p>
          </div>
          <div class="step-card card">
            <div class="step-number">2</div>
            <h3>Review insights</h3>
            <p>Track form, market trends and match-day edges before placing your selection.</p>
          </div>
          <div class="step-card card">
            <div class="step-number">3</div>
            <h3>Check the status</h3>
            <p>Follow each prediction and compare results with accurate match updates.</p>
          </div>
          <div class="step-card card">
            <div class="step-number">4</div>
            <h3>Stay informed</h3>
            <p>Use notifications, support, and a clean dashboard to keep everything in sync.</p>
          </div>
        </div>
      </section>

      <section class="section" id="packages">
        <div class="section-header">
          <div>
            <div class="eyebrow">Membership</div>
            <h2>VIP Membership Packages</h2>
          </div>
        </div>
        <div class="package-grid">
          <div class="package-card card">
            <span class="package-tag">Starter</span>
            <div class="price"><strong>${currency}2,500</strong><span>/ month</span></div>
            <p>Perfect for trying premium predictions.</p>
            <ul>
              <li>Access to featured VIP cards</li>
              <li>Daily premium insights</li>
              <li>Match result tracking</li>
            </ul>
            <a href="payment.html" class="btn btn-secondary">Choose Starter</a>
          </div>
          <div class="package-card card featured">
            <span class="package-tag">Most popular</span>
            <div class="price"><strong>${currency}5,000</strong><span>/ month</span></div>
            <p>Best value for serious football followers.</p>
            <ul>
              <li>Two featured VIP picks</li>
              <li>Priority support</li>
              <li>VIP dashboard access</li>
            </ul>
            <a href="payment.html" class="btn btn-primary">Choose Pro</a>
          </div>
          <div class="package-card card">
            <span class="package-tag">Elite</span>
            <div class="price"><strong>${currency}8,000</strong><span>/ month</span></div>
            <p>For high-engagement match analysis and exclusive updates.</p>
            <ul>
              <li>All previous VIP plays</li>
              <li>Priority match coverage</li>
              <li>Direct support access</li>
            </ul>
            <a href="payment.html" class="btn btn-secondary">Choose Elite</a>
          </div>
        </div>
      </section>

      <section class="section" id="faq">
        <div class="section-header">
          <div>
            <div class="eyebrow">Answers</div>
            <h2>Frequently Asked Questions</h2>
          </div>
        </div>
        <div class="accordion">
          <div class="faq-item open">
            <button class="faq-question" type="button">How do I access free tips?<span>+</span></button>
            <div class="faq-answer">
              Visit the free tips page and browse all published predictions. Status updates are managed by the admin and refreshed in real time.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">Is VIP access secure?<span>+</span></button>
            <div class="faq-answer">
              VIP selections are protected and only displayed when the user account has an active membership and a verified payment record.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">How do I pay for VIP membership?<span>+</span></button>
            <div class="faq-answer">
              Use the PalmPay payment page, submit your proof of transfer, and wait for admin approval before the VIP content unlocks.
            </div>
          </div>
          <div class="faq-item">
            <button class="faq-question" type="button">Can I change my password?<span>+</span></button>
            <div class="faq-answer">
              You can reset the password from the login screen or request a password change once logged into the dashboard.
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="contact">
        <div class="support-box">
          <div>
            <div class="eyebrow">WhatsApp support</div>
            <strong>Connect with PICK PROFIT support</strong>
          </div>
          <a href="https://wa.me/2348000000000?text=Hi%20PICK%20PROFIT%2C%20I%20need%20help%20with%20my%20VIP%20membership." class="btn btn-primary" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
        </div>
      </section>
    </main>
  `;

  attachFAQEvents();
}

function renderCard(prediction, isAdmin = false) {
  return `
    <article class="card prediction-card ${isAdmin ? 'admin-card' : ''}">
      <div class="prediction-head">
        <span class="league-badge">${prediction.league}</span>
        <span class="result-badge ${String(prediction.status).toLowerCase()}">${prediction.status}</span>
      </div>
      <div class="matchup">
        <div class="team">
          <span>${prediction.homeTeam}</span>
        </div>
        <span class="vs-pill">VS</span>
        <div class="team">
          <span>${prediction.awayTeam}</span>
        </div>
      </div>
      <div class="prediction-meta">
        <div class="meta-item"><strong>Date</strong><br>${prediction.matchDate}</div>
        <div class="meta-item"><strong>Time</strong><br>${prediction.kickoffTime}</div>
        <div class="meta-item"><strong>Market</strong><br>${prediction.market}</div>
        <div class="meta-item"><strong>Odds</strong><br>${prediction.odds || 'N/A'}</div>
      </div>
      <div class="prediction-cta">
        <div class="selection-box">
          <span>Prediction</span>
          <strong>${prediction.selection}</strong>
        </div>
        ${isAdmin ? '<span class="pill">Admin View</span>' : '<span class="pill">Status: Active</span>'}
      </div>
    </article>
  `;
}

function renderVIPCard(tip, unlocked) {
  const isLocked = !unlocked;
  return `
    <article class="card vip-featured ${isLocked ? 'locked' : ''}">
      <div class="vip-content">
        <div class="prediction-head">
          <span class="league-badge">${tip.league}</span>
          <span class="pill">${tip.accent}</span>
        </div>
        <div class="matchup">
          <div class="team"><span>${tip.homeTeam}</span></div>
          <span class="vs-pill">VS</span>
          <div class="team"><span>${tip.awayTeam}</span></div>
        </div>
        <div class="prediction-meta">
          <div class="meta-item"><strong>Time</strong><br>${tip.matchDate} • ${tip.kickoffTime}</div>
          <div class="meta-item"><strong>Market</strong><br>${tip.market}</div>
          <div class="meta-item"><strong>Odds</strong><br>${tip.odds}</div>
          <div class="meta-item"><strong>Selection</strong><br>${tip.selection}</div>
        </div>
      </div>
      <div class="lock-overlay">
        <div class="lock-panel">
          <div class="lock-icon">🔒</div>
          <div>VIP MEMBERS ONLY</div>
        </div>
      </div>
      <div class="vip-cta">
        <span class="vip-price">${unlocked ? 'Unlocked' : 'Members only'}</span>
        <a href="payment.html" class="btn ${unlocked ? 'btn-secondary' : 'btn-primary'}">${unlocked ? 'View full access' : 'UNLOCK VIP TIPS'}</a>
      </div>
    </article>
  `;
}

function renderFreeTipsPage() {
  const predictions = getPredictions();
  const app = document.getElementById('app');
  if (!app) return;

  const leagues = [...new Set(predictions.map((item) => item.league))];
  const statuses = ['ALL', 'PENDING', 'WON', 'LOST'];
  const filterLeague = new URLSearchParams(window.location.search).get('league') || 'ALL';
  const filterStatus = new URLSearchParams(window.location.search).get('status') || 'ALL';

  const filtered = predictions.filter((prediction) => {
    const leagueMatch = filterLeague === 'ALL' || prediction.league === filterLeague;
    const statusMatch = filterStatus === 'ALL' || prediction.status === filterStatus;
    return leagueMatch && statusMatch;
  });

  app.innerHTML = `
    <div class="page-header">
      <div class="container page-header-inner">
        <div>
          <div class="eyebrow">Daily football picks</div>
          <h1>Free Tips</h1>
          <p>Track the latest match picks and follow each result as the admin updates the status.</p>
        </div>
        <a href="index.html" class="btn btn-secondary">Back to home</a>
      </div>
    </div>

    <div class="container">
      <div class="filter-panel">
        <label>
          League
          <select id="leagueFilter">
            <option value="ALL">All leagues</option>
            ${leagues.map((league) => `<option value="${league}" ${filterLeague === league ? 'selected' : ''}>${league}</option>`).join('')}
          </select>
        </label>
        <label>
          Status
          <select id="statusFilter">
            ${statuses.map((status) => `<option value="${status}" ${filterStatus === status ? 'selected' : ''}>${status === 'ALL' ? 'All statuses' : status}</option>`).join('')}
          </select>
        </label>
      </div>

      <div class="grid-3" style="padding-top: 30px;">
        ${filtered.length ? filtered.map((prediction) => renderCard(prediction)).join('') : '<div class="empty-state">No predictions match the selected filters.</div>'}
      </div>
    </div>
  `;

  const leagueFilter = document.getElementById('leagueFilter');
  const statusFilter = document.getElementById('statusFilter');

  if (leagueFilter) {
    leagueFilter.addEventListener('change', () => {
      const params = new URLSearchParams(window.location.search);
      params.set('league', leagueFilter.value);
      params.set('status', statusFilter ? statusFilter.value : 'ALL');
      window.location.search = params.toString();
    });
  }

  if (statusFilter) {
    statusFilter.addEventListener('change', () => {
      const params = new URLSearchParams(window.location.search);
      params.set('status', statusFilter.value);
      params.set('league', leagueFilter ? leagueFilter.value : 'ALL');
      window.location.search = params.toString();
    });
  }
}

function renderVIPPage() {
  const vip = getVIPTips();
  const currentUser = getCurrentUser();
  const unlocked = currentUser && currentUser.vipStatus === 'active';
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <div class="page-header">
      <div class="container page-header-inner">
        <div>
          <div class="eyebrow">Premium access</div>
          <h1>VIP Predictions</h1>
          <p>Members unlock protected selections and premium match insights after payment is verified.</p>
        </div>
        <a href="payment.html" class="btn btn-primary">${unlocked ? 'Manage VIP' : 'Unlock VIP'}</a>
      </div>
    </div>

    <div class="container" style="padding-top: 30px;">
      <div class="grid-2">
        ${vip.map((tip) => renderVIPCard(tip, unlocked)).join('')}
      </div>
      <div class="notice-box">
        <strong>Locked access:</strong> Protected selections are displayed only when a user has an active VIP membership. Payment status is verified during authentication checks and through the admin dashboard.
      </div>
    </div>
  `;
}

function renderAuthPage() {
  const app = document.getElementById('app');
  if (!app) return;

  const requestedMode = new URLSearchParams(window.location.search).get('mode');
  const mode = requestedMode === 'register' ? 'register' : 'login';

  app.innerHTML = `
    <div class="auth-shell auth-mode-${mode}">
      <div class="auth-card">
        <div class="auth-visual">
          <div class="brand" style="justify-content:center;">
            <span class="logo-wrap" aria-hidden="true">
              <span class="logo-ball"></span>
              <span class="logo-arrow"></span>
              <span class="logo-check"></span>
            </span>
            <span class="brand-wordmark"><strong>PICK</strong> PROFIT</span>
          </div>
          <div class="auth-visual-copy">
            <span class="auth-kicker">${mode === 'register' ? 'Your next match-day starts here' : 'Your picks, all in one place'}</span>
            <h2>${mode === 'register' ? 'Join the team. Make every pick count.' : 'Welcome back to smarter football picks.'}</h2>
            <p>${mode === 'register' ? 'Create your member account to follow predictions, track results and unlock VIP access.' : 'Track match results, manage VIP access and keep every prediction in focus.'}</p>
          </div>
          <ul class="premium-list">
            <li>Secure member access</li>
            <li>Real-time updates</li>
            <li>VIP membership control</li>
          </ul>
          <div class="auth-support-row">
            <a href="https://wa.me/2349165487057" class="btn btn-secondary" target="_blank" rel="noreferrer">WhatsApp Support</a>
          </div>
          <div class="auth-visual-orbit auth-orbit-one" aria-hidden="true"></div>
          <div class="auth-visual-orbit auth-orbit-two" aria-hidden="true"></div>
        </div>

        <div class="auth-form-box">
          <div class="auth-form-heading">
            <span class="auth-kicker">${mode === 'register' ? 'Start for free' : 'Member access'}</span>
            <h1>${mode === 'register' ? 'Create your account' : 'Sign in'}</h1>
            <p>${mode === 'register' ? 'A few details and you’re ready to go.' : 'Enter your details to continue to your dashboard.'}</p>
          </div>
          <div class="form-toggle">
            <button type="button" class="${mode === 'login' ? 'active' : ''}" data-auth-tab="login">Login</button>
            <button type="button" class="${mode === 'register' ? 'active' : ''}" data-auth-tab="register">Register</button>
          </div>

          <div id="authAlert" class="alert"></div>

          <form id="loginForm" class="${mode === 'login' ? '' : 'hidden'}" novalidate>
            <div class="form-field">
              <label>Email or Username</label>
              <input type="text" name="loginIdentifier" placeholder="e.g. admin or admin@pickprofit.com" required />
            </div>
            <div class="form-field">
              <label>Password</label>
              <div class="password-wrap">
                <input type="password" name="loginPassword" placeholder="Password" required />
                <button type="button" class="password-toggle" data-password-toggle="loginPassword" aria-label="Show password">Show</button>
              </div>
            </div>
            <div class="form-row-inline">
              <label class="checkbox-inline"><input type="checkbox" name="rememberMe" /> Remember me</label>
              <a href="#" class="section-link">Forgot password?</a>
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-primary" id="loginButton">Login</button>
            </div>
          </form>

          <form id="registerForm" class="${mode === 'register' ? '' : 'hidden'}" novalidate>
            <div class="form-grid">
              <div class="form-field" style="grid-column: 1 / -1;">
                <label>Profile picture</label>
                <input type="file" name="profileImage" accept="image/png,image/jpeg,image/webp" />
                <div id="profilePreview" class="profile-preview hidden"></div>
              </div>
              <div class="form-field">
                <label>Full name</label>
                <input type="text" name="fullName" required />
              </div>
              <div class="form-field">
                <label>Username</label>
                <input type="text" name="username" required />
              </div>
              <div class="form-field">
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div class="form-field">
                <label>Phone</label>
                <input type="tel" name="phone" required />
              </div>
              <div class="form-field" style="grid-column: 1 / -1;">
                <label>Password</label>
                <div class="password-wrap">
                  <input type="password" name="password" required />
                  <button type="button" class="password-toggle" data-password-toggle="password" aria-label="Show password">Show</button>
                </div>
              </div>
              <div class="form-field" style="grid-column: 1 / -1;">
                <label>Confirm password</label>
                <div class="password-wrap">
                  <input type="password" name="confirmPassword" required />
                  <button type="button" class="password-toggle" data-password-toggle="confirmPassword" aria-label="Show password">Show</button>
                </div>
              </div>
              <div class="form-field" style="grid-column: 1 / -1;">
                <label class="checkbox-inline"><input type="checkbox" name="termsAccepted" required /> I agree to the terms & conditions</label>
              </div>
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-primary">Create account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  const tabButtons = document.querySelectorAll('[data-auth-tab]');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const alertBox = document.getElementById('authAlert');
  const previewBox = document.getElementById('profilePreview');

  const passwordToggles = document.querySelectorAll('.password-toggle');
  passwordToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const targetName = button.dataset.passwordToggle;
      const input = document.querySelector(`input[name="${targetName}"]`);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? 'Hide' : 'Show';
    });
  });

  const profileFileInput = document.querySelector('input[name="profileImage"]');
  if (profileFileInput && previewBox) {
    profileFileInput.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) {
        previewBox.classList.add('hidden');
        previewBox.innerHTML = '';
        return;
      }
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        showAuthAlert('Only JPG, PNG, and WebP images are supported.', 'error');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        showAuthAlert('Profile image must be smaller than 2MB.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        previewBox.innerHTML = `<img src="${reader.result}" alt="Profile preview" />`;
        previewBox.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextMode = button.dataset.authTab;
      const params = new URLSearchParams(window.location.search);
      params.set('mode', nextMode);
      window.location.search = params.toString();
    });
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const loginButton = document.getElementById('loginButton');
      if (loginButton) {
        loginButton.disabled = true;
        loginButton.textContent = 'Signing in...';
      }
      const formData = new FormData(loginForm);
      const identifier = String(formData.get('loginIdentifier') || '').trim();
      const password = String(formData.get('loginPassword') || '');
      const users = getUsers();
      const user = users.find((account) => {
        const matchIdentifier = account.email === identifier || account.username === identifier;
        return matchIdentifier && account.password === password;
      });

      setTimeout(() => {
        if (!user) {
          showAuthAlert('Invalid email/username or password.', 'error');
          if (loginButton) {
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
          }
          return;
        }

        if (user.accountStatus === 'suspended') {
          showAuthAlert('This account has been suspended. Contact support for assistance.', 'error');
          if (loginButton) {
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
          }
          return;
        }

        const rememberMe = formData.get('rememberMe') === 'on';
        localStorage.setItem(STORAGE.rememberMe, rememberMe ? 'true' : 'false');
        setCurrentUser(user);
        createNotification({ userId: user.id, type: 'info', title: 'Welcome back', message: `Hello ${user.fullName.split(' ')[0]}, your dashboard is ready.` });
        window.location.href = user.role === 'admin' ? 'admin.html' : 'dashboard.html';
      }, 400);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const fullName = String(formData.get('fullName') || '').trim();
      const username = String(formData.get('username') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const password = String(formData.get('password') || '');
      const confirmPassword = String(formData.get('confirmPassword') || '');
      const agreeToTerms = formData.get('termsAccepted') === 'on';
      const profilePicFile = formData.get('profileImage');

      if (password.length < 6) {
        showAuthAlert('Password must be at least 6 characters.', 'error');
        return;
      }

      if (!agreeToTerms) {
        showAuthAlert('You must accept the terms and conditions to continue.', 'error');
        return;
      }

      if (password !== confirmPassword) {
        showAuthAlert('Passwords do not match.', 'error');
        return;
      }

      const users = getUsers();
      if (users.some((user) => user.email === email || user.username === username)) {
        showAuthAlert('An account with that email or username already exists.', 'error');
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        fullName,
        username,
        email,
        phone,
        password,
        role: 'user',
        vipStatus: 'inactive',
        vipExpiresAt: '',
        paymentSubmittedAt: '',
        paymentScreenshot: '',
        profileImage: '',
        accountStatus: 'active',
        suspensionReason: '',
        suspendedAt: '',
        restoredAt: '',
        adminNote: '',
        createdAt: new Date().toISOString()
      };

      if (profilePicFile && profilePicFile.name) {
        const reader = new FileReader();
        reader.onload = () => {
          newUser.profileImage = String(reader.result || '');
          users.push(newUser);
          setStored(STORAGE.users, users);
          setCurrentUser(newUser);
          createNotification({ userId: newUser.id, type: 'success', title: 'Welcome to PICK PROFIT', message: 'Your account is active. Unlock VIP access to discover premium selections.' });
          window.location.href = 'dashboard.html';
        };
        reader.readAsDataURL(profilePicFile);
        return;
      }

      users.push(newUser);
      setStored(STORAGE.users, users);
      setCurrentUser(newUser);
      createNotification({ userId: newUser.id, type: 'success', title: 'Welcome to PICK PROFIT', message: 'Your account is active. Unlock VIP access to discover premium selections.' });
      window.location.href = 'dashboard.html';
    });
  }

  function showAuthAlert(message, type) {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `alert show ${type}`;
  }
}

function renderDashboardPage() {
  const currentUser = getCurrentUser();
  const app = document.getElementById('app');
  if (!app) return;

  if (!currentUser) {
    window.location.href = 'auth.html';
    return;
  }

  const notifications = getNotificationsForUser(currentUser).slice(0, 5);
  const predictions = getPredictions().slice(0, 3);
  const vipUnlocked = currentUser.vipStatus === 'active';
  const statusText = getMembershipStatus(currentUser);
  const statusClass = getMembershipStatusClass(currentUser);

  const themeLabel = document.body.getAttribute('data-theme') === 'dark' ? 'Light mode' : 'Dark mode';

  app.innerHTML = `
    <div class="page-header">
      <div class="container page-header-inner">
        <div>
          <div class="eyebrow">Member dashboard</div>
          <h1>Welcome, ${currentUser.fullName.split(' ')[0]}</h1>
          <p>View your account, follow VIP status and monitor recent match insights.</p>
        </div>
        ${currentUser.vipStatus !== 'active' ? '<a href="payment.html" class="btn btn-primary">Purchase VIP Access</a>' : '<a href="vip.html" class="btn btn-secondary">View VIP Picks</a>'}
      </div>
    </div>

    <div class="container dashboard-grid" style="padding-top: 30px; padding-bottom: 70px;">
      <aside class="sidebar-card">
        <div class="profile-chip">
          <div class="prof-avatar">${getUserAvatar(currentUser, 'medium')}</div>
          <div>
            <strong>${currentUser.fullName}</strong>
            <div class="status-pill ${statusClass}">${statusText}</div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-label">Navigation</div>
          <nav class="sidebar-nav">
            <a href="dashboard.html" class="active">Overview</a>
            <a href="free-tips.html">Free Tips</a>
            <a href="vip.html">VIP Predictions</a>
            <a href="payment.html">VIP Payment</a>
            <a href="admin.html">Admin Panel</a>
            <a href="index.html">Home</a>
          </nav>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-label">Preferences</div>
          <button type="button" class="theme-switch" data-theme-toggle id="dashboardThemeToggle" aria-label="Toggle theme">
            <span class="theme-label">${themeLabel}</span>
            <span class="theme-toggle-icon">${document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>

        <div class="info-list">
          <div><strong>Username:</strong> ${currentUser.username}</div>
          <div><strong>Email:</strong> ${currentUser.email}</div>
          <div><strong>Phone:</strong> ${currentUser.phone}</div>
          <div><strong>VIP expiry:</strong> ${currentUser.vipExpiresAt ? new Date(currentUser.vipExpiresAt).toLocaleDateString() : 'Not active'}</div>
          <div><strong>Payment status:</strong> ${currentUser.paymentSubmittedAt ? 'Submitted' : 'Not submitted'}</div>
          <div><strong>Account status:</strong> ${currentUser.accountStatus === 'suspended' ? 'Suspended' : 'Active'}</div>
        </div>
      </aside>

      <div>
        <div class="metric-grid">
          <div class="stat-card card">
            <div class="eyebrow">Status</div>
            <strong>${statusText}</strong>
            <span>${vipUnlocked ? 'Premium features unlocked' : 'Upgrade to move to VIP active'}</span>
          </div>
          <div class="stat-card card">
            <div class="eyebrow">VIP</div>
            <strong>${currentUser.vipStatus === 'active' ? 'Active' : 'Locked'}</strong>
            <span>${currentUser.vipStatus === 'active' ? 'Your access is live' : 'Access pending verification'}</span>
          </div>
          <div class="stat-card card">
            <div class="eyebrow">Notifications</div>
            <strong>${notifications.length}</strong>
            <span>Unread updates</span>
          </div>
        </div>

        <div class="card" style="padding: 22px; margin-bottom: 22px;">
          <div class="section-header" style="margin-bottom: 18px;">
            <h3>Profile settings</h3>
          </div>
          <form id="profileForm" class="profile-form">
            <div class="form-grid">
              <div class="form-field" style="grid-column: 1 / -1;">
                <label>Profile picture</label>
                <input type="file" name="profilePicture" accept="image/png,image/jpeg,image/webp" />
                <div id="profileImagePreview" class="profile-preview ${currentUser.profileImage ? '' : 'hidden'}">
                  ${currentUser.profileImage ? `<img src="${currentUser.profileImage}" alt="Current profile preview" />` : ''}
                </div>
              </div>
              <div class="form-field">
                <label>Display name</label>
                <input type="text" name="displayName" value="${currentUser.fullName}" required />
              </div>
              <div class="form-field">
                <label>Phone number</label>
                <input type="tel" name="phone" value="${currentUser.phone || ''}" required />
              </div>
              <div class="form-field">
                <label>Username</label>
                <input type="text" name="username" value="${currentUser.username}" readonly />
              </div>
              <div class="form-field">
                <label>Email</label>
                <input type="email" name="email" value="${currentUser.email}" readonly />
              </div>
              <div class="form-field" style="grid-column: 1 / -1;">
                <label>New password</label>
                <input type="password" name="newPassword" placeholder="Leave blank to keep your current password" />
              </div>
            </div>
            <div class="form-buttons">
              <button type="button" id="removeProfileImage" class="btn btn-secondary">Remove picture</button>
              <button type="submit" class="btn btn-primary">Save profile</button>
            </div>
          </form>
        </div>

        <div class="list-card card">
          <div class="section-header" style="margin-bottom: 14px;">
            <h3>Recent notifications</h3>
          </div>
          <ul>
            ${notifications.length ? notifications.map((item) => `
              <li>
                <span><strong>${item.title}</strong><br>${item.message}</span>
                <span class="notification-badge ${item.type}">${item.type}</span>
              </li>
            `).join('') : '<li><span>No notifications yet.</span></li>'}
          </ul>
        </div>

        <div class="list-card card" style="margin-top: 22px;">
          <div class="section-header" style="margin-bottom: 14px;">
            <h3>Available VIP predictions</h3>
            <a href="vip.html" class="section-link">Open VIP →</a>
          </div>
          <ul>
            ${getVIPTips().slice(0, 2).map((tip) => `
              <li>
                <span>${tip.homeTeam} vs ${tip.awayTeam}</span>
                <span class="status-pill ${vipUnlocked ? 'vip-active' : 'vip-inactive'}">${vipUnlocked ? 'Unlocked' : 'Locked'}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="list-card card" style="margin-top: 22px;">
          <div class="section-header" style="margin-bottom: 14px;">
            <h3>Recent free tips</h3>
            <a href="free-tips.html" class="section-link">View all →</a>
          </div>
          <ul>
            ${predictions.map((tip) => `
              <li>
                <span>${tip.homeTeam} vs ${tip.awayTeam}</span>
                <span class="result-badge ${String(tip.status).toLowerCase()}">${tip.status}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  const profileForm = document.getElementById('profileForm');
  const removePictureButton = document.getElementById('removeProfileImage');
  const profileImageInput = document.querySelector('input[name="profilePicture"]');
  const profileImagePreview = document.getElementById('profileImagePreview');

  if (profileImageInput && profileImagePreview) {
    profileImageInput.addEventListener('change', (event) => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
        alert('Only JPG, PNG, and WebP images are supported.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        profileImagePreview.innerHTML = `<img src="${reader.result}" alt="Current profile preview" />`;
        profileImagePreview.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    });
  }

  const dashboardThemeToggle = document.getElementById('dashboardThemeToggle');
  if (dashboardThemeToggle) {
    dashboardThemeToggle.addEventListener('click', toggleTheme);
  }

  if (removePictureButton) {
    removePictureButton.addEventListener('click', () => {
      const users = getUsers();
      const user = users.find((entry) => entry.id === currentUser.id);
      if (!user) return;
      user.profileImage = '';
      setStored(STORAGE.users, users);
      renderDashboardPage();
    });
  }

  if (profileForm) {
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(profileForm);
      const imageFile = formData.get('profilePicture');
      const displayName = String(formData.get('displayName') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const newPassword = String(formData.get('newPassword') || '').trim();

      const users = getUsers();
      const user = users.find((entry) => entry.id === currentUser.id);
      if (!user) return;

      user.fullName = displayName || user.fullName;
      user.phone = phone || user.phone;
      if (newPassword) user.password = newPassword;
      if (imageFile && imageFile.name) {
        const reader = new FileReader();
        reader.onload = () => {
          user.profileImage = String(reader.result || '');
          setStored(STORAGE.users, users);
          renderDashboardPage();
        };
        reader.readAsDataURL(imageFile);
        return;
      }

      setStored(STORAGE.users, users);
      renderDashboardPage();
    });
  }
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsDataURL(file);
  });
}

function getMessagePreview(message) {
  if (!message) return 'New message';

  const text = typeof message.text === 'string' ? message.text.trim() : '';
  if (text) return text;

  const attachments = Array.isArray(message.attachments) ? message.attachments : [];
  if (!attachments.length) return 'New message';

  const labels = attachments.map((attachment) => {
    if (attachment?.kind === 'voice-note') return 'Voice note';
    if (attachment?.type === 'image') return 'Image';
    if (attachment?.type === 'audio') return 'Audio';
    return attachment?.name || 'File';
  });

  return labels[0] || 'Attachment';
}

function buildAttachmentMarkup(attachment = {}) {
  const fileName = escapeHtml(attachment.name || 'Attachment');

  if (attachment.type === 'image') {
    return `
      <div class="chat-media chat-image">
        <img src="${attachment.dataUrl}" alt="${fileName}" />
      </div>
    `;
  }

  if (attachment.type === 'audio') {
    return `
      <div class="chat-media chat-audio">
        <audio controls src="${attachment.dataUrl}"></audio>
        <span>${fileName}</span>
      </div>
    `;
  }

  return `
    <a class="chat-file-attachment" href="${attachment.dataUrl}" download="${escapeHtml(attachment.name || 'pick-profit-file')}" target="_blank" rel="noreferrer">
      ${fileName}
    </a>
  `;
}

function renderChatPage() {
  const currentUser = getCurrentUser();
  const app = document.getElementById('app');
  if (!app) return;

  if (!currentUser) {
    window.location.href = 'auth.html';
    return;
  }

  const messages = getChatMessages();
  const isAdmin = currentUser.role === 'admin';
  const currentSender = isAdmin ? 'admin' : 'member';

  const memberThreads = isAdmin
    ? messages.filter((msg) => msg.userId).reduce((accumulator, message) => {
        const existing = accumulator.get(message.userId) || {
          id: message.userId,
          name: message.sender === 'member' ? (message.senderName || 'Member') : 'Support member',
          lastMessage: getMessagePreview(message),
          updatedAt: message.createdAt
        };

        const nextThread = {
          id: message.userId,
          name: message.sender === 'member' ? (message.senderName || existing.name || 'Member') : existing.name || 'Support member',
          lastMessage: getMessagePreview(message),
          updatedAt: message.createdAt
        };

        if (new Date(message.createdAt) > new Date(existing.updatedAt || 0)) {
          accumulator.set(message.userId, nextThread);
        } else if (!accumulator.has(message.userId)) {
          accumulator.set(message.userId, nextThread);
        }

        return accumulator;
      }, new Map()).values()
    : [{
        id: currentUser.id,
        name: 'PICK PROFIT Support',
        lastMessage: 'Admin is available to answer your questions.',
        updatedAt: new Date().toISOString()
      }];

  const threads = isAdmin
    ? [...memberThreads].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    : [{
        id: currentUser.id,
        name: 'PICK PROFIT Support',
        lastMessage: 'Admin is available to answer your questions.',
        updatedAt: new Date().toISOString()
      }];

  const requestedThreadId = new URLSearchParams(window.location.search).get('thread');
  const selectedThreadId = isAdmin ? (requestedThreadId || (threads[0] ? threads[0].id : 'support')) : currentUser.id;
  const selectedThread = threads.find((thread) => thread.id === selectedThreadId) || threads[0] || null;
  const threadMessages = isAdmin
    ? [...messages.filter((msg) => msg.userId === selectedThreadId)].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : messages.filter((msg) => msg.userId === currentUser.id || (msg.sender === 'admin' && (!msg.userId || msg.userId === currentUser.id))).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  app.innerHTML = `
    <div class="page-header">
      <div class="container page-header-inner">
        <div>
          <div class="eyebrow">Support center</div>
          <h1>${isAdmin ? 'Member support inbox' : 'Chat with support'}</h1>
          <p>${isAdmin ? 'Review and reply to member conversations in real time.' : 'Ask a question, share a concern or request VIP assistance.'}</p>
        </div>
        <a href="dashboard.html" class="btn btn-secondary">Back to dashboard</a>
      </div>
    </div>

    <div class="container" style="padding-top: 26px; padding-bottom: 80px;">
      <div class="chat-shell">
        <aside class="chat-sidebar">
          <div class="chat-sidebar-header">
            <h3>${isAdmin ? 'Member threads' : 'Conversation'}</h3>
          </div>
          <div class="chat-thread-list">
            ${threads.length ? threads.map((thread) => `
              <button type="button" class="chat-thread ${thread.id === selectedThreadId ? 'active' : ''}" data-thread-id="${thread.id}">
                <div class="chat-thread-name">${escapeHtml(thread.name)}</div>
                <div class="chat-thread-preview">${escapeHtml(thread.lastMessage || 'New message')}</div>
              </button>
            `).join('') : '<div class="empty-state">No conversations yet.</div>'}
          </div>
        </aside>

        <section class="chat-panel">
          <div class="chat-header">
            <div>
              <div class="eyebrow">Live chat</div>
              <h3>${isAdmin ? escapeHtml(selectedThread?.name || 'Support room') : 'PICK PROFIT Admin'}</h3>
            </div>
            <span class="status-pill vip-active">Online</span>
          </div>

          <div class="chat-messages" id="chatMessages">
            ${threadMessages.length ? threadMessages.map((message) => {
              const senderName = escapeHtml(message.senderName || (message.sender === 'admin' ? 'Pick Profit Admin' : currentUser.fullName));
              const chatText = escapeHtml(message.text || '').replace(/\n/g, '<br>');
              const attachmentsMarkup = Array.isArray(message.attachments) && message.attachments.length
                ? message.attachments.map((attachment) => buildAttachmentMarkup(attachment)).join('')
                : '';

              return `
                <div class="chat-message-row ${message.sender === currentSender ? 'mine' : ''}">
                  <div class="chat-message ${message.sender === currentSender ? 'mine' : ''}">
                    <div class="chat-meta">
                      <strong>${senderName}</strong>
                      <span>${new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    ${chatText ? `<p>${chatText}</p>` : ''}
                    ${attachmentsMarkup ? `<div class="chat-attachments">${attachmentsMarkup}</div>` : ''}
                  </div>
                </div>
              `;
            }).join('') : '<div class="empty-state">Start the conversation.</div>'}
          </div>

          <form id="chatForm" class="chat-form">
            <div id="chatAttachmentPreview" class="chat-attachment-preview"></div>
            <textarea id="chatInput" rows="3" placeholder="${isAdmin ? 'Reply to the member...' : 'Type your message to the admin...'}" required></textarea>
            <div class="chat-form-actions">
              <div class="chat-tools">
                <label class="chat-upload-button">
                  <input type="file" id="chatFileInput" accept="image/*,audio/*,.pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.ppt,.pptx" multiple />
                  <span>📎 Add files</span>
                </label>
                <button type="button" id="startVoiceNoteBtn" class="btn btn-secondary btn-small">🎙️ Voice note</button>
                <button type="button" id="stopVoiceNoteBtn" class="btn btn-danger btn-small hidden">Stop</button>
              </div>
              <button type="submit" class="btn btn-primary">Send message</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;

  const threadButtons = document.querySelectorAll('[data-thread-id]');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const fileInput = document.getElementById('chatFileInput');
  const attachmentPreview = document.getElementById('chatAttachmentPreview');
  const startVoiceNoteButton = document.getElementById('startVoiceNoteBtn');
  const stopVoiceNoteButton = document.getElementById('stopVoiceNoteBtn');
  const pendingAttachments = [];

  function renderPendingAttachments() {
    if (!attachmentPreview) return;

    if (!pendingAttachments.length) {
      attachmentPreview.innerHTML = '';
      return;
    }

    attachmentPreview.innerHTML = pendingAttachments.map((attachment) => `
      <div class="chat-attachment-item">
        ${attachment.type === 'image' ? `<img src="${attachment.dataUrl}" alt="${escapeHtml(attachment.name)}" />` : ''}
        <div class="chat-attachment-meta">
          <span>${escapeHtml(attachment.name)}</span>
          <button type="button" class="chat-remove-attachment" data-attachment-id="${attachment.id}">Remove</button>
        </div>
      </div>
    `).join('');

    attachmentPreview.querySelectorAll('.chat-remove-attachment').forEach((button) => {
      button.addEventListener('click', () => {
        const attachmentId = button.dataset.attachmentId;
        const index = pendingAttachments.findIndex((item) => item.id === attachmentId);
        if (index >= 0) {
          pendingAttachments.splice(index, 1);
        }
        renderPendingAttachments();
      });
    });
  }

  if (threadButtons.length) {
    threadButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const selectedId = button.dataset.threadId;
        const params = new URLSearchParams(window.location.search);
        params.set('thread', selectedId);
        const url = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', url);
        renderChatPage();
      });
    });
  }

  if (fileInput) {
    fileInput.addEventListener('change', async (event) => {
      const selectedFiles = Array.from(event.target.files || []);
      if (!selectedFiles.length) return;

      for (const file of selectedFiles) {
        const dataUrl = await readFileAsDataUrl(file);
        pendingAttachments.push({
          id: `file-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name: file.name || 'Attachment',
          type: file.type.startsWith('image/') ? 'image' : (file.type.startsWith('audio/') ? 'audio' : 'file'),
          dataUrl,
          size: file.size
        });
      }

      renderPendingAttachments();
      fileInput.value = '';
    });
  }

  let activeRecorder = null;
  let activeStream = null;

  if (startVoiceNoteButton && stopVoiceNoteButton) {
    startVoiceNoteButton.addEventListener('click', async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined') {
        window.alert('This browser does not support voice notes for chat.');
        return;
      }

      if (activeRecorder) {
        activeRecorder.stop();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : (MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4');

        const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
        const chunks = [];

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) chunks.push(event.data);
        };

        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
          if (!blob.size) {
            if (activeStream) {
              activeStream.getTracks().forEach((track) => track.stop());
            }
            activeRecorder = null;
            activeStream = null;
            startVoiceNoteButton.textContent = '🎙️ Voice note';
            stopVoiceNoteButton.classList.add('hidden');
            return;
          }

          const dataUrl = await readFileAsDataUrl(blob);
          pendingAttachments.push({
            id: `voice-${Date.now()}`,
            name: `voice-note-${Date.now()}.webm`,
            type: 'audio',
            kind: 'voice-note',
            dataUrl,
            size: blob.size
          });

          renderPendingAttachments();
          if (activeStream) {
            activeStream.getTracks().forEach((track) => track.stop());
          }
          activeRecorder = null;
          activeStream = null;
          startVoiceNoteButton.textContent = '🎙️ Voice note';
          stopVoiceNoteButton.classList.add('hidden');
        };

        activeRecorder = recorder;
        activeStream = stream;
        recorder.start();
        startVoiceNoteButton.textContent = 'Recording…';
        stopVoiceNoteButton.classList.remove('hidden');
      } catch (error) {
        window.alert('Microphone access was denied. Please allow microphone permission to send a voice note.');
      }
    });

    stopVoiceNoteButton.addEventListener('click', () => {
      if (activeRecorder) {
        activeRecorder.stop();
      }
    });
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const content = String(chatInput.value || '').trim();
      const attachments = pendingAttachments.slice();

      if (!content && !attachments.length) {
        return;
      }

      const selectedThreadId = new URLSearchParams(window.location.search).get('thread') || (isAdmin ? threads[0]?.id : currentUser.id);
      const payload = {
        id: `chat-${Date.now()}`,
        userId: selectedThreadId,
        sender: currentSender,
        senderName: currentUser.role === 'admin' ? 'Pick Profit Admin' : currentUser.fullName,
        text: content || (attachments.length ? (isAdmin ? 'Sent a reply with attachments.' : 'Shared an attachment.') : 'Sent a message'),
        attachments: attachments.length ? attachments : [],
        createdAt: new Date().toISOString()
      };

      const chatMessages = getChatMessages();
      chatMessages.push(payload);
      setStored(STORAGE.chat, chatMessages);
      pendingAttachments.length = 0;
      renderPendingAttachments();
      chatInput.value = '';
      renderChatPage();
    });
  }
}

function renderPaymentPage() {
  const currentUser = getCurrentUser();
  const app = document.getElementById('app');
  if (!app) return;

  if (!currentUser) {
    window.location.href = 'auth.html';
    return;
  }

  const settings = getPublishedPaymentSettings();

  app.innerHTML = `
    <div class="page-header">
      <div class="container page-header-inner">
        <div>
          <div class="eyebrow">PalmPay payment</div>
          <h1>VIP Membership Payment</h1>
          <p>Submit your payment proof to activate premium access for the selected plan.</p>
        </div>
        <a href="dashboard.html" class="btn btn-secondary">Back to dashboard</a>
      </div>
    </div>

    <div class="container" style="padding-top: 30px; padding-bottom: 80px;">
      <div class="grid-2">
        <div class="card" style="padding: 28px;">
          <h3>${settings.provider} Details</h3>
          <div class="info-list">
            <div><strong>Payment provider:</strong> ${settings.provider}</div>
            <div><strong>Currency:</strong> Nigerian naira (${currency})</div>
            <div><strong>Account number:</strong> ${settings.accountNumber}</div>
            <div><strong>Account holder:</strong> ${settings.accountHolderName}</div>
            <div><strong>Contact/reference:</strong> ${settings.contactReference}</div>
            <div><strong>WhatsApp support:</strong> ${settings.whatsappSupport}</div>
            <div><strong>Plan:</strong> ${currentUser.vipStatus === 'active' ? 'VIP Active' : 'Monthly VIP'} </div>
          </div>
          <div style="margin-top: 18px;">
            <button type="button" class="btn btn-secondary" data-copy-account="${settings.accountNumber}">Copy account number</button>
          </div>
          <div class="notice-box" style="margin-top: 18px;">
            <strong>Instructions:</strong> ${settings.paymentInstructions}
          </div>
        </div>

        <div class="card" style="padding: 28px;">
          <h3>Submit payment screenshot</h3>
          <div id="paymentAlert" class="alert"></div>
          <form id="paymentForm">
            <div class="form-field">
              <label>Amount</label>
              <input type="number" name="amount" class="form-control" placeholder="${settings.vipPrice}" required />
            </div>
            <div class="form-field">
              <label>Payment reference</label>
              <input type="text" name="reference" class="form-control" placeholder="PALM-2500-01" required />
            </div>
            <div class="form-field">
              <label>Upload screenshot</label>
              <input type="file" name="screenshot" class="file-input" accept="image/*" required />
            </div>
            <button type="submit" class="btn btn-primary">Submit payment</button>
          </form>
        </div>
      </div>
    </div>
  `;

  const paymentForm = document.getElementById('paymentForm');
  const alertBox = document.getElementById('paymentAlert');
  const copyButton = document.querySelector('[data-copy-account]');

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const value = copyButton.dataset.copyAccount || settings.accountNumber;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(value);
        } else {
          const input = document.createElement('input');
          input.value = value;
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          document.body.removeChild(input);
        }
        showPaymentAlert('PalmPay account number copied to clipboard.', 'success');
      } catch (error) {
        showPaymentAlert('Copy failed. Please write the account number manually.', 'error');
      }
    });
  }

  if (paymentForm) {
    paymentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(paymentForm);
      const amount = Number(formData.get('amount')) || 0;
      const reference = String(formData.get('reference') || '').trim();
      const file = formData.get('screenshot');

      if (!amount || !reference || !file || !file.name) {
        showPaymentAlert('Please complete all payment fields.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const users = getUsers();
        const user = users.find((item) => item.id === currentUser.id);
        if (!user) return;

        const paymentRecord = {
          id: `pay-${Date.now()}`,
          userId: user.id,
          amount,
          reference,
          screenshot: String(reader.result || ''),
          provider: settings.provider,
          accountNumber: settings.accountNumber,
          createdAt: new Date().toISOString(),
          status: 'pending',
          reviewedBy: ''
        };

        const payments = getStored(STORAGE.payments, []);
        payments.unshift(paymentRecord);
        setStored(STORAGE.payments, payments);

        user.vipStatus = 'pending';
        user.paymentSubmittedAt = new Date().toISOString();
        user.paymentScreenshot = String(reader.result || '');
        setStored(STORAGE.users, users);

        createNotification({
          userId: user.id,
          type: 'warning',
          title: 'Payment submitted',
          message: `Reference ${reference} is under review. You will be notified once the admin verifies it.`
        });

        showPaymentAlert('Payment submitted successfully. Awaiting admin approval.', 'success');
        paymentForm.reset();
      };
      reader.readAsDataURL(file);
    });
  }

  function showPaymentAlert(message, type) {
    if (!alertBox) return;
    alertBox.textContent = message;
    alertBox.className = `alert show ${type}`;
  }
}

function renderAdminPage() {
  const currentUser = getCurrentUser();
  const app = document.getElementById('app');
  if (!app) return;

  if (!currentUser || currentUser.role !== 'admin') {
    app.innerHTML = `
      <div class="container" style="padding: 90px 0 100px;">
        <div class="card" style="padding: 36px; text-align: center;">
          <div class="eyebrow">Restricted access</div>
          <h1>Admin access required</h1>
          <p>This area is only available to the administrator account.</p>
          <a href="auth.html" class="btn btn-primary">Login as admin</a>
        </div>
      </div>
    `;
    return;
  }

  const predictions = getPredictions();
  const vipTips = getVIPTips();
  const settings = getPaymentSettings();
  const payments = getStored(STORAGE.payments, []);
  const users = getUsers().filter((user) => user.role === 'user');
  const searchTerm = (new URLSearchParams(window.location.search).get('q') || '').toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!searchTerm) return true;
    const values = `${user.fullName} ${user.username} ${user.email} ${user.phone}`.toLowerCase();
    return values.includes(searchTerm);
  });

  app.innerHTML = `
    <div class="page-header">
      <div class="container page-header-inner">
        <div>
          <div class="eyebrow">Admin control</div>
          <h1>Admin Dashboard</h1>
          <p>Publish daily selections, manage VIP access and update match result status.</p>
        </div>
        <a href="index.html" class="btn btn-secondary">View site</a>
      </div>
    </div>

    <div class="container" style="padding-top: 30px; padding-bottom: 80px;">
      <div class="grid-2">
        <div class="card" style="padding: 24px;">
          <h3>Add free prediction</h3>
          <form id="adminPredictionForm">
            <div class="form-grid">
              <div class="form-field"><label>Home team</label><input type="text" name="homeTeam" required /></div>
              <div class="form-field"><label>Away team</label><input type="text" name="awayTeam" required /></div>
              <div class="form-field"><label>League</label><input type="text" name="league" required /></div>
              <div class="form-field"><label>Match date</label><input type="date" name="matchDate" required /></div>
              <div class="form-field"><label>Kickoff</label><input type="time" name="kickoffTime" required /></div>
              <div class="form-field"><label>Market</label><input type="text" name="market" required /></div>
              <div class="form-field"><label>Selection</label><input type="text" name="selection" required /></div>
              <div class="form-field"><label>Odds</label><input type="text" name="odds" placeholder="1.92" required /></div>
            </div>
            <div class="form-buttons"><button type="submit" class="btn btn-primary">Publish Tip</button></div>
          </form>
        </div>

        <div class="card" style="padding: 24px;">
          <h3>Add VIP prediction</h3>
          <form id="adminVIPForm">
            <div class="form-grid">
              <div class="form-field"><label>Home team</label><input type="text" name="homeTeam" required /></div>
              <div class="form-field"><label>Away team</label><input type="text" name="awayTeam" required /></div>
              <div class="form-field"><label>League</label><input type="text" name="league" required /></div>
              <div class="form-field"><label>Match date</label><input type="date" name="matchDate" required /></div>
              <div class="form-field"><label>Kickoff</label><input type="time" name="kickoffTime" required /></div>
              <div class="form-field"><label>Market</label><input type="text" name="market" required /></div>
              <div class="form-field"><label>Selection</label><input type="text" name="selection" required /></div>
              <div class="form-field"><label>Odds</label><input type="text" name="odds" placeholder="2.10" required /></div>
            </div>
            <div class="form-buttons"><button type="submit" class="btn btn-warning">Publish VIP</button></div>
          </form>
        </div>
      </div>

      <div class="card" style="margin-top: 26px; padding: 22px;">
        <h3>Payment settings</h3>
        <form id="paymentSettingsForm" class="profile-form">
          <div class="form-grid">
            <div class="form-field"><label>Provider</label><input type="text" name="provider" value="${settings.provider}" required /></div>
            <div class="form-field"><label>Account holder</label><input type="text" name="accountHolderName" value="${settings.accountHolderName}" required /></div>
            <div class="form-field"><label>Account number</label><input type="text" name="accountNumber" value="${settings.accountNumber}" required /></div>
            <div class="form-field"><label>WhatsApp support</label><input type="text" name="whatsappSupport" value="${settings.whatsappSupport}" required /></div>
            <div class="form-field"><label>Contact/reference</label><input type="text" name="contactReference" value="${settings.contactReference}" required /></div>
            <div class="form-field"><label>VIP price</label><input type="number" name="vipPrice" value="${settings.vipPrice}" required /></div>
            <div class="form-field"><label>Duration (days)</label><input type="number" name="subscriptionDurationDays" value="${settings.subscriptionDurationDays}" required /></div>
            <div class="form-field"><label>Publication status</label>
              <select name="published">
                <option value="true" ${settings.published ? 'selected' : ''}>Published</option>
                <option value="false" ${!settings.published ? 'selected' : ''}>Draft</option>
              </select>
            </div>
            <div class="form-field" style="grid-column: 1 / -1;"><label>Payment instructions</label><textarea name="paymentInstructions" rows="4" required>${settings.paymentInstructions}</textarea></div>
          </div>
          <div class="form-buttons"><button type="submit" class="btn btn-primary">Save payment settings</button></div>
        </form>
      </div>

      <div class="card" style="margin-top: 26px; padding: 22px;">
        <h3>Member management</h3>
        <div class="form-field" style="margin-bottom: 18px;">
          <label>Search members</label>
          <input id="memberSearch" type="search" value="${searchTerm}" placeholder="Search by name, username, email or phone" />
        </div>
        <div class="table-wrap">
          <table class="table-plain">
            <thead><tr><th>User</th><th>Plan</th><th>Account</th><th>Expiry</th><th>Actions</th></tr></thead>
            <tbody>
              ${filteredUsers.length ? filteredUsers.map((user) => `
                <tr>
                  <td>
                    <div class="profile-chip" style="margin-bottom: 0;">
                      <div class="prof-avatar">${getUserAvatar(user, 'small')}</div>
                      <div>
                        <strong>${user.fullName}</strong><br>
                        <small>${user.username} · ${user.email}</small>
                      </div>
                    </div>
                  </td>
                  <td>${user.vipStatus === 'active' ? 'VIP' : user.vipStatus === 'pending' ? 'Pending' : 'Free'}</td>
                  <td><span class="status-pill ${user.accountStatus === 'suspended' ? 'vip-inactive' : 'vip-active'}">${user.accountStatus === 'suspended' ? 'Suspended' : 'Active'}</span></td>
                  <td>${user.vipExpiresAt ? new Date(user.vipExpiresAt).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <div class="admin-actions">
                      <button type="button" class="btn btn-primary" data-user-admin-action="activate" data-user-id="${user.id}">Activate VIP</button>
                      <button type="button" class="btn btn-secondary" data-user-admin-action="extend" data-user-id="${user.id}">Extend 30d</button>
                      <button type="button" class="btn btn-warning" data-user-admin-action="suspend" data-user-id="${user.id}">Suspend</button>
                      <button type="button" class="btn btn-secondary" data-user-admin-action="restore" data-user-id="${user.id}">Restore</button>
                    </div>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="5">No members found.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 26px; padding: 22px;">
        <h3>Pending payments</h3>
        <div class="table-wrap">
          <table class="table-plain">
            <thead><tr><th>User</th><th>Reference</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              ${payments.length ? payments.map((item) => `
                <tr>
                  <td>${getUsers().find((entry) => entry.id === item.userId)?.fullName || 'User'}</td>
                  <td>${item.reference}</td>
                  <td>${currency}${item.amount}</td>
                  <td>${item.status || 'Pending'}</td>
                  <td>
                    <div class="admin-actions">
                      <button type="button" class="btn btn-primary" data-payment-action="approve" data-payment-id="${item.id}">Approve</button>
                      <button type="button" class="btn btn-secondary" data-payment-action="reject" data-payment-id="${item.id}">Reject</button>
                    </div>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="5">No payments are awaiting review.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 26px; padding: 22px;">
        <h3>Published predictions</h3>
        <div class="table-wrap">
          <table class="table-plain">
            <thead><tr><th>Fixture</th><th>League</th><th>Status</th><th>Update</th></tr></thead>
            <tbody>
              ${predictions.map((prediction) => `
                <tr>
                  <td>${prediction.homeTeam} vs ${prediction.awayTeam}</td>
                  <td>${prediction.league}</td>
                  <td>${prediction.status}</td>
                  <td><select class="inline-select" data-pred-status-id="${prediction.id}"><option value="PENDING" ${prediction.status === 'PENDING' ? 'selected' : ''}>PENDING</option><option value="WON" ${prediction.status === 'WON' ? 'selected' : ''}>WON</option><option value="LOST" ${prediction.status === 'LOST' ? 'selected' : ''}>LOST</option></select></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 26px; padding: 22px;">
        <h3>VIP cards</h3>
        <div class="table-wrap">
          <table class="table-plain">
            <thead><tr><th>Match</th><th>Selection</th><th>Odds</th><th>Action</th></tr></thead>
            <tbody>
              ${vipTips.map((tip) => `
                <tr>
                  <td>${tip.homeTeam} vs ${tip.awayTeam}</td>
                  <td>${tip.selection}</td>
                  <td>${tip.odds}</td>
                  <td><button type="button" class="btn btn-secondary" data-delete-vip="${tip.id}">Remove</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  const searchField = document.getElementById('memberSearch');
  if (searchField) {
    searchField.addEventListener('input', (event) => {
      const params = new URLSearchParams(window.location.search);
      params.set('q', event.target.value.trim());
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      renderAdminPage();
    });
  }

  const paymentSettingsForm = document.getElementById('paymentSettingsForm');
  if (paymentSettingsForm) {
    paymentSettingsForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(paymentSettingsForm);
      const updated = {
        ...settings,
        provider: String(form.get('provider') || '').trim() || settings.provider,
        accountHolderName: String(form.get('accountHolderName') || '').trim() || settings.accountHolderName,
        accountNumber: String(form.get('accountNumber') || '').trim() || settings.accountNumber,
        whatsappSupport: String(form.get('whatsappSupport') || '').trim() || settings.whatsappSupport,
        contactReference: String(form.get('contactReference') || '').trim() || settings.contactReference,
        vipPrice: Number(form.get('vipPrice')) || settings.vipPrice,
        subscriptionDurationDays: Number(form.get('subscriptionDurationDays')) || settings.subscriptionDurationDays,
        published: String(form.get('published')) === 'true',
        paymentInstructions: String(form.get('paymentInstructions') || '').trim() || settings.paymentInstructions,
        lastUpdated: new Date().toISOString()
      };
      setStored(STORAGE.paymentSettings, updated);
      createNotification({ type: 'info', title: 'Payment settings saved', message: 'The public payment page has been updated.' });
      renderAdminPage();
    });
  }

  const predictionForm = document.getElementById('adminPredictionForm');
  if (predictionForm) {
    predictionForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(predictionForm);
      const newTip = {
        id: `pred-${Date.now()}`,
        homeTeam: String(form.get('homeTeam') || '').trim(),
        awayTeam: String(form.get('awayTeam') || '').trim(),
        league: String(form.get('league') || '').trim(),
        matchDate: String(form.get('matchDate') || '').trim(),
        kickoffTime: String(form.get('kickoffTime') || '').trim(),
        market: String(form.get('market') || '').trim(),
        selection: String(form.get('selection') || '').trim(),
        odds: String(form.get('odds') || '').trim(),
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const items = getPredictions();
      items.unshift(newTip);
      setStored(STORAGE.predictions, items);
      createNotification({ type: 'info', title: 'Free tip published', message: `${newTip.homeTeam} vs ${newTip.awayTeam} is now live.` });
      renderAdminPage();
    });
  }

  const vipForm = document.getElementById('adminVIPForm');
  if (vipForm) {
    vipForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(vipForm);
      const newTip = {
        id: `vip-${Date.now()}`,
        homeTeam: String(form.get('homeTeam') || '').trim(),
        awayTeam: String(form.get('awayTeam') || '').trim(),
        league: String(form.get('league') || '').trim(),
        matchDate: String(form.get('matchDate') || '').trim(),
        kickoffTime: String(form.get('kickoffTime') || '').trim(),
        market: String(form.get('market') || '').trim(),
        selection: String(form.get('selection') || '').trim(),
        odds: String(form.get('odds') || '').trim(),
        accent: 'Featured Pick',
        createdAt: new Date().toISOString()
      };

      const items = getVIPTips();
      items.unshift(newTip);
      setStored(STORAGE.vip, items);
      createNotification({ type: 'warning', title: 'VIP tip published', message: `${newTip.homeTeam} vs ${newTip.awayTeam} is now available to members.` });
      renderAdminPage();
    });
  }

  document.querySelectorAll('[data-pred-status-id]').forEach((select) => {
    select.addEventListener('change', (event) => {
      const id = event.target.dataset.predStatusId;
      const status = event.target.value;
      const items = getPredictions();
      const item = items.find((entry) => entry.id === id);
      if (!item) return;
      item.status = status;
      item.updatedAt = new Date().toISOString();
      setStored(STORAGE.predictions, items);
      createNotification({ type: 'info', title: 'Prediction updated', message: `${item.homeTeam} vs ${item.awayTeam} moved to ${status}.` });
    });
  });

  document.querySelectorAll('[data-delete-vip]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.deleteVip;
      const items = getVIPTips().filter((tip) => tip.id !== id);
      setStored(STORAGE.vip, items);
      renderAdminPage();
    });
  });

  document.querySelectorAll('[data-user-admin-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const userId = button.dataset.userId;
      const action = button.dataset.userAdminAction;
      const users = getUsers();
      const user = users.find((item) => item.id === userId);
      if (!user) return;

      if (action === 'activate') {
        user.vipStatus = 'active';
        user.vipExpiresAt = new Date(Date.now() + settings.subscriptionDurationDays * 24 * 60 * 60 * 1000).toISOString();
        user.accountStatus = 'active';
      }
      if (action === 'extend') {
        user.vipStatus = 'active';
        const currentExpiry = user.vipExpiresAt ? new Date(user.vipExpiresAt).getTime() : Date.now();
        user.vipExpiresAt = new Date(currentExpiry + settings.subscriptionDurationDays * 24 * 60 * 60 * 1000).toISOString();
      }
      if (action === 'suspend') {
        user.accountStatus = 'suspended';
        user.suspendedAt = new Date().toISOString();
        user.suspensionReason = 'Admin suspended account';
        user.vipStatus = 'expired';
      }
      if (action === 'restore') {
        user.accountStatus = 'active';
        user.restoredAt = new Date().toISOString();
        user.suspensionReason = '';
        if (user.vipExpiresAt && new Date(user.vipExpiresAt).getTime() > Date.now()) user.vipStatus = 'active';
      }
      setStored(STORAGE.users, users);
      createNotification({ userId: user.id, type: 'info', title: 'Membership update', message: `Admin updated ${user.fullName}'s account status.` });
      renderAdminPage();
    });
  });

  document.querySelectorAll('[data-payment-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const paymentId = button.dataset.paymentId;
      const action = button.dataset.paymentAction;
      const payments = getStored(STORAGE.payments, []);
      const payment = payments.find((entry) => entry.id === paymentId);
      if (!payment) return;

      payment.status = action === 'approve' ? 'approved' : 'rejected';
      payment.updatedAt = new Date().toISOString();
      setStored(STORAGE.payments, payments);

      const users = getUsers();
      const user = users.find((entry) => entry.id === payment.userId);
      if (user) {
        if (action === 'approve') {
          user.vipStatus = 'active';
          user.vipExpiresAt = new Date(Date.now() + settings.subscriptionDurationDays * 24 * 60 * 60 * 1000).toISOString();
          user.paymentSubmittedAt = new Date().toISOString();
          createNotification({ userId: user.id, type: 'success', title: 'Payment approved', message: 'Your VIP subscription has been activated.' });
        } else {
          user.vipStatus = 'inactive';
          createNotification({ userId: user.id, type: 'alert', title: 'Payment rejected', message: 'Your payment review did not pass. Please submit a valid proof.' });
        }
        setStored(STORAGE.users, users);
      }
      renderAdminPage();
    });
  });

  document.querySelectorAll('[data-approve-user]').forEach((button) => {
    button.addEventListener('click', () => {
      const userId = button.dataset.approveUser;
      const users = getUsers();
      const user = users.find((item) => item.id === userId);
      if (!user) return;

      user.vipStatus = 'active';
      user.vipExpiresAt = new Date(Date.now() + settings.subscriptionDurationDays * 24 * 60 * 60 * 1000).toISOString();
      user.paymentSubmittedAt = new Date().toISOString();
      setStored(STORAGE.users, users);
      createNotification({ userId: user.id, type: 'success', title: 'VIP activated', message: 'Your membership has been approved and the protected picks are now visible.' });
      renderAdminPage();
    });
  });
}

function getMembershipStatus(user) {
  if (!user) return 'VIP INACTIVE';
  const vipStatus = user.vipStatus || 'inactive';
  if (vipStatus === 'pending') return 'PAYMENT PENDING';
  if (vipStatus === 'active') return 'VIP ACTIVE';
  if (vipStatus === 'expired') return 'VIP EXPIRED';
  return 'VIP INACTIVE';
}

function getMembershipStatusClass(user) {
  if (!user) return 'vip-inactive';
  const vipStatus = user.vipStatus || 'inactive';
  if (vipStatus === 'pending') return 'payment-pending';
  if (vipStatus === 'active') return 'vip-active';
  if (vipStatus === 'expired') return 'vip-expired';
  return 'vip-inactive';
}

function checkExpiredSubscriptions() {
  const users = getUsers();
  let changed = false;

  users.forEach((user) => {
    if (!user.vipExpiresAt || user.vipStatus !== 'active') return;
    if (new Date(user.vipExpiresAt).getTime() <= Date.now()) {
      user.vipStatus = 'expired';
      user.vipExpiresAt = user.vipExpiresAt;
      createNotification({
        userId: user.id,
        type: 'warning',
        title: 'VIP subscription expired',
        message: 'Your VIP membership has expired. Renew to restore protected predictions.'
      });
      changed = true;
    }
  });

  if (changed) setStored(STORAGE.users, users);
}

function attachFAQEvents() {
  document.querySelectorAll('.faq-item').forEach((item) => {
    const button = item.querySelector('.faq-question');
    if (!button) return;
    button.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

function initApp() {
  seedData();
  applyTheme(getThemePreference());
  checkExpiredSubscriptions();
  renderHeader();
  switch (page) {
    case 'free-tips':
      renderFreeTipsPage();
      break;
    case 'vip':
      renderVIPPage();
      break;
    case 'auth':
      renderAuthPage();
      break;
    case 'dashboard':
      renderDashboardPage();
      break;
    case 'payment':
      renderPaymentPage();
      break;
    case 'chat':
      renderChatPage();
      break;
    case 'admin':
      renderAdminPage();
      break;
    default:
      renderHomePage();
  }
}

document.addEventListener('DOMContentLoaded', initApp);
