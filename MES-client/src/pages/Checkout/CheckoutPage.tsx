import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { loadStripe } from "@stripe/stripe-js";
//import axios from "axios";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!);

const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod">("stripe");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

//   const handleCheckout = async () => {
//     if (paymentMethod === "stripe") {
//       const stripe = await stripePromise;
//       const res = await axios.post("/api/checkout", { cart });
//       const session = res.data;

//       await stripe?.redirectToCheckout({ sessionId: session.id });
//     } else if (paymentMethod === "cod") {
//       alert("Order placed successfully with Cash on Delivery!");
//       // Optionally redirect or clear cart
//     }
//   };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 py-12">
      <h2 className="text-2xl lg:text-4xl font-bold mb-10 text-center text-green-800">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Cart Summary */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <div className="w-16 h-16 mr-4">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
              </div>

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p className="font-medium">₹{item.quantity * item.price}</p>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between font-semibold">
            <p>Total:</p>
            <p>₹{totalPrice}</p>
          </div>
        </div>

        {/* Payment Options */}
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-blue-600">Payment Method</h3>

          <label className="flex items-center mb-3">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
              className="mr-2 accent-green-900"
            />
            Pay with Card (Stripe)
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="mr-2 accent-green-900"
            />
            Cash on Delivery
          </label>

          <button
            
            className="mt-6 w-full bg-green-900 text-white py-2 rounded hover:bg-green-800 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
