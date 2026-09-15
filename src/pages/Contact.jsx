import { useState } from 'react';
import { Mail, Phone, Clock } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from '../components/SocialIcons';
import { validateContactForm, hasErrors } from '../utils/validation';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const faqs = [
  { q: 'How do I book a photoshoot?', a: 'Browse Photoshoots or Photographers, choose a package, select a date and add-ons, then complete checkout.' },
  { q: 'Can I cancel or reschedule?', a: 'Yes — visit My Bookings, open the booking, and use Reschedule or Cancel Booking.' },
  { q: 'How are prints delivered?', a: 'Prints ship to the address entered at checkout; digital photos are available instantly in your account.' },
  { q: 'Is my payment secure?', a: 'This is a frontend demo — no real payment is processed or stored anywhere.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validateContactForm(form);
    setErrors(errs);
    if (hasErrors(errs)) return;
    const messages = loadJSON(STORAGE_KEYS.CONTACT_MESSAGES, []);
    saveJSON(STORAGE_KEYS.CONTACT_MESSAGES, [...messages, { ...form, id: `msg-${Date.now()}`, date: new Date().toISOString() }]);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>Get in Touch.</h1>
          <p>Questions about a booking, a package, or partnering with LUMORA? We'd love to hear from you.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="detail-layout">
            <div>
              <div className="card" style={{ padding: 28 }} id="booking">
                <h3 style={{ marginBottom: 20 }}>Send us a message</h3>
                {submitted && <p style={{ color: 'var(--success)', marginBottom: 16 }}>Thanks — your message has been received. We'll reply within 24 hours.</p>}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-2">
                    <div className="field">
                      <label>Name</label>
                      <input value={form.name} onChange={(e) => update({ name: e.target.value })} />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input type="email" value={form.email} onChange={(e) => update({ email: e.target.value })} />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                    <div className="field">
                      <label>Phone (optional)</label>
                      <input value={form.phone} onChange={(e) => update({ phone: e.target.value })} />
                      {errors.phone && <span className="field-error">{errors.phone}</span>}
                    </div>
                    <div className="field">
                      <label>Subject</label>
                      <input value={form.subject} onChange={(e) => update({ subject: e.target.value })} />
                      {errors.subject && <span className="field-error">{errors.subject}</span>}
                    </div>
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea value={form.message} onChange={(e) => update({ message: e.target.value })} />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>
                  <button className="btn btn-primary" type="submit">Send Message</button>
                </form>
              </div>

              <div className="detail-section" id="cancellation" style={{ marginTop: 40 }}>
                <h3>Frequently Asked Questions</h3>
                {faqs.map((f) => (
                  <div key={f.q} className="faq-item">
                    <p className="faq-question" style={{ cursor: 'default' }}>{f.q}</p>
                    <p className="faq-answer">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="card profile-side-card">
                <h4>Contact Details</h4>
                <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 10 }}><Mail size={14} /> hello@lumora.studio</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 10 }}><Phone size={14} /> +91 98765 43210</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}><Clock size={14} /> Mon–Sat, 9am–7pm IST</p>
              </div>
              <div className="card profile-side-card" id="privacy">
                <h4>Privacy & Terms</h4>
                <p className="text-stone" style={{ fontSize: 13.5, lineHeight: 1.7 }}>
                  LUMORA is a frontend demo project. No personal data is transmitted to a server — everything you enter is stored locally in your browser.
                </p>
              </div>
              <div className="card profile-side-card" id="terms">
                <h4>Follow LUMORA</h4>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn-icon"><InstagramIcon size={16} /></a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn-icon"><FacebookIcon size={16} /></a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-icon"><YoutubeIcon size={16} /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
