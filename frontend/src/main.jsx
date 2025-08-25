import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

//context providers for global state
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// create rootand render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* wrap the whole app with AuthProvider (manages login/register state)  */}
    <AuthProvider>
      {/* wrap inside  CartProvider (manages shopping cart state) */}
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
