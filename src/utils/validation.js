// ============================================================
// LUMORA — Validation helpers
// ============================================================

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

export function isValidPhone(value) {
  return /^[0-9+\-\s()]{7,15}$/.test(String(value || '').trim());
}

export function isRequired(value) {
  return String(value ?? '').trim().length > 0;
}

export function minLength(value, len) {
  return String(value ?? '').trim().length >= len;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!isRequired(email)) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!isRequired(password)) errors.password = 'Password is required.';
  else if (!minLength(password, 6)) errors.password = 'Password must be at least 6 characters.';
  return errors;
}

export function validateRegister({ name, email, password, confirmPassword }) {
  const errors = validateLogin({ email, password });
  if (!isRequired(name)) errors.name = 'Full name is required.';
  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  return errors;
}

export function validateContactForm({ name, email, phone, subject, message }) {
  const errors = {};
  if (!isRequired(name)) errors.name = 'Please tell us your name.';
  if (!isRequired(email)) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (phone && !isValidPhone(phone)) errors.phone = 'Enter a valid phone number.';
  if (!isRequired(subject)) errors.subject = 'Please add a subject.';
  if (!isRequired(message) || !minLength(message, 10)) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export function validateCheckoutInfo({ name, email, phone, address, city, pincode }) {
  const errors = {};
  if (!isRequired(name)) errors.name = 'Name is required.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!isValidPhone(phone)) errors.phone = 'Enter a valid phone number.';
  if (!isRequired(address)) errors.address = 'Address is required.';
  if (!isRequired(city)) errors.city = 'City is required.';
  if (!/^[0-9]{6}$/.test(String(pincode || '').trim())) errors.pincode = 'Enter a valid 6-digit pincode.';
  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
