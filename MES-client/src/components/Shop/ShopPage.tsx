/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCartItemsFromBackend } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { Heart, Plus, Minus } from "lucide-react";
import axios from "axios";
import fallbackImage from "/src/assets/Shop/product.png";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { counterInfoAtom } from "@/atoms/counterAtom";
import { userAtom } from "@/atoms/userAtom";
import useLocalStorage from "@/hooks/useLocalStorage";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  shortDescription: string;
  baseVariationId: string;
  category: string;
  rating: number;
}

interface UserPreference {
  selectedGender?: string;
  selectedCategory?: string;
  selectedSize?: string;
  selectedGearType?: string;
}

const ShopPage = () => {
  // use to sync with wishlist, cart in nav bar
  const [counter, setCounterInfo] = useAtom(counterInfoAtom);

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Replace localStorage direct access with custom hook
  const [userPreference, setUserPreference] = useLocalStorage<UserPreference>(
    "userPreference",
    {}
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    userPreference.selectedCategory || ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    userPreference.selectedSize || ""
  );
  const [selectedGender, setSelectedGender] = useState<string>(
    userPreference.selectedGender || ""
  );
  const [selectedGearType, setSelectedGearType] = useState<string>(
    userPreference.selectedGearType || ""
  );

  const [priceRange, setPriceRange] = useState<[number, number]>([299, 11999]);
  const [showModal, setShowModal] = useState<boolean>(
    !userPreference.selectedGender
  );
  const [showAuthModal, setShowAuthModal] = useState<boolean>(true);

  useScrollToTop();

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/product`)
      .then((res) => {
        if (res.data.success) {
          dispatch(setCartItemsFromBackend(res.data.data));
          setProducts(res.data.data);
          setFilteredProducts(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleAddToCart = async (
    productId: string,
    productVariationId: string,
    name: string,
    price: number,
    image: string | undefined,
    quantity: number,
    userId: string
  ) => {
    if (!userId) {
      toast.error("You must be logged in to add to the cart!");
      setShowAuthModal(true);
      return;
    }

    try {
      // Optimistic update - update local state immediately
      setCartQuantities((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));

      // Update counter
      setCounterInfo((prev: number) => ({ ...prev, count: prev.count + 1 }));

      // Then make the API call
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add/${userId}`,
        {
          productId,
          productVariationId,
          quantity,
        }
      );

      toast.success("Added to cart successfully");
    } catch (error) {
      // Roll back the optimistic update if the API call fails
      setCartQuantities((prev) => ({
        ...prev,
        [productId]: Math.max((prev[productId] || 0) - 1, 0),
      }));
      setCounterInfo((prev: any) => ({
        ...prev,
        count: Math.max(prev.count - 1, 0),
      }));

      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    }
  };

  const handleAddToWishlist = async (
    productId: string,
    baseVariationId: string,
    name: string,
    price: number,
    image: string | undefined,
    quantity: number,
    userId: string
  ) => {
    if (!userId) {
      toast.error("You must be logged in to add to the wishlist!");
      setShowAuthModal(true);
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/wishlist/add/`,
          {
            productId,
            productVariationId: baseVariationId,
            userId,
          }
        );

        if (res.data.success) {
          // @ts-expect-error
          setCounterInfo((prev) => ({ ...prev, count: prev.count + 1 }));
          toast.success("Added to wishlist successfully");
        }
      } catch (error) {
        console.error("Failed to add to wishlist:", error);
        toast.error("Failed to add to wishlist");
      }
    }
  };

  const [userData] = useAtom(userAtom);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin < priceRange[1]) {
      setPriceRange([newMin, priceRange[1]]);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax > priceRange[0]) {
      setPriceRange([priceRange[0], newMax]);
    }
  };

  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  useEffect(() => {
    if (!userData?._id) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${userData._id}`)
      .then((res) => {
        if (res.data.success) {
          setWishlistItems(res.data.data);
        }
      })
      .catch((err) => {
        setWishlistItems([]);
        console.error("Error fetching wishlist:", err);
      });
  }, [userData?._id, counter]);

  const isInWishlist = (id: string, productVariationId: string): boolean => {
    return wishlistItems.some(
      (item) =>
        item.id === id ||
        item.productVariationId === productVariationId ||
        item._id == id
    );
  };

  const handleModalClose = (gender: string) => {
    setSelectedGender(gender);
    setUserPreference({
      ...userPreference,
      selectedGender: gender,
    });
    setShowModal(false);
  };

  // Helper to update all filter preferences
  const updateUserPreferences = (prefs: {
    selectedGender?: string;
    selectedCategory?: string;
    selectedSize?: string;
    selectedGearType?: string;
  }) => {
    setUserPreference({
      ...userPreference,
      ...prefs,
    });
  };

  // Gender filter change handler
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
    updateUserPreferences({
      ...userPreference,
      selectedGender: gender,
    });
  };

  // Category filter change handler (multi-select, comma separated)
  const handleCategoryChange = (category: string) => {
    let updated = selectedCategory
      ? selectedCategory.split(",").filter(Boolean)
      : [];
    if (updated.includes(category)) {
      updated = updated.filter((c) => c !== category);
    } else {
      updated.push(category);
    }
    const newValue = updated.join(",");
    setSelectedCategory(newValue);
    updateUserPreferences({
      ...userPreference,
      selectedCategory: newValue,
    });
  };

  // Size filter change handler (multi-select, comma separated)
  const handleSizeChange = (size: string) => {
    let updated = selectedSize ? selectedSize.split(",").filter(Boolean) : [];
    if (updated.includes(size)) {
      updated = updated.filter((s) => s !== size);
    } else {
      updated.push(size);
    }
    const newValue = updated.join(",");
    setSelectedSize(newValue);
    updateUserPreferences({
      ...userPreference,
      selectedSize: newValue,
    });
  };

  // Gear type filter change handler (multi-select, comma separated)
  const handleGearTypeChange = (gearType: string) => {
    let updated = selectedGearType
      ? selectedGearType.split(",").filter(Boolean)
      : [];
    if (updated.includes(gearType)) {
      updated = updated.filter((g) => g !== gearType);
    } else {
      updated.push(gearType);
    }
    const newValue = updated.join(",");
    setSelectedGearType(newValue);
    updateUserPreferences({
      ...userPreference,
      selectedGearType: newValue,
    });
  };

  // Fetch cart quantities for all products for the logged-in user
  useEffect(() => {
    const fetchCartQuantities = async () => {
      if (!userData?._id || products.length === 0) {
        setCartQuantities({});
        return;
      }
      const quantities: { [productId: string]: number } = {};
      await Promise.all(
        products.map(async (product) => {
          try {
            const res = await axios.get(
              `${import.meta.env.VITE_API_BASE_URL}/api/product/quantity/${
                userData._id
              }/${product._id}`
            );
            if (res.data && typeof res.data.quantity === "number") {
              quantities[product._id] = res.data.quantity;
            }
          } catch {
            quantities[product._id] = 0;
          }
        })
      );
      setCartQuantities(quantities);
    };

    fetchCartQuantities();
  }, [userData?._id, products]);

  // Handler to increment cart quantity
  const handleIncrement = async (product: Product) => {
    if (!userData?._id) {
      toast.error("You must be logged in to add to the cart!");
      setShowAuthModal(true);
      return;
    }
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add/${userData._id}`,
        {
          productId: product._id,
          productVariationId: product.baseVariationId,
          quantity: 1,
        }
      );
      setCartQuantities((prev) => ({
        ...prev,
        [product._id]: (prev[product._id] || 0) + 1,
      }));
      setCounterInfo((prev: any) => ({ ...prev, count: prev.count + 1 }));
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  // Handler to decrement cart quantity
  const handleDecrement = async (product: Product) => {
    if (!userData?._id) {
      toast.error("You must be logged in to remove from the cart!");
      setShowAuthModal(true);
      return;
    }

    try {
      const currentQuantity = cartQuantities[product._id] || 0;

      if (currentQuantity <= 1) {
        // If quantity is 1 or less, remove the item completely
        await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/cart/remove/${
            product._id
          }/${userData._id}`
        );

        setCartQuantities((prev) => {
          const newQuantities = { ...prev };
          delete newQuantities[product._id]; // Remove the item from local state
          return newQuantities;
        });

        toast.success("Item removed from cart");
      } else {
        // Decrement quantity normally
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/cart/update/${
            userData._id
          }`,
          {
            productId: product._id,
            productVariationId: product.baseVariationId,
            quantity: currentQuantity - 1,
          }
        );

        setCartQuantities((prev) => ({
          ...prev,
          [product._id]: currentQuantity - 1,
        }));

        toast.success("Removed from cart");
      }

      // Update cart counter
      setCounterInfo((prev: any) => ({ ...prev, count: prev.count - 1 }));
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update cart");
    }
  };

  // Modal Component
  const Modal = () => (
    <div className="fixed inset-0 bg-gray-600 bg - opacity-96 flex justify-center items-center z-90">
      <div className="bg-white p-8 rounded-lg w-[90%] lg:w-[60%] text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          What are you shopping for?
        </h2>
        <button
          className="w-full py-2 bg-green-600 text-white rounded mb-2"
          onClick={(e) => handleModalClose(e.currentTarget.value)}
          value="women"
        >
          Women's Gear
        </button>
        <button
          className="w-full py-2 bg-emerald-600 text-white rounded"
          onClick={(e) => handleModalClose(e.currentTarget.value)}
          value="men"
        >
          Men's Gear
        </button>
        <button
          className="w-full py-2 bg-gray-600 text-white rounded mt-2"
          onClick={(e) => handleModalClose(e.currentTarget.value)}
          value="all"
        >
          All
        </button>
      </div>
    </div>
  );

  const [cartQuantities, setCartQuantities] = useState<{
    [productId: string]: number;
  }>({});

  // On mount and when modal closes, sync sidebar filter UI with userPreference from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const pref = localStorage.getItem("userPreference");
      if (pref) {
        try {
          const userPreference = JSON.parse(pref);
          if (userPreference.selectedGender)
            setSelectedGender(userPreference.selectedGender);
          if (userPreference.selectedCategory)
            setSelectedCategory(userPreference.selectedCategory);
          if (userPreference.selectedSize)
            setSelectedSize(userPreference.selectedSize);
          if (userPreference.selectedGearType)
            setSelectedGearType(userPreference.selectedGearType);
        } catch {
          // ignore parse error
        }
      }
    }
  }, [showModal]);

  return (
    <div className="w-[96%] md:w-[90%] mx-auto py-6 flex gap-8">
      {showModal && <Modal />}

      {/* Filter Section */}
      <div className="w-[25%] hidden md:block border-r p-6 bg-gray-50 z-10 ">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-2">Price</h3>
          <div className="relative w-full flex items-center">
            {/* Slider Background */}
            <div className="absolute left-0 top-1/2 w-full h-[4px] bg-gray-300 rounded-full"></div>

            {/* Selected Range Highlight */}
            <div
              className="absolute top-1/2 h-[4px] bg-green-900 rounded-full"
              style={{
                left: `${((priceRange[0] - 299) / (11999 - 299)) * 100}%`,
                width: `${
                  ((priceRange[1] - priceRange[0]) / (11999 - 299)) * 100
                }%`,
              }}
            ></div>

            {/* Min Range Slider */}
            <input
              type="range"
              min="299"
              max="11998"
              value={priceRange[0]}
              onChange={handleMinChange}
              className="absolute w-full appearance-none bg-transparent pointer-events-auto"
              style={{
                zIndex: 2,
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />

            {/* Max Range Slider */}
            <input
              type="range"
              min="299"
              max="11999"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className="absolute w-full appearance-none bg-transparent pointer-events-auto"
              style={{
                zIndex: 2,
                WebkitAppearance: "none",
                appearance: "none",
              }}
            />
          </div>

          {/* Price Display */}
          <div className="flex justify-between mt-2">
            <span className="px-3 py-1 bg-gray-100 rounded">
              {priceRange[0]}
            </span>
            <span>To</span>
            <span className="px-3 py-1 bg-gray-100 rounded">
              {priceRange[1]}
            </span>
          </div>

          {/* Style the pointers (thumbs) */}
          <style>
            {`
              input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 16px;
                height: 16px;
                background-color: #4ade80; /* green-400 */
                border-radius: 50%;
                cursor: pointer;
              }

              input[type="range"]::-moz-range-thumb {
                width: 16px;
                height: 16px;
                background-color: #4ade80; /* green-400 */
                border-radius: 50%;
                cursor: pointer;
              }
            `}
          </style>
        </div>

        {/* Gender */}
        <div className=" py-2">
          <h3 className="font-medium mb-2">Gender</h3>
          <div className=" flex flex-col gap-1">
            <label>
              <input
                type="radio"
                name="gender"
                value="women"
                checked={selectedGender === "women"}
                onChange={() => handleGenderChange("women")}
                className="accent-green-900"
              />{" "}
              Women
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="men"
                checked={selectedGender === "men"}
                onChange={() => handleGenderChange("men")}
                className="accent-green-900"
              />{" "}
              Men
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="all"
                checked={selectedGender === "all"}
                onChange={() => handleGenderChange("all")}
                className="accent-green-900"
              />{" "}
              All
            </label>
          </div>
        </div>

        {/* Category */}
        <div className=" py-2">
          <h3 className="font-medium mb-2">Category</h3>
          <input
            type="text"
            placeholder="Search"
            className="w-full p-1 border rounded-3xl px-4 mb-2 bg-white"
          />
          <div className="  flex flex-col gap-1">
            <label>
              <input
                type="checkbox"
                checked={selectedCategory.split(",").includes("Fleece")}
                onChange={() => handleCategoryChange("Fleece")}
                className="accent-green-900"
              />{" "}
              Fleece
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedCategory.split(",").includes("Sweatshirt")}
                onChange={() => handleCategoryChange("Sweatshirt")}
                className="accent-green-900"
              />{" "}
              Sweatshirt
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedCategory.split(",").includes("Pullover")}
                onChange={() => handleCategoryChange("Pullover")}
                className="accent-green-900"
              />{" "}
              Pullover
            </label>
          </div>
        </div>

        {/* Size */}
        <div className=" py-2">
          <h3 className="font-medium mb-2">Size</h3>
          <input
            type="text"
            placeholder="Search"
            className="w-full p-1 border rounded-3xl px-4 mb-2 bg-white"
          />
          <div className="  flex flex-col gap-1">
            <label>
              <input
                type="checkbox"
                checked={selectedSize.split(",").includes("XL")}
                onChange={() => handleSizeChange("XL")}
                className="accent-green-900"
              />{" "}
              xl
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSize.split(",").includes("XXL")}
                onChange={() => handleSizeChange("XXL")}
                className="accent-green-900"
              />{" "}
              xxl
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedSize.split(",").includes("Large")}
                onChange={() => handleSizeChange("Large")}
                className="accent-green-900"
              />{" "}
              large
            </label>
          </div>
        </div>

        {/* Gear Type */}
        <div>
          <h3 className="font-medium mb-2">Gear Type</h3>
          <input
            type="text"
            placeholder="Search"
            className="w-full p-1 border rounded-3xl px-4 mb-2 bg-white"
          />
          <div className="  flex flex-col gap-1">
            <label>
              <input
                type="checkbox"
                checked={selectedGearType.split(",").includes("XL")}
                onChange={() => handleGearTypeChange("XL")}
                className="accent-green-900"
              />{" "}
              xl
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedGearType.split(",").includes("XXL")}
                onChange={() => handleGearTypeChange("XXL")}
                className="accent-green-900"
              />{" "}
              xxl
            </label>
            <label>
              <input
                type="checkbox"
                checked={selectedGearType.split(",").includes("Large")}
                onChange={() => handleGearTypeChange("Large")}
                className="accent-green-900"
              />{" "}
              Large
            </label>
          </div>
        </div>
      </div>

      {/* Product Listing Section */}

      <div className="w-full md:w-[80%]">
        <h1 className="text-2xl font-bold mb-4">Men's Gears</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border-1 border-[#E9E9E9] rounded-lg shadow-lg pb-2 "
            >
              <Link
                className=" flex-col flex items-center text-balance"
                to={`/product/${product._id}`}
              >
                <img
                  src={product.image || fallbackImage}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg px-2 font-semibold mt-2">
                  {product.name}
                </h2>
                {/* <p className="text-gray-800 px-2">{product.shortDescription}</p> */}
                <p className="text-gray-600 px-2">${product.price}</p>
              </Link>

              <div className="w-[86%] mx-auto flex justify-between">
                {cartQuantities[product._id] > 0 ? (
                  <div className="flex items-center gap-2 w-[70%] mt-3">
                    <button
                      className="bg-gray-200 rounded-full p-2"
                      onClick={() => handleDecrement(product)}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 bg-green-100 text-green-900 rounded font-semibold">
                      {cartQuantities[product._id]}
                    </span>
                    <button
                      className="bg-gray-200 rounded-full p-2"
                      onClick={() => handleIncrement(product)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-[70%] bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700"
                    onClick={() =>
                      handleAddToCart(
                        product._id,
                        product.baseVariationId,
                        product.name,
                        product.price,
                        product.image,
                        1,
                        userData._id
                      )
                    }
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  className="cursor-pointer mt-3"
                  onClick={() =>
                    handleAddToWishlist(
                      product._id,
                      product.baseVariationId,
                      product.name,
                      product.price,
                      product.image,
                      1,
                      userData._id
                    )
                  }
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isInWishlist(product._id, product.baseVariationId)
                        ? "text-pink-500 fill-pink-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
