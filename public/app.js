// Require login
requireLogin();

// Setup header
const user = getUser();
document.getElementById('user-name').textContent = user.name;
if (user.role === 'admin') {
  document.getElementById('admin-link').classList.remove('hidden');
}
document.getElementById('logout-btn').addEventListener('click', logout);

// State
let currentStep = 1;
let activeCategory = 'All';
let selections = {
  repairType: null,
  concern: null,
  condition: null,
  correction: null
};

// DOM elements
const stepIndicators = document.querySelectorAll('.step-indicator');
const stepTitle = document.getElementById('step-title');
const optionsGrid = document.getElementById('options-grid');
const categoryBar = document.getElementById('category-bar');
const outputSection = document.getElementById('output-section');
const outputText = document.getElementById('output-text');
const copyBtn = document.getElementById('copy-btn');
const resetBtn = document.getElementById('reset-btn');
const backBtn = document.getElementById('back-btn');

function updateStepIndicators() {
  stepIndicators.forEach((el, i) => {
    const step = i + 1;
    el.classList.remove('active', 'completed');
    if (step === currentStep) el.classList.add('active');
    else if (step < currentStep) el.classList.add('completed');
  });
}

function buildCategoryBar() {
  categoryBar.innerHTML = '';
  Object.keys(REPAIR_CATEGORIES).forEach(cat => {
    const pill = document.createElement('button');
    pill.className = 'category-pill' + (cat === activeCategory ? ' active' : '');
    pill.textContent = cat;
    pill.addEventListener('click', () => {
      activeCategory = cat;
      renderStep();
    });
    categoryBar.appendChild(pill);
  });
}

function getFilteredRepairTypes() {
  if (activeCategory === 'All') return Object.keys(REPAIR_DATA);
  return REPAIR_CATEGORIES[activeCategory] || [];
}

function renderStep() {
  updateStepIndicators();
  optionsGrid.innerHTML = '';
  outputSection.classList.add('hidden');
  backBtn.classList.toggle('hidden', currentStep === 1);
  categoryBar.classList.toggle('hidden', currentStep !== 1);

  if (currentStep === 1) {
    stepTitle.textContent = 'Select Repair Type';
    buildCategoryBar();
    const types = getFilteredRepairTypes();
    types.forEach(type => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = type;
      btn.addEventListener('click', () => {
        selections.repairType = type;
        currentStep = 2;
        renderStep();
      });
      optionsGrid.appendChild(btn);
    });
  } else if (currentStep === 2) {
    stepTitle.textContent = 'Select Customer Concern';
    REPAIR_DATA[selections.repairType].concerns.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        selections.concern = c;
        currentStep = 3;
        renderStep();
      });
      optionsGrid.appendChild(btn);
    });
  } else if (currentStep === 3) {
    stepTitle.textContent = 'Select Condition Found';
    REPAIR_DATA[selections.repairType].conditions.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        selections.condition = c;
        currentStep = 4;
        renderStep();
      });
      optionsGrid.appendChild(btn);
    });
  } else if (currentStep === 4) {
    stepTitle.textContent = 'Select Correction Performed';
    REPAIR_DATA[selections.repairType].corrections.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.textContent = c;
      btn.addEventListener('click', () => {
        selections.correction = c;
        currentStep = 5;
        renderStep();
      });
      optionsGrid.appendChild(btn);
    });
  } else if (currentStep === 5) {
    stepTitle.textContent = 'Repair Order Documentation';
    backBtn.classList.add('hidden');
    showOutput();
  }
}

function showOutput() {
  const text = `REPAIR TYPE: ${selections.repairType}

CONCERN: ${selections.concern}

CAUSE: ${selections.condition}

CORRECTION: ${selections.correction}`;

  outputText.textContent = text;
  outputSection.classList.remove('hidden');
  optionsGrid.innerHTML = '';

  // Log to PocketBase
  authFetch('/api/repairs', {
    method: 'POST',
    body: JSON.stringify({
      repair_type: selections.repairType,
      concern: selections.concern,
      condition: selections.condition,
      correction: selections.correction
    })
  }).catch(() => {});
}

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(outputText.textContent).then(() => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => {
      copyBtn.textContent = 'Copy to Clipboard';
      copyBtn.classList.remove('copied');
    }, 2000);
  });
});

resetBtn.addEventListener('click', () => {
  currentStep = 1;
  activeCategory = 'All';
  selections = { repairType: null, concern: null, condition: null, correction: null };
  renderStep();
});

backBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep--;
    renderStep();
  }
});

// Init
renderStep();
