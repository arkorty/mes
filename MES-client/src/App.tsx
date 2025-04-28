// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Layout from "./components/custom/Layout";
// import Home from "./pages/Home";
// import ProductDetails from "./components/Shop/ProductDetails";
// import ShopPage from "./components/Shop/ShopPage";
// import SwapAuth from "./components/Auth/SwapAuth";


// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           {/* <Route path="/signin" element={<Login />} />
//           <Route path="/signup" element={<Signup />} /> */}
//           <Route path="/auth" element={<SwapAuth />} />
//           <Route path="shop" element={<ShopPage />} /> 
//           <Route path="/product/:id" element={<ProductDetails />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;








import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./components/custom/Layout";
import Loading from "./components/custom/Loading";
import Cart from "./pages/Cart/Cart";

//import { ShopProvider } from "./context/ShopContext";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./components/Shop/ProductDetails"));
const ShopPage = lazy(() => import("./components/Shop/ShopPage"));
const SwapAuth = lazy(() => import("./components/Auth/SwapAuth"));


function App() {
  return (
    
    <Router>
      <Suspense fallback={<Loading />}>
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
