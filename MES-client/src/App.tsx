// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
// import Layout from "./components/custom/Layout";
// import Home from "./pages/Home";

// function App() {
//   return <Router>
//     <Routes>
//       <Route path="/" element={<Layout/>}>
//         <Route index element={<Home/>} />
//       </Route>
//     </Routes>
//   </Router>;
// }

// export default App;







import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/custom/Layout";
import Home from "./pages/Home";
import ProductDetails from "./components/Shop/ProductDetails";
// import Login from "./pages/Auth/Login";
// import Signup from "./pages/Auth/Signup";
import ShopPage from "./components/Shop/ShopPage";
import SwapAuth from "./components/Auth/SwapAuth";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          <Route path="/auth" element={<SwapAuth />} />
          <Route path="shop" element={<ShopPage />} /> 
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
