function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[\d\s\-+()]{7,20}$/.test(phone);
}

function showError(input, message) {
  input.classList.add('error');
  const errorEl = input.parentElement?.querySelector('.form-error');
  if (errorEl) errorEl.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  const errorEl = input.parentElement?.querySelector('.form-error');
  if (errorEl) errorEl.textContent = '';
}

export function initReservation() {
  const form = document.getElementById('reservation-form');
  const success = document.getElementById('reservation-success');
  const guestCount = document.getElementById('guest-count');
  const guestMinus = document.getElementById('guest-minus');
  const guestPlus = document.getElementById('guest-plus');
  const dateInput = document.getElementById('res-date');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  let guests = 2;

  guestMinus?.addEventListener('click', () => {
    if (guests > 1) {
      guests--;
      if (guestCount) guestCount.textContent = guests;
    }
  });

  guestPlus?.addEventListener('click', () => {
    if (guests < 12) {
      guests++;
      if (guestCount) guestCount.textContent = guests;
    }
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = {
      name: form.querySelector('#res-name'),
      email: form.querySelector('#res-email'),
      phone: form.querySelector('#res-phone'),
      date: form.querySelector('#res-date'),
      time: form.querySelector('#res-time'),
    };

    Object.values(fields).forEach(clearError);

    if (!fields.name?.value.trim()) {
      showError(fields.name, 'Please enter your name');
      valid = false;
    }

    if (!fields.email?.value.trim() || !validateEmail(fields.email.value)) {
      showError(fields.email, 'Please enter a valid email');
      valid = false;
    }

    if (!fields.phone?.value.trim() || !validatePhone(fields.phone.value)) {
      showError(fields.phone, 'Please enter a valid phone number');
      valid = false;
    }

    if (!fields.date?.value) {
      showError(fields.date, 'Please select a date');
      valid = false;
    }

    if (!fields.time?.value) {
      showError(fields.time, 'Please select a time');
      valid = false;
    }

    if (!valid) return;

    form.style.display = 'none';
    if (success) {
      success.classList.add('show');
      const date = new Date(fields.date.value).toLocaleDateString('en-US', {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      });
      const timeStr = fields.time.value;
      success.querySelector('.success-details').innerHTML = `
        <strong>${fields.name.value}</strong> — ${guests} guest${guests > 1 ? 's' : ''}<br>
        ${date} at ${timeStr}<br>
        Confirmation sent to ${fields.email.value}
      `;
    }
  });
}

export function initContact() {
  const form = document.getElementById('contact-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    [name, email, message].forEach(clearError);

    if (!name?.value.trim()) {
      showError(name, 'Please enter your name');
      valid = false;
    }

    if (!email?.value.trim() || !validateEmail(email.value)) {
      showError(email, 'Please enter a valid email');
      valid = false;
    }

    if (!message?.value.trim() || message.value.trim().length < 10) {
      showError(message, 'Message must be at least 10 characters');
      valid = false;
    }

    if (!valid) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    }, 1500);
  });
}

export function initNewsletter() {
  const form = document.getElementById('newsletter-form');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');

    if (!input?.value.trim() || !validateEmail(input.value)) {
      input.style.borderColor = '#e74c3c';
      return;
    }

    btn.textContent = '✓';
    input.value = '';
    setTimeout(() => { btn.textContent = 'Join'; }, 2000);
  });
}
