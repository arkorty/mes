import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./components/custom/Layout";
import Loading from "./components/custom/Loading";
import Cart from "./pages/Cart/Cart";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import { Toaster } from 'react-hot-toast';
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import EventsPage from "./pages/Events/EventsPage";

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
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
