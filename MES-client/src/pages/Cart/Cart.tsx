import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, setCartItemsFromBackend, updateQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import axios from "axios";
import { useScrollToTop } from "@/hooks/useScrollToTop";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);

  const [user] = useAtom(userAtom);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  //const[cartItems, setCartItems] = useState<any[]>([]);

  //const userId: string | null = user?._id ?? ""
  //const userId  = user?._id ?? ""; 
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`)
      .then(res => {
        if (res.data.success) {
          dispatch(setCartItemsFromBackend(res.data.data)); 
        }
      })
      .catch(err => console.error(err));
  }, [userId, dispatch]);
  
  

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`)
  //     .then(res => {
  //       if (res.data.success) {
  //         setCartItems(res.data.data);
          
  //         console.log(res.data.data);
  //       }
  //     })
  //     .catch(err => console.error(err));
  // }, [userId]);

  useScrollToTop();


  const handleQuantityChange = (
    productId: string ,
    productVariationId: string,
    quantity: number,
    userId: string
  ) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id: productId, productVariationId, quantity, userId }));
  
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update/${userId}`, {
          productId,
          productVariationId,
          quantity
        })
        // .then(() => {
        //   // Update cartItems manually so the UI reflects changes without reload
        //   setCartItems(prev =>
        //     prev.map(item =>
        //       item.id === productId && item.productVariationId === productVariationId
        //         ? { ...item, quantity }
        //         : item
        //     )
        //   );
        // })
        .catch(err => console.error(err));
    }
  };

  

  // const handleQuantityChange = (productId: string | number, productVariationId: string, quantity: number, userId:string) => {
  //   if (quantity >= 1) {
  //     dispatch(updateQuantity({ id:productId,productVariationId , quantity, userId, }));
  //     axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart/update/${userId}`, {
  //       productId,
  //       productVariationId,
  //       quantity
       
  //     })
  //     // (cartItems.id , cartItems.productVariationId , cartItems.quantity)
  //   }
  // };






  const handleRemove = (productId: string, productVariationId: string ) => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/remove/${productId}/${userId}`)
    dispatch(removeFromCart({id: productId,productVariationId}));
    
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
                key={product.id}
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










