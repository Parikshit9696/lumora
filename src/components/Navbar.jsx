import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Bell, User, Menu, X, Camera, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotifications } from '../context/NotificationContext';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Photographers', to: '/photographers' },
  { label: 'Photoshoots', to: '/photoshoots' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Prints', to: '/prints' },
  { label: 'Inspiration', to: '/inspiration' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { unreadCount } = useNotifications();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo">
            <Camera size={22} strokeWidth={1.6} />
            <span>LUMORA</span>
          </Link>

          <nav className="navbar-links" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="btn-icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <Link className="btn-icon icon-badge" to="/wishlist" aria-label="Wishlist">
              <Heart size={18} />
              {wishlistCount > 0 && <span className="badge-count">{wishlistCount}</span>}
            </Link>
            <Link className="btn-icon icon-badge" to="/cart" aria-label="Cart">
              <ShoppingBag size={18} />
              {itemCount > 0 && <span className="badge-count">{itemCount}</span>}
            </Link>
            <Link className="btn-icon icon-badge" to="/notifications" aria-label="Notifications">
              <Bell size={18} />
              {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
            </Link>

            <div className="navbar-profile" ref={profileRef}>
              <button className="btn-icon" aria-label="Profile menu" onClick={() => setProfileOpen((o) => !o)}>
                {isAuthenticated && user?.avatar ? (
                  <img src={user.avatar} alt="" className="navbar-avatar" />
                ) : (
                  <User size={18} />
                )}
              </button>
              {profileOpen && (
                <div className="navbar-profile-menu fade-in">
                  {isAuthenticated ? (
                    <>
                      <p className="navbar-profile-name">{user.name}</p>
                      <Link to="/profile" onClick={() => setProfileOpen(false)}>Overview</Link>
                      <Link to="/bookings" onClick={() => setProfileOpen(false)}>My Bookings</Link>
                      <Link to="/wishlist" onClick={() => setProfileOpen(false)}>Wishlist</Link>
                      <Link to="/settings" onClick={() => setProfileOpen(false)}><Settings size={14} /> Settings</Link>
                      {user.isAdmin && (
                        <Link to="/admin" onClick={() => setProfileOpen(false)}>
                          <LayoutDashboard size={14} /> Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                          navigate('/');
                        }}
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setProfileOpen(false)}>Login</Link>
                      <Link to="/register" onClick={() => setProfileOpen(false)}>Register</Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <Link to="/photoshoots" className="btn btn-accent btn-sm navbar-cta">
              Book a Shoot
            </Link>

            <button className="btn-icon navbar-menu-toggle" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className={`navbar-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="navbar-drawer-head">
          <Link to="/" className="navbar-logo" onClick={() => setDrawerOpen(false)}>
            <Camera size={20} /> <span>LUMORA</span>
          </Link>
          <button className="btn-icon" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <nav className="navbar-drawer-links">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} onClick={() => setDrawerOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <hr className="hairline" />
          <NavLink to="/cart" onClick={() => setDrawerOpen(false)}>Cart ({itemCount})</NavLink>
          <NavLink to="/wishlist" onClick={() => setDrawerOpen(false)}>Wishlist ({wishlistCount})</NavLink>
          <NavLink to="/bookings" onClick={() => setDrawerOpen(false)}>My Bookings</NavLink>
          <NavLink to="/notifications" onClick={() => setDrawerOpen(false)}>Notifications</NavLink>
          {isAuthenticated ? (
            <NavLink to="/profile" onClick={() => setDrawerOpen(false)}>Profile</NavLink>
          ) : (
            <NavLink to="/login" onClick={() => setDrawerOpen(false)}>Login</NavLink>
          )}
        </nav>
        <Link to="/photoshoots" className="btn btn-accent btn-block" onClick={() => setDrawerOpen(false)}>
          Book a Shoot
        </Link>
      </div>
      {drawerOpen && <div className="navbar-drawer-scrim" onClick={() => setDrawerOpen(false)} />}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
