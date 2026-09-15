import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Photoshoots = lazy(() => import('./pages/Photoshoots'));
const PhotoshootDetails = lazy(() => import('./pages/PhotoshootDetails'));
const Photographers = lazy(() => import('./pages/Photographers'));
const PhotographerProfile = lazy(() => import('./pages/PhotographerProfile'));
const Gallery = lazy(() => import('./pages/Gallery'));
const DigitalStore = lazy(() => import('./pages/DigitalStore'));
const Prints = lazy(() => import('./pages/Prints'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Bookings = lazy(() => import('./pages/Bookings'));
const BookingDetails = lazy(() => import('./pages/BookingDetails'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Collections = lazy(() => import('./pages/Collections'));
const Compare = lazy(() => import('./pages/Compare'));
const Inspiration = lazy(() => import('./pages/Inspiration'));
const ArticleDetails = lazy(() => import('./pages/ArticleDetails'));
const Locations = lazy(() => import('./pages/Locations'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Profile = lazy(() => import('./pages/Profile'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Settings = lazy(() => import('./pages/Settings'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="skeleton" style={{ width: 48, height: 48, borderRadius: '50%' }} />
    </div>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/photoshoots" element={<Photoshoots />} />
            <Route path="/photoshoots/:id" element={<PhotoshootDetails />} />
            <Route path="/photographers" element={<Photographers />} />
            <Route path="/photographers/:id" element={<PhotographerProfile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/digital-store" element={<DigitalStore />} />
            <Route path="/digital-store/:id" element={<ProductDetails type="digital-photo" />} />
            <Route path="/prints" element={<Prints />} />
            <Route path="/prints/:id" element={<ProductDetails type="print" />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings/:id"
              element={
                <ProtectedRoute>
                  <BookingDetails />
                </ProtectedRoute>
              }
            />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/inspiration" element={<Inspiration />} />
            <Route path="/inspiration/:id" element={<ArticleDetails />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route path="/notifications" element={<Notifications />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
