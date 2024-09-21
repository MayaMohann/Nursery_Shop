import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'; // Use configureStore instead of createStore
// import CartSlice from './Components/CartSlice.jsx';
import CartSlice from './Components/cartSlice.js';
 // Import your cartSlice reducer

const store = configureStore({
    reducer: {
        cart: CartSlice, // Add your cart slice to the store
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
