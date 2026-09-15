import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authHeroImage } from '../data/images';
import { isValidEmail } from '../utils/validation';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <div className="fade-in auth-layout">
      <div className="auth-visual">
        <img src={authHeroImage} alt="" />
        <div className="auth-visual-caption">
          <h3>Forgot your password?</h3>
          <p>We'll simulate sending a reset link to your inbox.</p>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-box">
          <h2>Reset your password.</h2>
          <p className="text-stone">Enter your account email — this is a frontend simulation, no email is actually sent.</p>

          {sent ? (
            <p style={{ color: 'var(--success)', marginBottom: 20 }}>If an account exists for {email}, a reset link has been "sent".</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                {error && <span className="field-error">{error}</span>}
              </div>
              <button className="btn btn-primary btn-block" type="submit">Send Reset Link</button>
            </form>
          )}

          <p className="auth-switch"><Link to="/login">← Back to login</Link></p>
        </div>
      </div>
    </div>
  );
}
