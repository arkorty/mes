// import  { createContext, useContext, useState, ReactNode } from "react";

// // Type for wishlist item
// interface WishlistItem {
//   id: string;
//   productVariationId: string,
//   name: string;
//   price: number;
//   image: string;
// }

// // Type for context value
// interface WishlistContextType {
//   wishlist: WishlistItem[];
//   addToWishlist: (item: WishlistItem) => void;
//   removeFromWishlist: (id: string) => void;
// }

// // Create context
// const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// // Provider component
// export const WishlistProvider = ({ children }: { children: ReactNode }) => {
//   const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

//   const addToWishlist = (item: WishlistItem) => {
//     const exists = wishlist.find((i) => i.id === item.id);
//     if (!exists) {
//       setWishlist([...wishlist, item]);
//     }
//   };

//   const removeFromWishlist = (id: string | number) => {
//     setWishlist(wishlist.filter((item) => item.id !== id));
//   };

//   return (
//     <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// // Hook to use wishlist
// export const useWishlist = () => {
//   const context = useContext(WishlistContext);
//   if (!context) {
//     throw new Error("useWishlist must be used within a WishlistProvider");
//   }
//   return context;
// };
