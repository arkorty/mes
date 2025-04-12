// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface CartState {
//   items: { id: number; name: string; price: number; quantity: number }[];
//   cartCount: number;
// }

// const initialState: CartState = {
//   items: [],
//   cartCount: 0,
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<{ id: number; name: string; price: number }>) => {
//       state.items.push({ ...action.payload, quantity: 1 });
//       state.cartCount++;
//     },
//   },
// });

// export const { addToCart } = cartSlice.actions;
// export default cartSlice.reducer;




import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (id: string | number, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id: string | number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      {cart.length > 0 ? (
        <div className="grid gap-4">
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-md"
            >
              <div className="flex gap-4 items-center ">
                <div className="">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded "
                  />
                )}
                </div>
                <div>
                  <p className="text-lg font-semibold">{product.name}</p>
                  <p className="text-gray-600">${product.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemove(product.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
