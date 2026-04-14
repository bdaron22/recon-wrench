const REPAIR_DATA = {
  "Transmission Flush": {
    concerns: [
      "Customer states transmission shifts hard between gears",
      "Customer states vehicle hesitates when accelerating from a stop",
      "Customer states transmission slips intermittently during normal driving",
      "Customer states delayed engagement when shifting from Park to Drive",
      "Customer states rough or shuddering sensation during gear changes"
    ],
    conditions: [
      "Found automatic transmission fluid dark and discolored beyond manufacturer specification; fluid has exceeded service interval",
      "Found automatic transmission fluid contaminated with particulate matter; fluid viscosity outside Ford specification range",
      "Found automatic transmission fluid at end of service life per Ford maintenance schedule; fluid thermal degradation present",
      "Found automatic transmission fluid oxidized and beyond serviceable condition; fluid no longer meeting Ford WSS-M2C924-A specification",
      "Found automatic transmission fluid breakdown causing degraded shift quality; fluid analysis indicates service required"
    ],
    corrections: [
      "Performed automatic transmission fluid exchange per Ford service procedure; drained and replaced with Motorcraft MERCON ULV fluid to manufacturer specification",
      "Performed complete transmission fluid flush using Ford-approved equipment; filled with Motorcraft MERCON ULV to proper level per dipstick/fill procedure",
      "Performed transmission fluid service per Ford scheduled maintenance; exchanged fluid with Motorcraft MERCON ULV and verified proper fill level",
      "Performed automatic transmission fluid exchange and filter inspection per Ford workshop manual; refilled with Motorcraft MERCON ULV to specification",
      "Performed transmission fluid flush service; replaced with Ford-specified Motorcraft MERCON ULV fluid and road tested to verify proper shift quality"
    ]
  },
  "Brake Fluid Flush": {
    concerns: [
      "Customer states brake pedal feels soft or spongy when applying brakes",
      "Customer states increased stopping distance during normal braking",
      "Customer states brake pedal travels further than normal before engaging",
      "Customer states brakes feel inconsistent or grabby during operation",
      "Customer states brake warning indicator illuminated on instrument cluster"
    ],
    conditions: [
      "Found brake fluid contaminated with moisture content exceeding Ford specification; fluid has exceeded recommended service interval",
      "Found brake fluid test strip indicates moisture content above 3%; fluid degradation compromising braking system hydraulic integrity",
      "Found brake fluid discolored and at end of service life per Ford maintenance schedule; boiling point reduced below safe operating threshold",
      "Found brake fluid copper content elevated beyond serviceable limit per test strip analysis; fluid requires replacement per Ford guidelines",
      "Found brake fluid hygroscopic contamination present; fluid no longer meeting Ford WSS-M6C65-A2 specification for DOT 4 LV"
    ],
    corrections: [
      "Performed brake fluid flush per Ford service procedure; bled all four calipers and replaced with Motorcraft DOT 4 LV brake fluid to specification",
      "Performed complete brake hydraulic system flush; replaced fluid with Motorcraft PM-20 DOT 4 LV at all four corners per Ford workshop manual",
      "Performed brake fluid exchange service per Ford scheduled maintenance; flushed system and refilled with Motorcraft DOT 4 LV brake fluid",
      "Performed brake fluid flush and system bleed per Ford procedure; filled with Motorcraft DOT 4 LV and verified firm pedal feel",
      "Performed brake hydraulic fluid service; exchanged contaminated fluid with Motorcraft DOT 4 LV and road tested to confirm proper brake operation"
    ]
  },
  "Coolant Flush": {
    concerns: [
      "Customer states engine temperature gauge reads higher than normal during driving",
      "Customer states heater is not blowing hot air into cabin as expected",
      "Customer states coolant warning light illuminated on instrument cluster",
      "Customer states noticed coolant discoloration during routine check",
      "Customer states engine overheating warning message displayed on dash"
    ],
    conditions: [
      "Found engine coolant degraded and discolored beyond manufacturer specification; coolant has exceeded Ford recommended service interval",
      "Found engine coolant pH level outside acceptable range per test strip analysis; corrosion inhibitors depleted beyond serviceable limit",
      "Found engine coolant contaminated with rust and particulate matter; coolant no longer providing adequate corrosion protection per Ford specification",
      "Found engine coolant freeze point and boiling point outside Ford specification range; coolant thermal protection compromised",
      "Found engine coolant at end of service life per Ford maintenance schedule; coolant no longer meeting Ford WSS-M97B51-A1 specification"
    ],
    corrections: [
      "Performed engine coolant flush per Ford service procedure; drained and replaced with Motorcraft Orange Prediluted Antifreeze/Coolant to specification",
      "Performed complete cooling system flush using Ford-approved equipment; refilled with Motorcraft VC-3DIL-B to proper level per Ford workshop manual",
      "Performed coolant exchange service per Ford scheduled maintenance; flushed system and filled with Motorcraft Orange Coolant to manufacturer specification",
      "Performed engine coolant flush and system inspection per Ford procedure; replaced with Motorcraft Orange Prediluted Coolant and verified no leaks present",
      "Performed cooling system fluid service; exchanged degraded coolant with Ford-specified Motorcraft Orange Coolant and verified proper fill level and cap seal"
    ]
  },
  "Front Differential Flush": {
    concerns: [
      "Customer states whining or humming noise coming from front of vehicle during driving",
      "Customer states vibration felt through steering wheel during acceleration",
      "Customer states grinding sensation from front end when turning at low speeds",
      "Customer states front drivetrain noise increases with vehicle speed",
      "Customer states unusual noise from front axle area during four-wheel drive operation"
    ],
    conditions: [
      "Found front differential fluid dark and discolored beyond manufacturer specification; fluid has exceeded Ford recommended service interval",
      "Found front differential fluid contaminated with metallic particulate; fluid viscosity degraded beyond Ford serviceable specification",
      "Found front differential fluid at end of service life per Ford maintenance schedule; fluid thermal breakdown present",
      "Found front differential gear oil oxidized and beyond serviceable condition; fluid no longer meeting Ford WSS-M2C200-D2 specification",
      "Found front differential fluid analysis indicates excessive wear material present; fluid change required per Ford service guidelines"
    ],
    corrections: [
      "Performed front differential fluid exchange per Ford service procedure; drained and replaced with Motorcraft SAE 80W-90 gear oil to manufacturer specification",
      "Performed front differential fluid service per Ford workshop manual; refilled with Ford-specified Motorcraft gear lubricant to proper level",
      "Performed front differential flush per Ford scheduled maintenance; exchanged fluid with Motorcraft SAE 80W-90 and verified proper fill level at check plug",
      "Performed front differential gear oil replacement per Ford procedure; filled with Motorcraft gear lubricant to specification and inspected for leaks",
      "Performed front axle differential fluid service; replaced with Ford-specified Motorcraft gear oil and road tested to verify proper operation"
    ]
  },
  "Rear Differential Flush": {
    concerns: [
      "Customer states whining or howling noise from rear of vehicle during driving",
      "Customer states clunking noise from rear end during acceleration or deceleration",
      "Customer states vibration felt from rear of vehicle at highway speeds",
      "Customer states rear drivetrain noise present during turns or cornering",
      "Customer states growling sound from rear axle area that increases with speed"
    ],
    conditions: [
      "Found rear differential fluid dark and degraded beyond manufacturer specification; fluid has exceeded Ford recommended service interval",
      "Found rear differential fluid contaminated with metallic particulate matter; fluid viscosity outside Ford specification range",
      "Found rear differential fluid at end of service life per Ford maintenance schedule; fluid thermal degradation compromising lubrication",
      "Found rear differential gear oil oxidized beyond serviceable condition; fluid no longer meeting Ford WSS-M2C200-D2 specification",
      "Found rear differential fluid analysis indicates wear debris present; fluid replacement required per Ford service guidelines"
    ],
    corrections: [
      "Performed rear differential fluid exchange per Ford service procedure; drained and replaced with Motorcraft SAE 75W-140 synthetic gear oil to specification",
      "Performed rear differential fluid service per Ford workshop manual; refilled with Ford-specified Motorcraft synthetic gear lubricant to proper level",
      "Performed rear differential flush per Ford scheduled maintenance; exchanged fluid with Motorcraft SAE 75W-140 and verified fill level at check plug",
      "Performed rear differential gear oil replacement per Ford procedure; filled with Motorcraft synthetic gear lubricant and inspected for leaks",
      "Performed rear axle differential fluid service; replaced with Ford-specified Motorcraft synthetic gear oil and road tested to verify quiet operation"
    ]
  },
  "Transfer Case Flush": {
    concerns: [
      "Customer states grinding or chattering noise when engaging four-wheel drive",
      "Customer states difficulty shifting between 2WD and 4WD modes",
      "Customer states vibration or shudder during four-wheel drive operation",
      "Customer states transfer case warning indicator illuminated on dash",
      "Customer states noise from center of vehicle during low-speed four-wheel drive maneuvers"
    ],
    conditions: [
      "Found transfer case fluid dark and discolored beyond manufacturer specification; fluid has exceeded Ford recommended service interval",
      "Found transfer case fluid contaminated with particulate matter; fluid viscosity degraded beyond Ford serviceable specification",
      "Found transfer case fluid at end of service life per Ford maintenance schedule; fluid no longer providing adequate lubrication",
      "Found transfer case fluid oxidized beyond serviceable condition; fluid no longer meeting Ford WSS-M2C200-D2 specification",
      "Found transfer case fluid thermal breakdown present; fluid analysis indicates service required per Ford guidelines"
    ],
    corrections: [
      "Performed transfer case fluid exchange per Ford service procedure; drained and replaced with Motorcraft transfer case fluid to manufacturer specification",
      "Performed transfer case fluid service per Ford workshop manual; refilled with Ford-specified Motorcraft fluid to proper level at fill plug",
      "Performed transfer case flush per Ford scheduled maintenance; exchanged fluid with Motorcraft transfer case fluid and verified proper fill level",
      "Performed transfer case fluid replacement per Ford procedure; filled with Motorcraft fluid to specification and verified smooth 4WD engagement",
      "Performed transfer case fluid service; replaced with Ford-specified Motorcraft fluid and road tested to verify proper four-wheel drive operation"
    ]
  },
  "Transmission Repair": {
    concerns: [
      "Customer states transmission will not shift out of first gear",
      "Customer states check engine light on with harsh shifting from transmission",
      "Customer states vehicle goes into limp mode during normal driving",
      "Customer states complete loss of forward or reverse gear engagement",
      "Customer states transmission makes loud mechanical noise during gear changes"
    ],
    conditions: [
      "Found diagnostic trouble codes stored in PCM related to transmission operation; internal transmission component failure confirmed per Ford diagnostic procedure",
      "Found transmission solenoid body assembly malfunction per Ford PID/diagnostic data; solenoid performance outside specification during active testing",
      "Found transmission clutch pack failure per Ford diagnostic procedure; clutch apply pressure and slip data outside specification during road test",
      "Found transmission valve body malfunction confirmed per Ford workshop manual diagnostic flowchart; hydraulic pressure test results outside specification",
      "Found internal transmission mechanical failure per Ford diagnostic procedure; teardown inspection reveals worn/damaged components requiring repair"
    ],
    corrections: [
      "Removed and rebuilt automatic transmission per Ford workshop manual; replaced failed internal components and all seals; refilled with Motorcraft MERCON ULV and road tested to verify repair",
      "Replaced transmission solenoid body assembly per Ford service procedure; cleared DTCs, performed TCM adaptive relearn, and road tested to verify proper shift quality",
      "Replaced transmission clutch pack assembly per Ford workshop manual; reassembled transmission with new seals and Motorcraft MERCON ULV; performed adaptive relearn and road tested",
      "Replaced transmission valve body per Ford service procedure; installed new gaskets and refilled with Motorcraft MERCON ULV; performed TCM reset and road tested to confirm repair",
      "Replaced automatic transmission assembly with Ford-remanufactured unit per workshop manual; filled with Motorcraft MERCON ULV, performed TCM adaptive relearn, and road tested to verify"
    ]
  }
};

// State
let currentStep = 1;
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

function renderStep() {
  updateStepIndicators();
  optionsGrid.innerHTML = '';
  outputSection.classList.add('hidden');
  backBtn.classList.toggle('hidden', currentStep === 1);

  if (currentStep === 1) {
    stepTitle.textContent = 'Select Repair Type';
    const types = Object.keys(REPAIR_DATA);
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
    const concerns = REPAIR_DATA[selections.repairType].concerns;
    concerns.forEach(c => {
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
    const conditions = REPAIR_DATA[selections.repairType].conditions;
    conditions.forEach(c => {
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
    const corrections = REPAIR_DATA[selections.repairType].corrections;
    corrections.forEach(c => {
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
  fetch('/api/repairs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
