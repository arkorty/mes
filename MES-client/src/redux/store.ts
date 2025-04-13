// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// // ✅ Define RootState type
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;











// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice"; // ✅

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // ✅
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
