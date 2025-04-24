import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Star, MapPin, Truck } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion"

import { cn } from "../../lib/util"
import { useNavigate, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import prdctdetails from "../../lib/product.json"
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { RootState } from "@/redux/store"
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import axios from "axios"
import { addToCart as addToCartAPI } from "../../api/index"



// Enhanced product type with additional images
interface Product {
  id: string 
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  additionalImages: string[]
  description: string
  shortDescription: string
  productVariationId: string | "123456789"
  category: string
  rating: number
  color?: string
  availableColors?: { name: string; value: string }[]
  availableSizes?: string[]
  reviews?: Review[]
}

interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  date: string
  location: string
  verified: boolean
  ratings: {
    value: number
    warmth: number
    breathability: number
    lightweight: number
  }
}


const enhancedProducts = prdctdetails;

export default function ProductDetail({ productId = '1' }: { productId?: string }) {

  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`)
      .then((res) => {
        const mainProduct = res.data?.data?._doc;
        const similar = res.data?.data?.similarProducts || [];
        setProduct(mainProduct);
        setSimilarProducts(similar);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);




  const productpp = enhancedProducts.find((p) => p.id.toString() === productId) || enhancedProducts[0]
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productpp.availableColors?.[0]?.value || "#000000")
  const [selectedSize, setSelectedSize] = useState(productpp.availableSizes?.[0] || "M")

  // Calculate average ratings
  const calculateAverageRating = (): string => {
    if (!productpp.reviews || productpp.reviews.length === 0) return "0.0";
  
    let total = 0;
  
    for (const review of productpp.reviews) {
      total += review.rating;
    }
  
    const average = total / productpp.reviews.length;
    return average.toFixed(1);
  };
  
  

  // Calculate rating distribution
  const calculateRatingDistribution = () => {
    if (!productpp.reviews || productpp.reviews.length === 0) return [0, 0, 0, 0, 0]
    const distribution = [0, 0, 0, 0, 0]
    productpp.reviews.forEach((review) => {
      distribution[5 - review.rating]++
    })
    return distribution
  }

  const ratingDistribution = calculateRatingDistribution()
  const totalReviews = productpp.reviews?.length || 0

  const nextImage = () => {
    setSelectedImage((prev) => (prev === productpp.additionalImages.length ? 0 : prev + 1))
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? productpp.additionalImages.length : prev - 1))
  }

  const cartItems = useSelector((state: RootState) => state.cart.items);


  const isInCart = (id: string) => {
    return cartItems.some((item) => item.id === id);
  };
  
  

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const isInWishlist = (id: string, productVariationId: string ) =>
    wishlistItems.some((item) => item.id === id && item.productVariationId === productVariationId);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAddToCart = async (
      productId: string,
      productVariationId: string,
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
            productVariationId,
            quantity,
            
          }
        );
  
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center text-sm font-medium mb-6 hover:underline"
    >
      <ChevronLeft className="h-4 w-4 mr-1" /> BACK
    </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gray-100 aspect-auto overflow-hidden"
          >
            <img
              src={selectedImage === 0 ? product?.image : productpp?.additionalImages[selectedImage - 1]}
              alt={productpp?.name}
              className="object-contain w-full h-full transition-all duration-300 hover:scale-105"
            />
          </motion.div>
          
          
            {/* Navigation arrows for mobile */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md md:hidden"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md md:hidden"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          {/* </div> */}

          {/* Thumbnails */}
          <div className="relative">
            <div className="flex space-x-2 overflow-x-auto py-2 scrollbar-hide">
              <button
                onClick={() => setSelectedImage(0)}
                className={cn(
                  "flex-shrink-0 border-2 w-20 h-20 overflow-hidden",
                  selectedImage === 0 ? "border-black" : "border-transparent hover:border-gray-300",
                )}
              >
                <img
                  src={productpp.image || "/placeholder.svg"}
                  alt={`${productpp.name} thumbnail 1`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>

              {productpp.additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index + 1)}
                  className={cn(
                    "flex-shrink-0 border-2 w-20 h-20 overflow-hidden",
                    selectedImage === index + 1 ? "border-black" : "border-transparent hover:border-gray-300",
                  )}
                >
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`${productpp.name} thumbnail ${index + 2}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>

            {/* Navigation arrows for desktop */}
            <button
              onClick={prevImage}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow-md"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand and Title */}
          <div>
            <h2 className="text-lg font-bold uppercase">{product?.brand}</h2>
            <h1 className="text-xl font-medium mt-1">{productpp?.name}</h1>
          </div>
          <div>
            <div className="text-base font-normal text-gray-800 ">{product?.shortDescription}</div>
            <div  className="text-base font-normal text-gray-800 ">{product?.description}</div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)]?.map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(productpp?.rating) ? "fill-green-600 text-green-600" : "fill-gray-300 text-gray-300",
                  )}
                />
              ))}
            </div>
            <span className="text-sm ml-1">{productpp?.rating}/5</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">${product?.price}</span>
            {productpp?.originalPrice && (
              <>
                <span className="text-gray-500 line-through">${productpp?.originalPrice}</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{productpp?.discount}% OFF</span>
              </>
            )}
          </div>

          {/* Color Options */}
          <div>
            <h3 className="text-sm uppercase font-medium mb-2">COLOR OPTIONS</h3>
            <div className="flex gap-2">
              {productpp.availableColors?.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color?.value)}
                  className={cn("w-8 h-8 rounded-sm border", selectedColor === color?.value ? "ring-2 ring-black" : "")}
                  style={{ backgroundColor: color?.value }}
                  aria-label={`Select ${color?.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-sm uppercase font-medium mb-2">SELECT SIZE</h3>
            <div className="flex gap-2">
              {productpp.availableSizes?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "w-10 h-10 flex items-center justify-center border",
                    selectedSize === size ? "bg-black text-white" : "bg-white hover:bg-gray-100",
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
          <button
                    className="w-[70%] bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700"
                    onClick={() =>
                      handleAddToCart(
                        product._id,
                        product.productVariationId,
                        product.name,
                        product.price,
                        product.image,
                        1,
                        userId
                      )
                    }
                  >
                  Add to Cart
                </button>

          {/* <Button
            className={`flex-1 ${isInCart(product.id.toString()) ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
            onClick={() => {
              if (!isInCart(product.id)) {
                dispatch(
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })
                );
              }
            }}
          >
            {isInCart(product.id) ? "ADDED TO CART" : "ADD TO CART"}
          </Button> */}


<Button
  variant={isInWishlist(product?.id, product?.productVariationId) ? "default" : "outline"}
  className="flex-1"
  onClick={() => {
    if (isInWishlist(product?.id, product?.productVariationId)) {
      dispatch(removeFromWishlist({ id: product?.id, productVariationId: product?.productVariationId }));
    } else {
      dispatch(
        addToWishlist({
          id: product?.id,
          name: product?.name,
          price: product?.price,
          image: product?.image,
          productVariationId: product?.productVariationId,
        })
      );
    }
  }}
>
  {isInWishlist(product?.id, product?.productVariationId) ? "WISHLISTED" : "ADD TO WISHLIST"}
</Button>

          
          </div>

          {/* Delivery and Services */}
          <div className="pt-4">
            <h3 className="text-sm uppercase font-medium mb-4">DELIVERY AND SERVICES</h3>

            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">395400</span>
              <button className="text-blue-600 text-sm hover:underline">Change</button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Truck className="h-5 w-5 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">Free Delivery by 18th Oct, 2024</p>
                  <p className="text-xs text-gray-500">Order within 19hrs 59mins</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm font-medium">Free pickup in Store</p>
                  <button className="text-xs text-blue-600 hover:underline">View nearest store</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Accordion */}
      <div className="mt-12">
        <Accordion type="single" collapsible defaultValue="details" className="border rounded-md">
          <AccordionItem value="details">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-bold">PRODUCT DETAILS</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus
                maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
                felis id augue sit cursus pellentesque enim.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="specifications"
          defaultChecked>
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-bold">PRODUCT SPECIFICATIONS</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus
                maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
                felis id augue sit cursus pellentesque enim.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="information">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-bold">TECHNICAL INFORMATION</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus
                maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
                felis id augue sit cursus pellentesque enim.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="material">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-bold">MATERIAL & CARE</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus
                maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis
                felis id augue sit cursus pellentesque enim.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <Accordion type="single" collapsible defaultValue="reviews" className="border rounded-md">
          <AccordionItem value="reviews">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <span className="font-bold">REVIEWS</span>
            </AccordionTrigger>
            <AccordionContent className="px-0 pb-0">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Review Summary */}
                <div className="p-6 border-r border-b">
                  <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold">{calculateAverageRating()}</h3>
                    <div className="flex my-2">
                      {[...Array(5)]?.map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(productpp?.rating) ? "fill-black text-black" : "fill-gray-200 text-gray-200",
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">{totalReviews} Reviews</p>

                    <Button variant="outline" className="mt-4 w-full">
                      Write a review
                    </Button>
                  </div>

                  {/* Rating Distribution */}
                  <div className="mt-8 space-y-2">
                    {[5, 4, 3, 2, 1].map((rating, index) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-sm w-4">{rating}</span>
                        <Star className="h-3 w-3 fill-black text-black" />
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-800"
                            style={{
                              width:
                                totalReviews > 0 ? `${(ratingDistribution[5 - rating] / totalReviews) * 100}%` : "0%",
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {ratingDistribution[5 - rating]}/{totalReviews}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="col-span-1 md:col-span-2 divide-y">
                  {productpp.reviews?.map((review) => (
                    <div key={review.id} className="p-6">
                      {/* Rating Stars */}
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-4 w-4",
                              i < review?.rating ? "fill-black text-black" : "fill-gray-200 text-gray-200",
                            )}
                          />
                        ))}
                      </div>

                      {/* Rating Categories */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        {Object.entries(review?.ratings).map(([key, value] : [string, number]) => (
                          <div key={key} className="flex flex-col items-center">
                            <div className="relative w-16 h-16">
                              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                              <div
                                className="absolute inset-0 rounded-full border-4 border-green-600"
                                style={{
                                  clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                                  opacity: value / 5,
                                }}
                              ></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-medium">{value}/5</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500 mt-2 capitalize">
                              {key.replace(/([A-Z])/g, " $1")?.toLowerCase()}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Reviewer Info */}
                      <div>
                        <h4 className="font-medium">{review?.userName}</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-1 text-sm">
                          {review?.verified && (
                            <div className="flex items-center gap-1">
                              <span className="bg-black rounded-full w-3 h-3"></span>
                              <span>Verified Purchase</span>
                            </div>
                          )}
                          <span className="text-gray-500">{review?.date}</span>
                          <span className="text-gray-500">{review?.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="p-4">
                    <Button variant="outline" className="w-full">
                      View All Reviews
                    </Button>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}





