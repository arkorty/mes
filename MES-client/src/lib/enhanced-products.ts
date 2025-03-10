// This file would contain the enhanced product data with additional images
export interface Product {
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
    color?: string
    availableColors?: { name: string; value: string }[]
    availableSizes?: string[]
    reviews?: Review[]
  }
  
  export interface Review {
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
  
  export const enhancedProducts: Product[] = [
    {
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
      color: "black",
      availableColors: [
        { name: "Black", value: "#000000" },
        { name: "Gray", value: "#CCCCCC" },
      ],
      availableSizes: ["XS", "S", "M", "L"],
      reviews: [
        {
          id: 1,
          userName: "Nice Giants",
          rating: 4,
          comment: "Great product, very comfortable and durable.",
          date: "13 hours ago",
          location: "India",
          verified: true,
          ratings: {
            value: 4,
            warmth: 4,
            breathability: 4,
            lightweight: 4,
          },
        },
        {
          id: 2,
          userName: "Soham Hridar",
          rating: 4,
          comment: "Excellent quality, fits perfectly.",
          date: "13 hours ago",
          location: "India",
          verified: true,
          ratings: {
            value: 4,
            warmth: 4,
            breathability: 4,
            lightweight: 4,
          },
        },
      ],
    },
    {
      id: 2,
      name: "Men's White T-Shirt",
      price: 260,
      originalPrice: 400,
      discount: 35,
      image: "/src/assets/Shop/product.png",
      additionalImages: [
        "/src/assets/Shop/product.png",
        "/src/assets/Shop/product.png",
        "/src/assets/Shop/product.png",
        "/src/assets/Shop/product.png",
      ],
      description: "High-quality white t-shirt for daily use and trekking.",
      category: "Apparel",
      rating: 4.7,
      color: "white",
      availableColors: [
        { name: "White", value: "#FFFFFF" },
        { name: "Black", value: "#000000" },
      ],
      availableSizes: ["XS", "S", "M", "L", "XL"],
      reviews: [],
    },
    // Add more enhanced products here...
  ]
  
  