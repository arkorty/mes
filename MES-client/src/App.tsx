import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./components/custom/Layout";
import Loading from "./components/custom/Loading";
import Cart from "./pages/Cart/Cart";

import WishlistPage from "./pages/Wishlist/WishlistPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import { Toaster } from 'react-hot-toast';

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./components/Shop/ProductDetails"));
const ShopPage = lazy(() => import("./components/Shop/ShopPage"));
const SwapAuth = lazy(() => import("./components/Auth/SwapAuth"));


function App() {
  return (
    
    <Router>
      <Suspense fallback={<Loading />}>
      <Toaster />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/auth" element={<SwapAuth />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
    
  );
}

export default App;
