
/**
 * THE PET THEORY - INTERACTIVE VIBE CODED SCRIPTS
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initHeaderScroll();
  initHotspots();
  initNutritionCalculator();
  initFaqAccordion();
  initMobileNav();
  initPlanSelectors();
  initPartnerModal();
});

/* 1. Scroll Progress & Background Interpolation */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  const whySection = document.getElementById('why-india');
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // Subtle background color transition past hero
    if (whySection) {
      const whyTop = whySection.offsetTop - 200;
      if (winScroll > whyTop) {
        document.body.style.backgroundColor = '#F4E8D8';
      } else {
        document.body.style.backgroundColor = '#FAF4EB';
      }
    }
  }, { passive: true });
}

/* 2. Sticky Header Elevation */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* 3. Interactive Product Hotspots */
const hotspotData = {
  pod: {
    title: "📍 GPS & Bluetooth Tracker Module",
    desc: "Houses the GPS and Bluetooth antenna in a compact, matte-black weatherproof shell — small enough to sit flush on the collar without unbalancing smaller breeds. The tracker handles pairing and manual location pings; the status LED shows green for active tracking, amber for charging or low battery."
  },
  stitch: {
    title: "🧵 Dual High-Tensile Orange Stitching",
    desc: "120kg pull-strength nylon webbing with reinforced box stitches. Withstands sudden lunges, heavy tug-of-war, and rough scrub trails without fraying or ripping."
  },
  tag: {
    title: "🏷️ Laser-Etched ID Tag",
    desc: "A tag with your dog's name, built to outlast daily wear. A low-tech backup to the GPS tracker — if the collar's ever lost or the battery dies, anyone who finds your dog can still reach you."
  },
  buckle: {
    title: "🔒 Quick-Release Safety Buckle",
    desc: "One-handed quick-release clasp for fast on/off, engineered to hold firm under normal pulling but release cleanly if the collar ever gets caught or snagged — a safety feature, not just a convenience one."
  }
};

function initHotspots() {
  const pins = document.querySelectorAll('.hotspot-pin');
  const detailBox = document.getElementById('hotspot-detail-box');
  if (!detailBox) return;

  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const key = pin.getAttribute('data-spot');
      const data = hotspotData[key];
      if (data) {
        detailBox.innerHTML = '<h4>' + data.title + '</h4><p>' + data.desc + '</p>';
        pins.forEach(p => p.style.backgroundColor = 'var(--orange)');
        pin.style.backgroundColor = 'var(--forest)';
      }
    });
  });
}

/* 4. Interactive Breed Nutrition Calculator */
const breedProfiles = {
  "indie": { name: "Indie / Desi Dog", baseWeight: 22, factor: 1.4, note: "Naturally heat resilient. Thrives on balanced proteins, curd, and seasonal vegetables." },
  "labrador": { name: "Labrador Retriever", baseWeight: 30, factor: 1.3, note: "Prone to obesity in Indian apartments. Keep carbs controlled and avoid table ghee." },
  "golden": { name: "Golden Retriever", baseWeight: 28, factor: 1.4, note: "Thick coat requires omega-rich proteins and high hydration, especially May through July." },
  "beagle": { name: "Beagle", baseWeight: 12, factor: 1.5, note: "High metabolic burn. Ensure adequate protein portions to prevent begging habits." },
  "germanshepherd": { name: "German Shepherd", baseWeight: 34, factor: 1.4, note: "Sensitive digestive tract in monsoon. Stick to vet-cleared single protein sources." },
  "shihtzu": { name: "Shih Tzu", baseWeight: 7, factor: 1.6, note: "Brachycephalic breed highly vulnerable to summer overheating. Feed cooling meals." }
};

function initNutritionCalculator() {
  const breedSelect = document.getElementById('calc-breed');
  const weightInput = document.getElementById('calc-weight');
  const weightDisplay = document.getElementById('calc-weight-val');
  const activitySelect = document.getElementById('calc-activity');

  if (!breedSelect || !weightInput) return;

  function updateCalc() {
    const breedKey = breedSelect.value;
    const profile = breedProfiles[breedKey] || breedProfiles["indie"];
    const weight = parseFloat(weightInput.value) || profile.baseWeight;
    if (weightDisplay) weightDisplay.textContent = weight + ' kg';

    const activityMult = parseFloat(activitySelect.value) || 1.4;
    // Standard Canine Resting Energy Requirement (RER): 70 * (weight ^ 0.75)
    const rer = 70 * Math.pow(weight, 0.75);
    const totalCalories = Math.round(rer * activityMult);

    // Portion recommendations
    const kibbleGrams = Math.round(totalCalories * 0.26);
    const homeProteinGrams = Math.round(weight * 9.5);
    const curdMl = Math.round(weight * 6);
    const waterLiters = (weight * 0.065).toFixed(1);

    const calDisplay = document.getElementById('calc-calories-display');
    if (calDisplay) calDisplay.textContent = totalCalories;

    const kibbleEl = document.getElementById('calc-kibble');
    const proteinEl = document.getElementById('calc-protein');
    const curdEl = document.getElementById('calc-curd');
    const waterEl = document.getElementById('calc-water');
    const noteEl = document.getElementById('calc-breed-note');

    if (kibbleEl) kibbleEl.textContent = kibbleGrams + 'g / day';
    if (proteinEl) proteinEl.textContent = homeProteinGrams + 'g (boiled chicken/egg/paneer)';
    if (curdEl) curdEl.textContent = curdMl + 'ml fresh curd';
    if (waterEl) waterEl.textContent = waterLiters + ' Litres / day';
    if (noteEl) noteEl.textContent = profile.note;
  }

  breedSelect.addEventListener('change', () => {
    const selected = breedProfiles[breedSelect.value];
    if (selected) {
      weightInput.value = selected.baseWeight;
    }
    updateCalc();
  });

  weightInput.addEventListener('input', updateCalc);
  activitySelect.addEventListener('change', updateCalc);

  updateCalc();
}

/* 5. FAQ Accordion */
function initFaqAccordion() {
  const cards = document.querySelectorAll('.faq-card');
  cards.forEach(card => {
    const trigger = card.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');
      cards.forEach(c => c.classList.remove('open'));
      if (!isOpen) {
        card.classList.add('open');
      }
    });
  });
}

/* 6. Mobile Nav */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('active');
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  });
}

/* 7. Plan Selector & Smooth Pre-fill */
let currentSelectedPlan = "The Pet Theory Live (₹X,XXX)";

function initPlanSelectors() {
  const tabLive = document.getElementById('tab-plan-live');
  const tabCore = document.getElementById('tab-plan-core');

  if (tabLive && tabCore) {
    tabLive.addEventListener('click', () => {
      tabLive.classList.add('active');
      tabCore.classList.remove('active');
      currentSelectedPlan = "The Pet Theory Live (₹X,XXX)";
    });

    tabCore.addEventListener('click', () => {
      tabCore.classList.add('active');
      tabLive.classList.remove('active');
      currentSelectedPlan = "The Pet Theory Core (₹X,XXX)";
    });
  }
}

function selectPlanAndScroll(planType) {
  const waitlistSection = document.getElementById('waitlist');
  const tabLive = document.getElementById('tab-plan-live');
  const tabCore = document.getElementById('tab-plan-core');

  if (planType === 'Core' && tabCore && tabLive) {
    tabCore.click();
  } else if (tabLive) {
    tabLive.click();
  }

  if (waitlistSection) {
    waitlistSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* 8. Supabase Client */
const SUPABASE_URL = 'https://esqpvaqtiygvihzdmkam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzcXB2YXF0aXlndmloemRta2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjIwMDksImV4cCI6MjEwMzk5ODAwOX0.4b041JX7tLW2SXbWt0L69Fow3t4UUk9Lx3GJaV4Xgms';
const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/* 9. Functional Waitlist Submit Handler */
async function handleWaitlistSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('wl-name');
  const emailInput = document.getElementById('wl-email');
  const dogNameInput = document.getElementById('wl-dog-name');
  const phoneInput = document.getElementById('wl-phone');
  const honeypotInput = document.getElementById('wl-website');
  const errorMsg = document.getElementById('wl-error');
  const submitBtn = document.getElementById('wl-submit-btn');

  // Honeypot check: real users never fill this hidden field. Silently bail if it's filled.
  if (honeypotInput && honeypotInput.value.trim() !== '') {
    return;
  }

  if (!emailInput) return;
  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput.value.trim();
  const phone = phoneInput ? phoneInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

  [nameInput, phoneInput, emailInput].forEach(el => el && el.classList.remove('error'));

  if (!name) {
    if (errorMsg) {
      errorMsg.textContent = 'Please enter your name.';
      errorMsg.style.display = 'block';
    }
    if (nameInput) nameInput.classList.add('error');
    return;
  }

  if (!phone || !phoneRegex.test(phone)) {
    if (errorMsg) {
      errorMsg.textContent = 'Please enter a valid phone number.';
      errorMsg.style.display = 'block';
    }
    if (phoneInput) phoneInput.classList.add('error');
    return;
  }

  if (!email || !emailRegex.test(email)) {
    if (errorMsg) {
      errorMsg.textContent = 'Please enter a valid email address.';
      errorMsg.style.display = 'block';
    }
    emailInput.classList.add('error');
    return;
  }

  if (errorMsg) errorMsg.style.display = 'none';
  emailInput.classList.remove('error');

  if (submitBtn) {
    submitBtn.textContent = 'Securing Your Priority Spot...';
    submitBtn.disabled = true;
  }

  const dogName = dogNameInput ? dogNameInput.value.trim() : 'Your Dog';

  if (!supabaseClient) {
    console.error('Supabase client not initialized — check the CDN script tag and credentials in app.js');
    if (errorMsg) {
      errorMsg.textContent = 'Something went wrong. Please try again in a moment.';
      errorMsg.style.display = 'block';
    }
    if (submitBtn) {
      submitBtn.textContent = 'Join Priority Waitlist \u2192';
      submitBtn.disabled = false;
    }
    return;
  }

  try {
    const { error } = await supabaseClient.from('waitlist_entries').insert([{
      name,
      email,
      phone,
      dog_name: dogName,
      plan: currentSelectedPlan
    }]);

    if (error) throw error;
  } catch (err) {
    console.error('Supabase insert failed:', err);
    let message = 'Something went wrong saving your spot. Please try again.';
    if (err && err.code === '23505') {
      message = err.message && err.message.includes('phone')
        ? 'That phone number is already on the waitlist.'
        : 'That email is already on the waitlist.';
    }
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
    }
    if (submitBtn) {
      submitBtn.textContent = 'Join Priority Waitlist \u2192';
      submitBtn.disabled = false;
    }
    return;
  }

  document.getElementById('waitlist-form-wrap').style.display = 'none';
  const successView = document.getElementById('waitlist-success-wrap');
  if (successView) {
    successView.style.display = 'block';
  }

  const regName = document.getElementById('success-dog-name');
  const regEmail = document.getElementById('success-email-display');
  const regPlan = document.getElementById('success-plan-display');

  if (regName) regName.textContent = dogName || 'your dog';
  if (regEmail) regEmail.textContent = email;
  if (regPlan) regPlan.textContent = currentSelectedPlan;

  // Trigger celebratory confetti
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F4762C', '#2E6F4D', '#FAF4EB', '#231B15']
    });
  }
}

function resetWaitlist() {
  document.getElementById('waitlist-form-wrap').style.display = 'block';
  document.getElementById('waitlist-success-wrap').style.display = 'none';
  const emailInput = document.getElementById('wl-email');
  const submitBtn = document.getElementById('wl-submit-btn');
  if (emailInput) emailInput.value = '';
  if (submitBtn) {
    submitBtn.textContent = 'Join Priority Waitlist →';
    submitBtn.disabled = false;
  }
}

/* 10. Partner Modal */
function initPartnerModal() {
  const modal = document.getElementById('partner-modal');
  const openBtns = document.querySelectorAll('.open-partner-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('partner-form');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('partner-form-inner').style.display = 'none';
      document.getElementById('partner-success-box').style.display = 'block';
    });
  }
}
