













import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import { Heart } from "lucide-react";
import axios from "axios";
import fallbackImage from '/src/assets/Shop/product.png';
import { addToCart as addToCartAPI } from "../../api/index"

// Define Product Type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  shortDescription: string;
  category: string;
  rating: number;
}

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedGearType, setSelectedGearType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([299, 11999]);

  // useEffect(() => {
  //   setProducts(productsData);
  //   setFilteredProducts(productsData);
  // }, []);



  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/product`)
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.data);
          setFilteredProducts(res.data.data);
          console.log(res.data.data);
        }
      })
      .catch(err => console.error(err));
  }, []);




  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setFilteredProducts(
      category === "" ? products : products.filter((product) => product.category === category)
    );
  };

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

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

const isInWishlist = (id: string | number) =>
  wishlistItems.some((item) => item.id === id);


  const dispatch = useDispatch();

  return (
    <div className="w-[96%] md:w-[90%] mx-auto py-6 flex gap-8">
           
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
            <span className="px-3 py-1 bg-gray-100 rounded">{priceRange[0]}</span>
            <span>To</span>
            <span className="px-3 py-1 bg-gray-100 rounded">{priceRange[1]}</span>
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
          <label><input type="radio" name="gender" value="Women" onChange={() => setSelectedGender("Women")} className="accent-green-900"/> Women</label>
          <label><input type="radio" name="gender" value="Men" onChange={() => setSelectedGender("Men")} className="accent-green-900" /> Men</label>
        </div>
        </div>

        {/* Category */}
         <div className=" py-2">
           <h3 className="font-medium mb-2">Category</h3>
           <input type="text" placeholder="Search" className="w-full p-1 border rounded-3xl px-4 mb-2 bg-white" />
           <div className="  flex flex-col gap-1">
           <label><input type="checkbox" onChange={() => setSelectedCategory("Fleece")} className="accent-green-900" /> Fleece</label>
           <label><input type="checkbox" onChange={() => setSelectedCategory("Sweatshirt")} className="accent-green-900" /> Sweatshirt</label>
           <label><input type="checkbox" onChange={() => setSelectedCategory("Pullover")} className="accent-green-900" /> Pullover</label>
         </div>
         </div>

                  {/* Size */}
         <div className=" py-2">
           <h3 className="font-medium mb-2">Size</h3>
           <input type="text" placeholder="Search" className="w-full p-1 border rounded-3xl px-4 mb-2 bg-white" />
           <div className="  flex flex-col gap-1">
           <label><input type="checkbox" onChange={() => setSelectedSize("XL")} className="accent-green-900" /> xl</label>
           <label><input type="checkbox" onChange={() => setSelectedSize("XXL")} className="accent-green-900" /> xxl</label>
           <label><input type="checkbox" onChange={() => setSelectedSize("Large")} className="accent-green-900"/> large</label>
         </div>
         </div>
        
         {/* Gear Type */}
         <div>
           <h3 className="font-medium mb-2">Gear Type</h3>
           <input type="text" placeholder="Search" className="w-full p-1 border rounded-3xl px-4 mb-2 bg-white" />
           <div className="  flex flex-col gap-1">
           <label><input type="checkbox" onChange={() => setSelectedGearType("XL")} className="accent-green-900" /> xl</label>
           <label><input type="checkbox" onChange={() => setSelectedGearType("XXL")} className="accent-green-900" /> xxl</label>
           <label><input type="checkbox" onChange={() => setSelectedGearType("Large")} className="accent-green-900" /> Large</label>
         </div>
         </div>
        


        </div>

      {/* Product Listing Section */}
      
      <div className="w-full md:w-[80%]">
        <h1 className="text-2xl font-bold mb-4">Men's Gears</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border-1 border-[#E9E9E9] rounded-lg shadow-lg pb-2 ">
              <Link className=" flex-col flex items-center text-balance" to={`/product/${product.id}`}>
                <img
                  src={product.image || fallbackImage}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-lg px-2 font-semibold mt-2">{product.name}</h2>
                {/* <p className="text-gray-800 px-2">{product.shortDescription}</p> */}
                <p className="text-gray-600 px-2">${product.price}</p>
              </Link>

              <div className="w-[86%] mx-auto flex justify-between">
                {/* <button
                  className="w-[70%] bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image || fallbackImage,
                      })
                    )
                  }
                  
                > */}

                  <button
                    className="w-[70%] bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700"
                    onClick={async () => {
                      
                      dispatch(
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image || fallbackImage,
                        })
                      );

                      const userId = localStorage.getItem("userId");

                      if (!userId) {
                        console.warn("User ID not found in localStorage.");
                        return;
                      }

                      // Call backend API to sync with server
                      try {
                        await addToCartAPI({
                          productId: product.id,
                          productVariationId: product.id, 
                          quantity: 1,
                          userId: userId, 
                        });
                      } catch (error) {
                        console.error("Failed to add to cart on backend:", error);
                      }
                    }}
                  >
                  Add to Cart
                </button>

                <button
                  className="cursor-pointer mt-3"
                  onClick={() => {
                    if (isInWishlist(product.id)) {
                      dispatch(removeFromWishlist(product.id));
                    } else {
                      dispatch(
                        addToWishlist({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image || fallbackImage,
                        })
                      );
                    }
                  }}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isInWishlist(product.id) ? "text-pink-500 fill-pink-500" : "text-gray-400"
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
