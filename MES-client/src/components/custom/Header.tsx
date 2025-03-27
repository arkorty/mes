import { useState } from "react";
import {
  Menu, Search, MapPin, User, Store, Heart, ShoppingCart, HelpCircle, X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

// Define types for menu items
type MenuItems = {
  [key: string]: string[];
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Gears & Equipments");

  const menuItems: MenuItems = {
    "Gears & Equipments": ["Winter Sports →", "Camping →", "Hiking →"],
    Apparel: ["Outdoor →", "Ski & Snowboard →", "Hiking →", "Lifestyle →", "Camping →"],
    Shoes: ["Outdoor →", "Ski & Snowboard →", "Hiking →", "Lifestyle →", "Camping →"],
  };

  const navigate = useNavigate();
  const cartQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  return (
    <nav className="bg-white text-white">
      {/* Top Navigation */}
      <div className="flex justify-end text-sm space-x-4 pr-4 text-black py-1">
        <a href="#" className="hover:underline">Find a Store</a>
        <span>|</span>
        <a href="#" className="hover:underline">Help</a>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#164734]">
        {/* Left Section - Logo & Menu */}
        <div className="flex items-center space-x-4">
          {/* <button className="cursor-pointer md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-6 w-6" />
          </button> */}
          <Link to="/">
          <img src="/footerlogo.png" alt="Mountain Expedition Supply" className="h-16 mb-4" />
          </Link>
          
          {/* ✅ Fixed the Nested Button Issue */}
          <div className="flex items-center space-x-2">
            <button className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-semibold uppercase hidden md:block">All Gears</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-lg mx-4 relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 pl-10 pr-4 bg-white text-black rounded-3xl focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
        </div>

        {/* Right Section - Icons & Links */}
        <div className="flex items-center space-x-6 text-sm">
          {/* Delivery Location */}
          <div className="hidden md:flex items-center space-x-1">
            <MapPin className="h-5 w-5" />
            <div>
              <p className="text-xs">Delivery Location</p>
              <p className="font-semibold text-sm">560002 <span className="text-blue-300 cursor-pointer">CHANGE</span></p>
            </div>
          </div>

          {/* User & Store Icons */}
          <button className="flex items-center space-x-1 cursor-pointer" 
           onClick={() => navigate("/auth")}>
            <User className="h-5 w-5" />
            <span className="hidden md:block">Sign In</span>
          </button>

          <button className="flex items-center space-x-1 cursor-pointer"
          onClick={() => navigate("/shop")}>
            <Store className="h-5 w-5" />
            <span className="hidden md:block">My Store</span>
          </button>

          <button className="hidden md:flex items-center space-x-1 cursor-pointer">
            <HelpCircle className="h-5 w-5 " />
            <span>Support</span>
          </button>

          <button className="hidden md:flex items-center space-x-1 cursor-pointer">
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
          </button>

          <button className="flex items-center space-x -1 cursor-pointer">
            {/* <ShoppingCart className="h-5 w-5" /> */}

            <ShoppingCart className="h-5 w-5" />
            {cartQuantity > 0 && (
              <span className="ab solute relative -top-[14px] right-[12px]  bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartQuantity}
              </span>
            )}
            <span className="hidden md:block -ml-4">Cart</span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-[94%] md:w-[46%] bg-white text-black shadow-md z-50 p-4">
          {/* ✅ Fixed Close Button by using a <span> instead of <button> */}
          <span className="cursor-pointer relative left-[15rem] lg:left-[34rem] lg:top-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <X className="h-6 w-6 text-green-900" />
          </span>
          
          <div className="flex space-x-6 border-b">
            {Object.keys(menuItems).map((tab) => (
              <button
                key={tab}
                className={`pb-2 font-semibold ${
                  activeTab === tab ? "border-b-2 border-green-900 text-green-900" : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {menuItems[activeTab].map((item, index) => (
              <p key={index} className="py-1 text-lg cursor-pointer hover:underline">
                {item}
              </p>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
