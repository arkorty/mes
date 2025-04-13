// ShopContext.tsx
import React, { createContext, useState } from "react";

type ShopContextType = {
  cartItems: { [id: string]: number };
  wishlistItems: string[];
  toggleWishlistItem: (itemId: string) => void;
};

export const ShopContext = createContext<ShopContextType>({
  cartItems: {},
  wishlistItems: [],
  toggleWishlistItem: () => {},
});

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<{ [id: string]: number }>({});
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const toggleWishlistItem = (itemId: string) => {
    setWishlistItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <ShopContext.Provider value={{ cartItems, wishlistItems, toggleWishlistItem }}>
      {children}
    </ShopContext.Provider>
  );
};
