/* ============================================
   FLOWMETRICS — AUTH JS
   ============================================ */

// PASSWORD TOGGLE
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    btn.textContent = isPassword ? '🙈' : '👁';
  });
});

// PASSWORD STRENGTH
const pwInput = document.getElementById('signup-password');
const strengthFill = document.getElementById('strength-fill');
const strengthLabel = document.getElementById('strength-label');

if (pwInput) {
  pwInput.addEventListener('input', () => {
    const val = pwInput.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const levels = [
      { pct: '0%', color: '#ef4444', label: 'Entrez un mot de passe' },
      { pct: '25%', color: '#ef4444', label: 'Trop faible' },
      { pct: '50%', color: '#f59e0b', label: 'Moyen' },
      { pct: '75%', color: '#6366f1', label: 'Bon' },
      { pct: '100%', color: '#10b981', label: 'Très sécurisé ✓' },
    ];

    const level = val.length === 0 ? levels[0] : levels[score];
    if (strengthFill) {
      strengthFill.style.width = level.pct;
      strengthFill.style.background = level.color;
    }
    if (strengthLabel) strengthLabel.textContent = level.label;
  });
}

// MULTI-STEP SIGNUP
function setStep(n) {
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`step-${i}`);
    const ind = document.getElementById(`step-indicator-${i}`);
    if (el) el.style.display = i === n ? 'flex' : 'none';
    if (el) el.style.flexDirection = 'column';
    if (el) el.style.gap = '16px';
    if (ind) {
      ind.classList.remove('active', 'done');
      if (i < n) ind.classList.add('done');
      if (i === n) ind.classList.add('active');
    }
  });
}

const nextStep1 = document.getElementById('next-step-1');
if (nextStep1) {
  nextStep1.addEventListener('click', () => {
    const email = document.getElementById('signup-email');
    const pw = document.getElementById('signup-password');
    if (!email?.value || !pw?.value) {
      window.FlowMetrics?.showToast('Veuillez remplir tous les champs', 'error');
      return;
    }
    setStep(2);
  });
}

const nextStep2 = document.getElementById('next-step-2');
if (nextStep2) {
  nextStep2.addEventListener('click', () => setStep(3));
}

const prevStep2 = document.getElementById('prev-step-2');
if (prevStep2) prevStep2.addEventListener('click', () => setStep(1));

const prevStep3 = document.getElementById('prev-step-3');
if (prevStep3) prevStep3.addEventListener('click', () => setStep(2));

// SIGNUP FORM
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-signup');
    btn.textContent = 'Création en cours...';
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1800);
  });
}

// LOGIN FORM
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    btn.textContent = 'Connexion en cours...';
    btn.disabled = true;

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1500);
  });
}

// SSO
function handleSSO(provider) {
  window.FlowMetrics?.showToast(`Redirection vers ${provider}...`, 'success');
  setTimeout(() => {
    window.location.href = 'dashboard.html';
  }, 1500);
}
