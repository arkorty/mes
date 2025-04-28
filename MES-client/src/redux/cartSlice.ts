import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the type for cart items
interface CartItem {
  id: string ;
  name: string;
  price: number;
  productVariationId: string;
  quantity: number;
  image?: string; // Add this line to include an optional image
}

// ✅ Define the Cart State type
interface CartState {
  items: CartItem[];
  totalQuantity: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addToCart: (
    //   state,
    //   action: PayloadAction<{ id: string | number; name: string; price: number; image?: string }>
    // ) => {
    //   const existingItem = state.items.find((item) => item.id === action.payload.id);
    //   if (existingItem) {
    //     existingItem.quantity += 1;
    //   } else {
    //     state.items.push({ ...action.payload, quantity: 1 });
    //   }
    //   state.totalQuantity += 1;
    // },
    
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        productVariationId: string;
        name: string;
        price: number;
        image?: string;
      }>
    ) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.productVariationId === action.payload.productVariationId
      );
    
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ id: string; productVariationId: string }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.productVariationId === action.payload.productVariationId
      );
    
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    
    
    // removeFromCart: (state, action: PayloadAction<any>) => {
    //   const itemIndex = state.items.findIndex((item) => item.id === action.payload);
    //   if (itemIndex !== -1) {
    //     state.totalQuantity -= state.items[itemIndex].quantity;
    //     state.items.splice(itemIndex, 1);
    //   }
    // },
    // updateQuantity: (state, action: PayloadAction<{ id: any; quantity: any ,productVariationId: any, userId: any }>) => {
    //   const item = state.items.find((item) => item.id === action.payload.id);
    //   if (item && action.payload.quantity >= 1) {
    //     state.totalQuantity += action.payload.quantity - item.quantity;
    //     item.quantity = action.payload.quantity;
    //   }
    // },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        productVariationId: string;
        userId: string;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.productVariationId === action.payload.productVariationId
      );
    
      if (item && action.payload.quantity >= 1) {
        state.totalQuantity += action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
      }
    },


    setCartItemsFromBackend: (
      state,
      action: PayloadAction<CartItem[]>
    ) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((acc, item) => acc + item.quantity, 0);
    }
    
  },
});

// ✅ Export the actions
export const { addToCart, removeFromCart, updateQuantity, setCartItemsFromBackend } = cartSlice.actions;

// ✅ Export the reducer
export default cartSlice.reducer;






