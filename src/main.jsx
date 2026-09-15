import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { CollectionsProvider } from './context/CollectionsContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <CollectionsProvider>
                  <CompareProvider>
                    <BookingProvider>
                      <App />
                    </BookingProvider>
                  </CompareProvider>
                </CollectionsProvider>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
