import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import { HeartOff, ShoppingCart } from "lucide-react";
import { addToCart } from "../../redux/cartSlice";

const WishlistPage: React.FC = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  const handleRemove = (id: number | string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (item: any) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    );
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
                  onClick={() => handleAddToCart(item)}
                >
                  
                  Add to Cart
                </button>


                  {/* <button
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
                                          productVariationId: "", 
                                          quantity: 1,
                                          userId: userId, 
                                        });
                                      } catch (error) {
                                        console.error("Failed to add to cart on backend:", error);
                                      }
                                    }}
                                  >
                                    <ShoppingCart className="h-5 w-5" />
                                  Add to Cart
                                </button> */}




                <button
                  className="bg-red-100 text-red-500 rounded-xl py-2 hover:bg-red-200"
                  onClick={() => handleRemove(item.id)}
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
