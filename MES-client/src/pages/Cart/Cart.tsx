/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { counterInfoAtom } from "@/atoms/counterAtom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useAtomValue(userAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [l , setCounter] = useAtom(counterInfoAtom); // Use the counterInfoAtom to manage the counter state
  const [cartItems, setCartItems] = React.useState<any[]>([]); // Initialize cartItems state

  const userId = userData?._id || ""; // Get userId from userData or set to empty string if not available


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`)
      .then(res => {
        if (res.data.success) {
          setCartItems(res.data.data);
        }
      })
      .catch(err => {setCartItems([]); console.error(err)});
  }, [userId, dispatch]);
  

  useScrollToTop();


  const handleQuantityChange = (
    productId: string ,
    productVariationId: string,
    quantity: number,
    userId: string
  ) => {
    if (quantity >= 1) {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update/${userId}`, {
          productId,
          productVariationId,
          quantity
        })
        .then(() => {
          setCounter(prev => prev + 1);
          // Update cartItems manually so the UI reflects changes without reload
          setCartItems(prev =>
            prev.map(item =>
              item.id === productId && item.productVariationId === productVariationId
                ? { ...item, quantity }
                : item
            )
          );
        })
        .catch(err => console.error(err));
    }
  };

  const handleRemove = (productId: string, productVariationId: string ) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove/${productId}/${userId}`)
      .then(res => {
        if (res.data.success) {
          setCartItems(prev =>
            prev.filter(
              item =>
                !(item.id === productId && item.productVariationId === productVariationId)
            )
          );
          setCounter(prev => prev + 1);
        }
      })
      .catch(err => console.error(err));

  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="grid gap-6">
            {cartItems.map((product) => (
              <div
                //key={product.id}
                key={`${product.id}-${product.productVariationId}`}
                className="flex flex-col sm:flex-row justify-between items-center p-4 border rounded-xl shadow-sm bg-white"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-contain rounded-lg border"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg text-sm text-gray-500">
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">
                      ₹{product.price} x {product.quantity} ={" "}
                      <span className="font-bold">
                        ₹{product.price * product.quantity}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <button
                    onClick={() =>
                      handleQuantityChange(product.id, product.productVariationId, product.quantity - 1, userId)
                    }
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">
                    {product.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(product.id, product.productVariationId, product.quantity + 1, userId)
                    }
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(product.id, product.productVariationId)}
                    className="text-red-500 hover:underline ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-bold text-gray-800">
              Total: ₹{getTotalPrice().toFixed(2)}
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200"
            >
              Go to Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-gray-600 mt-10 text-lg">
          Your cart is empty.
        </div>
      )}
    </div>
  );
};

export default CartPage;










