// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // ✅ Define the type for cart items
// interface CartItem {
//   id: string | number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // ✅ Define the Cart State type
// interface CartState {
//   items: CartItem[];
//   totalQuantity: number;
// }

// const initialState: CartState = {
//   items: [],
//   totalQuantity: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<{ id: string; name: string; price: number }>) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       state.totalQuantity += 1;
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       if (itemIndex !== -1) {
//         state.totalQuantity -= state.items[itemIndex].quantity;
//         state.items.splice(itemIndex, 1);
//       }
//     },
//     increaseQuantity: (state, action: PayloadAction<string>) => {
//       const item = state.items.find((item) => item.id === action.payload);
//       if (item) {
//         item.quantity += 1;
//         state.totalQuantity += 1;
//       }
//     },
//     decreaseQuantity: (state, action: PayloadAction<string>) => {
//       const item = state.items.find((item) => item.id === action.payload);
//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//         state.totalQuantity -= 1;
//       }
//     },

//     updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item && action.payload.quantity > 0) {
//         state.totalQuantity += action.payload.quantity - item.quantity;
//         item.quantity = action.payload.quantity;
//       }
//     },
//   },
// });

// // ✅ Export the actions
// export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity } = cartSlice.actions;

// // ✅ Export the reducer
// export default cartSlice.reducer;









import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the type for cart items
interface CartItem {
  id: string | number;
  name: string;
  price: number;
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
    addToCart: (
      state,
      action: PayloadAction<{ id: string | number; name: string; price: number; image?: string }>
    ) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity += 1;
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item && action.payload.quantity >= 1) {
        state.totalQuantity += action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
      }
    },
  },
});

// ✅ Export the actions
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// ✅ Export the reducer
export default cartSlice.reducer;
