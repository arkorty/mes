import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  items: { id: number; name: string; price: number; quantity: number }[];
  cartCount: number;
}

const initialState: CartState = {
  items: [],
  cartCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ id: number; name: string; price: number }>) => {
      state.items.push({ ...action.payload, quantity: 1 });
      state.cartCount++;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
