import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartWishlistContextType = {
  cartQuantity: number;
  setCartQuantity: React.Dispatch<React.SetStateAction<number>>;
  wishlistCount: number;
  setWishlistCount: React.Dispatch<React.SetStateAction<number>>;
};

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const CartWishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  return (
    <CartWishlistContext.Provider value={{ cartQuantity, setCartQuantity, wishlistCount, setWishlistCount }}>
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
