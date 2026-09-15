import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { experienceImage } from '../data/images';
import { useAuth } from '../context/AuthContext';
import { validateRegister, hasErrors } from '../utils/validation';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateRegister(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    const result = register(form);
    if (!result.success) {
      setServerError(result.message);
      return;
    }
    navigate('/');
  };

  return (
    <div className="fade-in auth-layout">
      <div className="auth-visual">
        <img src={experienceImage} alt="" />
        <div className="auth-visual-caption">
          <h3>Join LUMORA.</h3>
          <p>Create an account to save favourites, book photoshoots, and track orders.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <h2>Create your account.</h2>
          <p className="text-stone">It only takes a minute — this is a frontend demo, no verification email is sent.</p>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>
            <div className="field">
              <label>Confirm Password</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>
            {serverError && <p className="field-error" style={{ marginBottom: 16 }}>{serverError}</p>}
            <button className="btn btn-primary btn-block" type="submit">Create Account</button>
          </form>

          <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}
