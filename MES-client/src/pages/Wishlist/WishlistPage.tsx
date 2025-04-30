import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromWishlist, setWishlistItemsFromBackend } from "../../redux/wishlistSlice";
import { HeartOff } from "lucide-react";
import { addToCart } from "../../redux/cartSlice";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import axios from "axios";
import toast from "react-hot-toast";
import { userAtom } from "@/atoms/userAtom";
import { useAtom } from "jotai";
import { counterInfoAtom } from "@/atoms/counterAtom";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = React.useState<any[]>([]); // Initialize wishlist state
  const [userData] = useAtom(userAtom)
  const userId = userData?._id || ""; 

  const [counter, setCounter] = useAtom(counterInfoAtom)

  useScrollToTop();

  useEffect(() => {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/${userId}`)
        .then(res => {
          if (res.data.success) {
            setWishlist(res.data.data);
            dispatch(setWishlistItemsFromBackend(res.data.data)); // Dispatch action to set wishlist items in Redux store
          }
        })
        .catch(err => console.error(err));
    }, [userId, dispatch]);

    const handleRemove = (productId: string, productVariationId: any , id) => {
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/wishlist/remove/`, {userId, productId, productVariationId: productVariationId?._id}).then(res => {
        if (res.data.success) {
          dispatch(removeFromWishlist({id: productId,productVariationId}));
          toast.success("Removed from wishlist");
          setCounter(prev => prev + 1); // Update the counter state
          setWishlist(prev => prev.filter(item => item.id !== id)); // Update wishlist state locally
        }
      })
      .catch(err => console.error(err));      
    };

  
  const handleAddToCart = async (
    productId: string,
    productVariationId: any,
    name: string,
    price: number,
    image: string | undefined,
    quantity: number,
    userId: string
  ) => {
     
    try {
      
              
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/cart/add/${userId}`,
        {
          productId,
          productVariationId: productVariationId?._id,
          quantity,
          
        }
      );
      setCounter(prev => prev + 1); // Update the counter state
      toast.success("Added to cart successfully");
      dispatch(
        addToCart({
          id: productId,
          productVariationId,
          name,
          price,
          image,
        })
      );
  
    } catch (error) {
      console.error("Failed to add to cart:", error);
      
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center text-gray-600">
          <HeartOff className="mx-auto h-12 w-12 mb-2 text-red-500" />
          Your wishlist is empty!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-2xl p-4 shadow-md flex flex-col bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 object-contain mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-gray-600 mb-2">₹{item.price}</p>

              <div className="flex flex-col gap-2 mt-auto">
                <button
                  className="bg-blue-600 text-white rounded-xl py-2 hover:bg-blue-700 flex items-center justify-center gap-2"
                  onClick={() =>
                    handleAddToCart(
                      item.productId._id,
                      item.productVariationId,
                      item.name,
                      item.price,
                      item.image,
                      1,
                      userId
                    )
                  }
                >
                  
                  Add to Cart
                </button>

                <button
                  className="bg-red-100 text-red-500 rounded-xl py-2 hover:bg-red-200"
                  onClick={() => handleRemove(item.productId._id, item.productVariationId, item._id)}
                >
                  Remove from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
