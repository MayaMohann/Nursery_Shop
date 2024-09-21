import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      // Remove item by filtering out the one that matches the name
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },
    
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      // Find the item and update its quantity
      const item = state.items.find(item => item.name === name);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },
  },
});


export default CartSlice.reducer;