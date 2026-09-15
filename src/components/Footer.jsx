import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Send } from 'lucide-react';
import { InstagramIcon, FacebookIcon, YoutubeIcon, PinterestIcon } from './SocialIcons';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const columns = [
  {
    heading: 'Explore',
    links: [
      { label: 'Photoshoots', to: '/photoshoots' },
      { label: 'Photographers', to: '/photographers' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Prints', to: '/prints' },
      { label: 'Inspiration', to: '/inspiration' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Careers', to: '/about#careers' },
      { label: 'Press', to: '/about#press' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Help Center', to: '/contact' },
      { label: 'Booking Help', to: '/contact#booking' },
      { label: 'Cancellation', to: '/contact#cancellation' },
      { label: 'Privacy', to: '/contact#privacy' },
      { label: 'Terms', to: '/contact#terms' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => loadJSON(STORAGE_KEYS.NEWSLETTER, false));

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    saveJSON(STORAGE_KEYS.NEWSLETTER, true);
    setSubscribed(true);
  };

  return (
    <footer className="footer">
      <div className="container footer-newsletter">
        <div>
          <h3>Stay in the frame.</h3>
          <p className="text-stone">Fresh photographers, seasonal packages, and inspiration — straight to your inbox.</p>
        </div>
        {subscribed ? (
          <p className="footer-subscribed">You're subscribed. Welcome to LUMORA.</p>
        ) : (
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-accent" type="submit">
              <Send size={15} /> Subscribe
            </button>
          </form>
        )}
      </div>

      <hr className="hairline container-hairline" />

      <div className="container footer-columns">
        <div className="footer-brand">
          <Link to="/" className="navbar-logo">
            <Camera size={20} /> <span>LUMORA</span>
          </Link>
          <p className="text-stone">Capture Moments. Create Stories.</p>
          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookIcon /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest"><PinterestIcon /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><YoutubeIcon /></a>
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.heading} className="footer-column">
            <h4>{col.heading}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} LUMORA. All rights reserved.</p>
        <p>Created by Parikshit Jadhav</p>
      </div>
    </footer>
  );
}
