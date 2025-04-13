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







// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   getCartDetails as apiGetCartDetails,
//   addToCart as apiAddToCart,
//   removeFromCart as apiRemoveFromCart,
//   updateCart as apiUpdateCart,
// } from "../api/index";

// // ✅ Cart Item type
// interface CartItem {
//   id: string | number;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
//   productVariationId: string;
// }

// // ✅ Cart State
// interface CartState {
//   items: CartItem[];
//   totalQuantity: number;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   items: [],
//   totalQuantity: 0,
//   loading: false,
//   error: null,
// };

// // ✅ Fetch Cart
// export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId: string, thunkAPI) => {
//   const res = await apiGetCartDetails(userId);
//   if (res.error) {
//     // If there's an error, return the error message
//     const errorMessage = res.error?.message || "Something went wrong";
//     return thunkAPI.rejectWithValue(errorMessage);
//   }

//   // If no error, return the data (successful response)
//   return res.data;
// });

// // ✅ Add to Cart
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async (
//     {
//       userId,
//       productId,
//       productVariationId,
//       quantity,
//     }: {
//       userId: string;
//       productId: string;
//       productVariationId: string;
//       quantity: number;
//     },
//     thunkAPI
//   ) => {
//     const res = await apiAddToCart({ userId, productId, productVariationId, quantity });

//     // Check for an error
//     if (res.error) {
//       // If there's an error, return the error message
//       const errorMessage = res.error?.message || "Something went wrong";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }

//     // If no error, return the data (successful response)
//     return res.data;
//   }
// );

// // ✅ Remove from Cart
// export const removeFromCart = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({ userId, productId }: { userId: string; productId: string }, thunkAPI) => {
//     const res = await apiRemoveFromCart({ userId, productId });
//     if (res.error) {
//       // If there's an error, return the error message
//       const errorMessage = res.error?.message || "Something went wrong";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }

//     // If no error, return the data (successful response)
//     return res.data;
//   }
// );

// // ✅ Update Cart
// export const updateCart = createAsyncThunk(
//   "cart/updateCart",
//   async (
//     {
//       userId,
//       productId,
//       productVariationId,
//       quantity,
//     }: {
//       userId: string;
//       productId: string;
//       productVariationId: string;
//       quantity: number;
//     },
//     thunkAPI
//   ) => {
//     const res = await apiUpdateCart({ userId, productId, productVariationId, quantity });
//     if (res.error) {
//       // If there's an error, return the error message
//       const errorMessage = res.error?.message || "Something went wrong";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }

//     // If no error, return the data (successful response)
//     return res.data;
//   }
// );

// // 🧠 Helper to calculate totalQuantity
// const calculateTotalQuantity = (items: CartItem[]) =>
//   items.reduce((total, item) => total + item.quantity, 0);

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ✅ Fetch
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//         state.totalQuantity = calculateTotalQuantity(state.items);
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })

//       // ✅ Add
//       .addCase(addToCart.fulfilled, (state, action) => {
//         const newItem = action.payload;
//         const existing = state.items.find(
//           (i) => i.id === newItem.id && i.productVariationId === newItem.productVariationId
//         );

//         if (existing) {
//           existing.quantity += newItem.quantity;
//         } else {
//           state.items.push(newItem);
//         }

//         state.totalQuantity = calculateTotalQuantity(state.items);
//       })

//       // ✅ Remove
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         const productId = action.payload;
//         state.items = state.items.filter((item) => item.id !== productId);
//         state.totalQuantity = calculateTotalQuantity(state.items);
//       })

//       // ✅ Update
//       .addCase(updateCart.fulfilled, (state, action) => {
//         const updated = action.payload;
//         const item = state.items.find(
//           (i) => i.id === updated.id && i.productVariationId === updated.productVariationId
//         );
//         if (item) item.quantity = updated.quantity;

//         state.totalQuantity = calculateTotalQuantity(state.items);
//       });
//   },
// });

// export default cartSlice.reducer;
