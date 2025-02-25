import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(state.value);
      const product = action.payload;

      const foundItem = state.value.find(
        (item) => item.product._id === product._id
      );
      if (foundItem) {
        foundItem.quantity += 1;
        return;
      }
      state.value.push({ product: action.payload, quantity: 1 });
    },
    clearCart: (state) => {
      state.value = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
