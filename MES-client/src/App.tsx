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
import Shoppage from "./pages/Shop/ShopPage";
import ProductDetails from "./components/Shop/ProductDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shoppage />} /> 
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
