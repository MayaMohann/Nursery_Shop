import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    
    // Updates the quantity of an item in the cart by its id
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem && quantity > 0) {
        // Update the item's quantity only if the new quantity is greater than 0
        existingItem.quantity = quantity;
      }
    },
  },
});

// Export the action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer
export default CartSlice.reducer;
