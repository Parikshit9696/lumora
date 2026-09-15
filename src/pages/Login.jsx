import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authHeroImage } from '../data/images';
import { useAuth } from '../context/AuthContext';
import { validateLogin, hasErrors } from '../utils/validation';

export default function Login() {
  const { login, loginWithDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateLogin(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    const result = login(form);
    if (!result.success) {
      setServerError(result.message);
      return;
    }
    navigate(redirectTo);
  };

  const handleDemo = () => {
    loginWithDemo();
    navigate(redirectTo);
  };

  return (
    <div className="fade-in auth-layout">
      <div className="auth-visual">
        <img src={authHeroImage} alt="" />
        <div className="auth-visual-caption">
          <h3>Capture Moments. Create Stories.</h3>
          <p>Sign in to manage your bookings, wishlist, and photography orders.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <h2>Welcome back.</h2>
          <p className="text-stone">Log in to continue to LUMORA.</p>

          <div className="auth-demo-note">
            Demo account — Email: <strong>demo@lumora.com</strong> · Password: <strong>demo123</strong>
            <div><button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: 10 }} onClick={handleDemo}>Use Demo Account</button></div>
          </div>

          <form onSubmit={handleSubmit}>
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
            {serverError && <p className="field-error" style={{ marginBottom: 16 }}>{serverError}</p>}
            <Link to="/forgot-password" style={{ fontSize: 13, color: 'var(--bronze)' }}>Forgot password?</Link>
            <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: 18 }}>Log In</button>
          </form>

          <p className="auth-switch">Don't have an account? <Link to="/register">Create one</Link></p>
        </div>
      </div>
    </div>
  );
}
