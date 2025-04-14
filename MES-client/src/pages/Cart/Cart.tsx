// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
// import { useNavigate } from "react-router-dom";

// const CartPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const cart = useSelector((state: RootState) => state.cart.items);

//   const handleQuantityChange = (id: string | number, quantity: number) => {
//     if (quantity >= 1) {
//       dispatch(updateQuantity({ id, quantity }));
//     }
//   };

//   const handleRemove = (id: string | number) => {
//     dispatch(removeFromCart(id));
//   };

//   const getTotalPrice = () => {
//     return cart.reduce(
//       (total, product) => total + product.price * product.quantity,
//       0
//     );
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">My Cart</h2>
//       {cart.length > 0 ? (
//         <>
//           <div className="grid gap-4">
//             {cart.map((product) => (
//               <div
//                 key={product.id}
//                 className="flex justify-between items-center p-4 border rounded-lg shadow-md"
//               >
//                 <div className="flex gap-4 items-center">
//                   {product.image && (
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   )}
//                   <div>
//                     <p className="text-lg font-semibold">{product.name}</p>
//                     <p className="text-gray-600">
//                       ₹{product.price} x {product.quantity} ={" "}
//                       <span className="font-bold">
//                         ₹{product.price * product.quantity}
//                       </span>
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() =>
//                       handleQuantityChange(product.id, product.quantity - 1)
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     -
//                   </button>
//                   <span className="text-lg font-semibold">
//                     {product.quantity}
//                   </span>
//                   <button
//                     onClick={() =>
//                       handleQuantityChange(product.id, product.quantity + 1)
//                     }
//                     className="px-2 py-1 bg-gray-200 rounded"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => handleRemove(product.id)}
//                   className="text-red-500 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Checkout Section */}
//           <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
//             <div className="text-xl font-bold">
//               Total: ₹{getTotalPrice().toFixed(2)}
//             </div>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition duration-200 cursor-pointer"
//             >
//               Go to Checkout
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-600 text-center">Your cart is empty.</p>
//       )}
//     </div>
//   );
// };

// export default CartPage;








import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (id: string | number, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id: string | number) => {
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">My Cart</h2>

      {cart.length > 0 ? (
        <>
          <div className="grid gap-6">
            {cart.map((product) => (
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
                      handleQuantityChange(product.id, product.quantity - 1)
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
                      handleQuantityChange(product.id, product.quantity + 1)
                    }
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(product.id)}
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










