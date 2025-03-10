import { useState } from "react"
import { ChevronLeft, Star } from "lucide-react"
import { motion } from "framer-motion"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  additionalImages: string[]
  description: string
  category: string
  rating: number
  availableColors?: { name: string; value: string }[]
  availableSizes?: string[]
}

const product: Product = {
  id: 1,
  name: "Men Sweater Full-Zip Fleece for Hiking M#100 Black",
  price: 250,
  originalPrice: 410,
  discount: 40,
  image: "/src/assets/Shop/product.png",
  additionalImages: [
    "/src/assets/Shop/product.png",
    "/src/assets/Shop/product.png",
    "/src/assets/Shop/product.png",
    "/src/assets/Shop/product.png",
  ],
  description: "Comfortable black t-shirt for outdoor activities and casual wear.",
  category: "Apparel",
  rating: 4.7,
  availableColors: [
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#CCCCCC" },
  ],
  availableSizes: ["XS", "S", "M", "L"],
}

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.availableColors?.[0]?.value || "#000000")
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[0] || "M")

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.button
        whileHover={{ x: -5 }}
        className="flex items-center text-sm font-medium mb-6 hover:underline"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> BACK
      </motion.button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative bg-gray-100 aspect-square overflow-hidden"
          >
            <img
              src={selectedImage === 0 ? product.image : product.additionalImages[selectedImage - 1]}
              alt={product.name}
              className="object-contain w-full h-full transition-all duration-300 hover:scale-105"
            />
          </motion.div>

          <div className="flex gap-2">
            {product.additionalImages.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt="Product Thumbnail"
                className={`w-16 h-16 object-cover border-2 cursor-pointer rounded-lg ${
                  selectedImage === index + 1 ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(index + 1)}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-xl font-medium">{product.name}</h1>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-black" : "fill-gray-200"}`} />
            ))}
            <span className="text-sm ml-1">{product.rating}/5</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && <span className="text-gray-500 line-through">${product.originalPrice}</span>}
          </div>

          <div className="flex gap-3">
            {product.availableColors?.map((color) => (
              <motion.button
                key={color.value}
                className={`w-8 h-8 rounded-full border-2 ${
                  selectedColor === color.value ? "border-black" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {product.availableSizes?.map((size) => (
              <motion.button
                key={size}
                className={`px-4 py-2 border rounded-md ${
                  selectedSize === size ? "bg-black text-white" : "border-gray-300"
                }`}
                onClick={() => setSelectedSize(size)}
                whileHover={{ scale: 1.1 }}
              >
                {size}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            ADD TO CART
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border rounded-md mt-12"
      >
        <button className="w-full px-4 py-3 text-left font-bold bg-gray-100">
          PRODUCT DETAILS
        </button>
        <div className="px-4 pb-4">
          <p className="text-gray-700">{product.description}</p>
        </div>
      </motion.div>
    </div>
  )
}
