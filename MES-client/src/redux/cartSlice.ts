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









// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // ✅ Define the type for cart items
// interface CartItem {
//   id: string | number;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string; // Add this line to include an optional image
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
//     addToCart: (
//       state,
//       action: PayloadAction<{ id: string | number; name: string; price: number; image?: string }>
//     ) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       state.totalQuantity += 1;
//     },
//     removeFromCart: (state, action: PayloadAction<string | number>) => {
//       const itemIndex = state.items.findIndex((item) => item.id === action.payload);
//       if (itemIndex !== -1) {
//         state.totalQuantity -= state.items[itemIndex].quantity;
//         state.items.splice(itemIndex, 1);
//       }
//     },
//     updateQuantity: (state, action: PayloadAction<{ id: string | number; quantity: number }>) => {
//       const item = state.items.find((item) => item.id === action.payload.id);
//       if (item && action.payload.quantity >= 1) {
//         state.totalQuantity += action.payload.quantity - item.quantity;
//         item.quantity = action.payload.quantity;
//       }
//     },
//   },
// });

// // ✅ Export the actions
// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

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
    removeFromCart: (state, action: PayloadAction<any>) => {
      const itemIndex = state.items.findIndex((item) => item.id === action.payload);
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: any; quantity: any ,productVariationId: any, userId: any }>) => {
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








// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getCartDetails as getCartDetailsAPI,
//   addToCart as addToCartAPI,
//   removeFromCart as removeFromCartAPI,
//   updateCart as updateCartAPI,
// } from "../api/index";

// // ✅ Define the type for cart items
// interface CartItem {
//   id: string | number;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }

// // ✅ Define the Cart State type
// interface CartState {
//   items: CartItem[];
//   totalQuantity: number;
//   loading: boolean;
//   error: string | null;
// }

// // ✅ Initial state
// const initialState: CartState = {
//   items: [],
//   totalQuantity: 0,
//   loading: false,
//   error: null,
// };

// export const fetchCart = createAsyncThunk(
//   "cart/fetchCart",
//   async (userId: string, thunkAPI) => {
//     const res = await getCartDetailsAPI(userId);
//     return res.data; // Should return { items: CartItem[], totalQuantity: number }
//   }
// );

// export const addToCart = createAsyncThunk(
//   "cart/addItemToCart",
//   async (
//     {
//       productId,
//       productVariationId,
//       quantity,
//       userId,
//     }: {
//       productId: string;
//       productVariationId: string;
//       quantity: number;
//       userId: string;
//     },
//     thunkAPI
//   ) => {
//     const res = await addToCartAPI({ productId, productVariationId, quantity, userId });
//     return res.data; // Should return the added CartItem
//   }
// );

// export const removeFromCart = createAsyncThunk(
//   "cart/removeItemFromCart",
//   async (
//     {
//       productId,
//       userId,
//     }: {
//       productId: string;
//       userId: string;
//     },
//     thunkAPI
//   ) => {
//     await removeFromCartAPI({ productId, userId });
//     return productId;
//   }
// );

// export const updateQuantity = createAsyncThunk(
//   "cart/updateItemQuantity",
//   async (
//     {
//       productId,
//       productVariationId,
//       quantity,
//       userId,
//     }: {
//       productId: string;
//       productVariationId: string;
//       quantity: number;
//       userId: string;
//     },
//     thunkAPI
//   ) => {
//     await updateCartAPI({ productId, productVariationId, quantity, userId });
//     return { id: productId, quantity };
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     // Optional local actions
//     clearCart(state) {
//       state.items = [];
//       state.totalQuantity = 0;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Fetch Cart
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.items = action.payload.items;
//         state.totalQuantity = action.payload.totalQuantity;
//         state.loading = false;
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch cart";
//       })

//       // Add to Cart
//       .addCase(addToCart.fulfilled, (state, action) => {
//         const existingItem = state.items.find((item) => item.id === action.payload.id);
//         if (existingItem) {
//           existingItem.quantity += action.payload.quantity;
//         } else {
//           state.items.push(action.payload);
//         }
//         state.totalQuantity += action.payload.quantity;
//       })

//       // Remove from Cart
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         const index = state.items.findIndex((item) => item.id === action.payload);
//         if (index !== -1) {
//           state.totalQuantity -= state.items[index].quantity;
//           state.items.splice(index, 1);
//         }
//       })

//       // Update Cart Quantity
//       .addCase(updateQuantity.fulfilled, (state, action) => {
//         const item = state.items.find((item) => item.id === action.payload.id);
//         if (item) {
//           state.totalQuantity += action.payload.quantity - item.quantity;
//           item.quantity = action.payload.quantity;
//         }
//       });
//   },
// });

// export const { clearCart } = cartSlice.actions;

// export default cartSlice.reducer;
