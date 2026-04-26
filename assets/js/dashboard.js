/* ============================================
   FLOWMETRICS — DASHBOARD JS
   ============================================ */

// SIDEBAR TOGGLE (mobile)
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

if (sidebarToggle && sidebar) {
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// TAB BUTTONS
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    this.closest('.widget-controls').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// AI ALERT DISMISS
const aiDismiss = document.querySelector('.ai-alert .btn-ghost');
if (aiDismiss) {
  aiDismiss.addEventListener('click', () => {
    const alert = document.querySelector('.ai-alert');
    alert.style.transition = 'all 0.3s ease';
    alert.style.opacity = '0';
    alert.style.transform = 'translateY(-8px)';
    setTimeout(() => alert.remove(), 300);
  });
}

// LIVE KPI SIMULATION
function simulateLiveKPI() {
  const mrr = document.querySelector('.kpi-tile-featured .kpi-tile-value');
  if (!mrr) return;

  setInterval(() => {
    const base = 84320;
    const variation = Math.floor((Math.random() - 0.3) * 200);
    const current = base + variation;
    const formatted = '€ ' + current.toLocaleString('fr-FR');
    mrr.textContent = formatted;
  }, 5000);
}

simulateLiveKPI();

// SEARCH SHORTCUT (Cmd+K)
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) searchInput.focus();
  }
});

// NOTIFICATION CLICK
const iconBtn = document.querySelector('.icon-btn');
if (iconBtn) {
  iconBtn.addEventListener('click', () => {
    window.FlowMetrics?.showToast('5 nouvelles alertes IA disponibles', 'success');
  });
}

// HEALTH SCORE COLOR
document.querySelectorAll('.health').forEach(el => {
  const score = parseInt(el.textContent);
  if (score >= 80) el.classList.add('health-good');
  else if (score >= 60) el.classList.add('health-medium');
  else el.classList.add('health-bad');
});

// CLIENT ROW CLICK
document.querySelectorAll('.table-row').forEach(row => {
  row.addEventListener('click', () => {
    const name = row.querySelector('.client-name').textContent.trim();
    window.FlowMetrics?.showToast(`Profil client "${name}" — fonctionnalité complète en production`, 'success');
  });
});

// INSIGHT ACTION BUTTONS
document.querySelectorAll('.insight-action').forEach(btn => {
  btn.addEventListener('click', () => {
    window.FlowMetrics?.showToast('Fonctionnalité disponible en production', 'success');
  });
});

// REPORT BUTTON
const reportBtn = document.querySelector('.preview-btn, .page-actions .btn-ghost');
if (reportBtn) {
  reportBtn.addEventListener('click', () => {
    window.FlowMetrics?.showToast('Génération du rapport en cours...', 'success');
  });
}
