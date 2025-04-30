import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  MapPin,
  User,
  Store,
  Heart,
  ShoppingCart,
  X,
  LogOut,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserDetails, getWishlist } from "../../api";
import axios from "axios";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { counterInfoAtom } from "@/atoms/counterAtom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("Gears & Equipments");
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [user, setUser] = useAtom(userAtom);

  const [pinCode, setPinCode] = useState("Loading...");
  const [showPinModal, setShowPinModal] = useState(false);
  const [manualPin, setManualPin] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        if (!navigator.geolocation) {
          console.warn("Geolocation is not supported");
          return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Use Nominatim reverse geocoding API (free)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const postalCode = data?.address?.postcode;
          if (postalCode) setPinCode(postalCode);
          else setPinCode("Unknown");
        });
      } catch (error) {
        console.error("Error fetching geolocation:", error);
        setPinCode("Unavailable");
      }
    };

    fetchLocation();
  }, []);

  const [menuItems, setMenuItems] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (isMenuOpen) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/category/dropdown`)
        .then((res) => {
          const data = res.data.data;
          setCategories(data);

          const menu: Record<string, string[]> = {};

          const parents = data.filter((cat: any) => cat.parentId === null);

          parents.forEach((parent: any) => {
            const subCats = data
              .filter((cat: any) => cat.parentId === parent._id)
              .map((cat: any) => `${cat.name} →`);

            menu[parent.name] = subCats;
          });

          setMenuItems(menu);

          const firstKey = Object.keys(menu)[0];
          if (firstKey) {
            setActiveTab(firstKey);
          }
        })

        .catch((err) => console.error(err));
    }
  }, [isMenuOpen]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = user?.token;

    const fetchUser = async () => {
      try {
        const { data, error } = await getUserDetails(token);

        if (error || !data) {
          console.error("Failed to fetch user:", error);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchUser();
  }, [setUser, user?.token]);

  const handleSignOut = () => {
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.clear();

    // Show a toast
    toast.success("Logged out successfully!");
    navigate("/auth");
  };

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const userId = user?._id;
  const [counter] = useAtom(counterInfoAtom);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Function to fetch cart data
    const fetchCartData = async () => {
      if (userId) {
        // Only fetch if userId exists
        axios
          .get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`)
          .then((res) => {
            if (res.data.success) {
              setCartCount(res.data.data.length ?? res.data.itemCount ?? 0);
              console.log("cart api ");
              console.log(res.data.data.length);
            }
          })
          .catch((err) => {
            setCartCount(0);
            console.error(err);
          });
      }

      const { data } = await getWishlist(userId);

      if (data) {
        setWishlistCount(data.length ?? 0);
        console.log("wishlist api ");
        console.log(data.length);
      }
    };

    // Initial fetch
    fetchCartData();

    // Set up interval to fetch every 5 seconds (5000 milliseconds)
    const intervalId = setInterval(fetchCartData, 20000);

    // Clean up the interval when component unmounts or dependencies change
    return () => clearInterval(intervalId);
  }, [
    userId,
    isLoggedIn,
    location.pathname,
    location.search,
    location.hash,
    counter,
  ]);

  return (
    <nav className="bg-white text-white">
      {/* Top Navigation */}
      <div className="flex justify-end text-sm space-x-4 pr-4 text-black py-1">
        <a href="#" className="hover:underline">
          Find a Store
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          Help
        </a>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-2 md:px-4 -ml-1  md:-ml-2 py-2 bg-[#164734]">
        {/* Left Section - Logo & Menu */}
        <div className="flex items-center md:space-x-4 w -[96%] lg:w-[34%] xl:w-[23%] ">
          <Link to="/">
            <img
              src="/footerlogo.png"
              alt="Mountain Expedition Supply"
              className=" h-14 lg:h-20 mb-4"
            />
          </Link>

          <div className="flex items-center space-x-2">
            <button
              className="cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 md:h-6 w-5 md:w-6" />
            </button>
            <span className="font-semibold uppercase hidden md:block">
              All Gears
            </span>
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
              <p className="font-semibold text-sm">
                {pinCode}{" "}
                <span
                  className="text-blue-300 cursor-pointer"
                  onClick={() => setShowPinModal(true)}
                >
                  CHANGE
                </span>
              </p>
            </div>
          </div>

          <button
            className="flex items-center space-x-1 cursor-pointer"
            onClick={() => navigate("/shop")}
          >
            <Store className="h-5 w-5" />
            <span className="hidden md:block">My Store</span>
          </button>

          {isLoggedIn && (
            <>
              <button
                className="relative flex items-center space-x-1 cursor-pointer"
                onClick={() => navigate("/wishlist")}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-4 left-3 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {wishlistCount}
                  </span>
                )}
                <span className="hidden md:block">Wishlist</span>
              </button>

              <button
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-[50px] right-[9.3rem] bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
                <span className="hidden md:block">Cart</span>
              </button>
            </>
          )}

          {/* User & Store Icons */}

          {!isLoggedIn ? (
            <button
              className="flex items-center space-x-1 cursor-pointer"
              onClick={() => navigate("/auth")}
            >
              <User className="h-5 w-5" />
              <span className="hidden md:block">Sign In</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3">
              {/* Optional: Show user image if available */}
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-white"
                />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              <button
                onClick={handleSignOut}
                className="hidden md:block text-sm font-medium hover:underline -ml-2"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {showPinModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-xl p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Change Pincode
            </h2>
            <input
              type="text"
              placeholder="Enter new PIN"
              value={manualPin}
              onChange={(e) => setManualPin(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:ring-green-400 text-green-800"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPinModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (manualPin.length === 6) {
                    setPinCode(manualPin);
                    setShowPinModal(false);
                  } else {
                    alert("Please enter a valid 6-digit PIN.");
                  }
                }}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-[94%] md:w-[46%] bg-white text-black shadow-md z-50 p-4">
          {/* Close Button */}
          <span
            className="cursor-pointer relative left-[15rem] lg:left-[34rem] lg:top-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <X className="h-6 w-6 text-green-900" />
          </span>

          {/* Tab Buttons */}
          <div className="flex space-x-6 border-b">
            {Object.keys(menuItems).map((tab) => (
              <button
                key={tab}
                className={`pb-2 font-semibold ${
                  activeTab === tab
                    ? "border-b-2 border-green-900 text-green-900"
                    : "text-gray-600"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Subcategory list */}
          <div className="mt-4 space-y-2">
            {menuItems[activeTab]?.map((item, index) => (
              <p
                key={index}
                className="text-lg cursor-pointer hover:underline flex items-center gap-1"
              >
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
