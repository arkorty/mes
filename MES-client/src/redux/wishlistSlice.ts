// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface WishlistItem {
//   id: string;
//   productVariationId: string
//   name: string;
//   price: number;
//   image?: string;
// }

// interface WishlistState {
//   items: WishlistItem[];
// }

// // const initialState: WishlistState = {
// //   items: [],
// // };

// interface WishlistState {
//   items: WishlistItem[];
//   totalQuantity: number; // Added this field to track the total quantity
// }

// const initialState: WishlistState = {
//   items: [],
//   totalQuantity: 0, 
// };

// type RemoveWishlistItemPayload = {
//   id: string;
//   productVariationId: string;
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     // addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
//     //   const exists = state.items.find(item => item.id === action.payload.id);
//     //   if (!exists) state.items.push(action.payload);
//     // },
   
    
//     // removeFromWishlist: (state, action: PayloadAction<string>) => {
//     //   state.items = state.items.filter(item => item.id !== action.payload && item.productVariationId === action.payload.productVariationId);
//     // },

//     // First, define the payload type


//     addToWishlist: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         productVariationId: string;
//         name: string;
//         price: number;
//         image?: string;
//       }>
//     ) => {
//       const existingItem = state.items.find(
//         (item) =>
//           item.id === action.payload.id &&
//           item.productVariationId === action.payload.productVariationId
//       );
    
//       if (existingItem) {
//         existingItem.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//       state.totalQuantity += 1;
//     },

    
//     removeFromWishlist: (state, action: PayloadAction<RemoveWishlistItemPayload>) => {
//       state.items = state.items.filter(
//         item =>
//           item.id !== action.payload.id ||
//           item.productVariationId !== action.payload.productVariationId
//       );
//       state.totalQuantity = state.items.length;
//     },



//     // This will update the wishlist items from the backend and recalculate totalQuantity
//     setWishlistItemsFromBackend: (
//       state,
//       action: PayloadAction<WishlistItem[]>
//     ) => {
//       state.items = action.payload;
//       state.totalQuantity = action.payload.length; 
//     }
//   },
// });

// export const { addToWishlist, removeFromWishlist, setWishlistItemsFromBackend } = wishlistSlice.actions;
// export default wishlistSlice.reducer;



// // // redux/wishlistSlice.ts
// // import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// // interface WishlistItem {
// //   id: string;
// //   productVariationId: string;
// //   name: string;
// //   price: number;
// //   image?: string;
// // }

// // interface WishlistState {
// //   items: WishlistItem[];
// //   totalQuantity: number; // Added this field to track the total quantity
// // }

// // const initialState: WishlistState = {
// //   items: [],
// //   totalQuantity: 0, // Initialize totalQuantity
// // };

// // const wishlistSlice = createSlice({
// //   name: "wishlist",
// //   initialState,
// //   reducers: {
// //     // addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
// //     //   const exists = state.items.find(item => item.id === action.payload.id &&
// //     //     item.productVariationId === action.payload.productVariationId);
// //     //   if (!exists) state.items.push(action.payload);
// //     // },

// //     addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
// //       const exists = state.items.find(
// //         item =>
// //           item.id === action.payload.id &&
// //           item.productVariationId === action.payload.productVariationId
// //       );
// //       if (!exists) {
// //         state.items.push(action.payload);
// //       }
// //     },
    

// //     removeFromWishlist: (state, action: PayloadAction<{ id: string, productVariationId: string }>) => {
// //       state.items = state.items.filter(item =>
// //         item.id !== action.payload.id &&
// //         item.productVariationId === action.payload.productVariationId
// //       )
// //     },

// //     // This will update the wishlist items from the backend and recalculate totalQuantity
// //     setWishlistItemsFromBackend: (
// //       state,
// //       action: PayloadAction<WishlistItem[]>
// //     ) => {
// //       state.items = action.payload;
// //       state.totalQuantity = action.payload.length; 
// //     }
// //   },
// // });

// // export const { addToWishlist, removeFromWishlist, setWishlistItemsFromBackend } = wishlistSlice.actions;
// // export default wishlistSlice.reducer;



























//previous correct

// redux/wishlistSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface WishlistItem {
//   id: string | number;
//   name: string;
//   price: number;
//   image?: string;
// }

// interface WishlistState {
//   items: WishlistItem[];
// }

// const initialState: WishlistState = {
//   items: [],
// };

// const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
//       const exists = state.items.find(item => item.id === action.payload.id);
//       if (!exists) state.items.push(action.payload);
//     },
//     removeFromWishlist: (state, action: PayloadAction<string | number>) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//   },
// });

// export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
// export default wishlistSlice.reducer;




import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define the type for cart items
interface WishlistItem {
  id: string ;
  name: string;
  price: number;
  productVariationId: string;
  quantity: number;
  image?: string; // Add this line to include an optional image
}

// ✅ Define the Cart State type
interface WishlistState {
  items: WishlistItem[];
  totalQuantity: number;
}

const initialState: WishlistState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    
    addToWishlist: (
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

    removeFromWishlist: (
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
    
    
    // updateQuantity: (
    //   state,
    //   action: PayloadAction<{
    //     id: string;
    //     quantity: number;
    //     productVariationId: string;
    //     userId: string;
    //   }>
    // ) => {
    //   const item = state.items.find(
    //     (item) =>
    //       item.id === action.payload.id &&
    //       item.productVariationId === action.payload.productVariationId
    //   );
    
    //   if (item && action.payload.quantity >= 1) {
    //     state.totalQuantity += action.payload.quantity - item.quantity;
    //     item.quantity = action.payload.quantity;
    //   }
    // },


    setWishlistItemsFromBackend: (
      state,
      action: PayloadAction<WishlistItem[]>
    ) => {
      state.items = action.payload;
      state.totalQuantity = action.payload.reduce((acc, item) => acc + item.quantity, 0);
    }
    
  },
});

// ✅ Export the actions
export const { addToWishlist, removeFromWishlist,  setWishlistItemsFromBackend } = cartSlice.actions;

// ✅ Export the reducer
export default cartSlice.reducer;






