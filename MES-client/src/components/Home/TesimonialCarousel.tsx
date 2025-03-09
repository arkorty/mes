
// import { useState, useEffect, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// // Define the testimonial data structure
// interface Testimonial {
//   id: number
//   name: string
//   role: string
//   content: string
//   image: string
// }

// // Sample testimonial data
// const testimonials: Testimonial[] = [
//   {
//     id: 1,
//     name: "Hannah Schmitt",
//     role: "Lead designer",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.",
//     image: "/placeholder.svg?height=80&width=80",
//   },
//   {
//     id: 2,
//     name: "Michael Johnson",
//     role: "Product Manager",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.",
//     image: "/placeholder.svg?height=80&width=80",
//   },
//   {
//     id: 3,
//     name: "Sarah Williams",
//     role: "Marketing Director",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.",
//     image: "/placeholder.svg?height=80&width=80",
//   },
//   {
//     id: 4,
//     name: "David Chen",
//     role: "Senior Developer",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.",
//     image: "/placeholder.svg?height=80&width=80",
//   },
//   {
//     id: 5,
//     name: "Emily Rodriguez",
//     role: "UX Researcher",
//     content:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas. Suspendisse sed magna eget nibh in turpis. Consequat duis diam lacus arcu. Faucibus venenatis felis id augue sit cursus pellentesque enim.",
//     image: "/placeholder.svg?height=80&width=80",
//   },
// ]

// export default function TestimonialCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([])
//   const [isMobile, setIsMobile] = useState(false)

//   // Check if mobile view
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     checkIfMobile()
//     window.addEventListener("resize", checkIfMobile)

//     return () => {
//       window.removeEventListener("resize", checkIfMobile)
//     }
//   }, [])

//   // Update visible testimonials when current index changes
//   useEffect(() => {
//     const updateVisibleTestimonials = () => {
//       if (isMobile) {
//         // On mobile, show only the current testimonial
//         setVisibleTestimonials([testimonials[currentIndex]])
//       } else {
//         // On desktop, show 3 testimonials with the current one in the middle
//         const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
//         const nextIndex = (currentIndex + 1) % testimonials.length

//         setVisibleTestimonials([testimonials[prevIndex], testimonials[currentIndex], testimonials[nextIndex]])
//       }
//     }

//     updateVisibleTestimonials()
//   }, [currentIndex, isMobile])

//   const goToPrevious = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
//   }, [])

//   const goToNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
//   }, [])

//   const goToIndex = useCallback((index: number) => {
//     setCurrentIndex(index)
//   }, [])

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") {
//         goToPrevious()
//       } else if (e.key === "ArrowRight") {
//         goToNext()
//       }
//     }

//     window.addEventListener("keydown", handleKeyDown)

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown)
//     }
//   }, [goToNext, goToPrevious])

//   return (
//     <div className="relative w-full max-w-7xl mx-auto px-4 py-16">
//       {/* Title */}
//       <h2 className="text-center text-2xl md:text-3xl font-bold text-blue-700 mb-8">What Our Clients Say About Us</h2>

//       {/* Pagination dots */}
//       <div className="flex justify-center gap-2 mb-10">
//         {testimonials.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToIndex(index)}
//             className={`w-3 h-3 rounded-full transition-colors duration-300 ${
//               index === currentIndex ? "bg-blue-700" : "bg-gray-300"
//             }`}
//             aria-label={`Go to testimonial ${index + 1}`}
//           />
//         ))}
//       </div>

//       {/* Carousel container */}
//       <div className="relative overflow-hidden w-[96%] mx-auto">
//         {/* Navigation buttons */}
//         <button
//           onClick={goToPrevious}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-blue-700"
//           aria-label="Previous testimonial"
//         >
//           <ChevronLeft className=" text-blue-400 w-6 h-6" />
//         </button>

//         <button
//           onClick={goToNext}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md text-blue-700"
//           aria-label="Next testimonial"
//         >
//           <ChevronRight className="text-blue-700 w-6 h-6" />
//         </button>

//         {/* Testimonials */}
//         <div className="flex justify-center items-center min-h-[420px]  w-[94%] mx-auto">
//           <AnimatePresence mode="wait">
//             <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 w-full">
//               {visibleTestimonials.map((testimonial, index) => {
//                 const isCenter = !isMobile && index === 1

//                 return (
//                   <motion.div
//                     key={testimonial.id}
//                     className={`relative ${
//                       isCenter ? "w-full md:w-1/2 z-20" : "hidden md:block md:w-1/4 z-10 opacity-80"
//                     }`}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     {/* Custom shaped card */}
//                     <div className="relative">
//                       {/* Background shape */}
//                       <div
//                         className={`
//                           absolute inset-0 bg-gray-900 rounded-5xl
//                           ${isCenter ? "transform rotate-2" : index === 0 ? "transform -rotate-6" : "transform rotate-6"}
//                         `}
//                         style={{
//                           clipPath: isCenter
//                             ? "polygon(0% 5%, 100% 0%, 95% 100%, 5% 95%)"
//                             : index === 0
//                               ? "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)"
//                               : "polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)",
//                         }}
//                       />

//                       {/* Green accent */}
//                       <div
//                         className={`
//                           absolute bottom-0 left-0 right-0 h-12 bg-green-800 rounded-b-3xl
//                           ${isCenter ? "transform rotate-2" : index === 0 ? "transform -rotate-6" : "transform rotate-6"}
//                         `}
//                         style={{
//                           clipPath: isCenter
//                             ? "polygon(0% 0%, 100% 0%, 95% 100%, 5% 95%)"
//                             : index === 0
//                               ? "polygon(5% 0%, 100% 0%, 95% 100%, 0% 95%)"
//                               : "polygon(0% 0%, 95% 0%, 100% 95%, 5% 100%)",
//                         }}
//                       />

//                       {/* Content container */}
//                       <div
//                         className={`
//                         relative p-6 md:p-8 
//                         ${isCenter ? "min-h-[320px]" : "min-h-[280px]"}
//                       `}
//                       >
//                         {/* Profile image */}
//                         <div className="flex justify-center mb-4">
//                           <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
//                             <img
//                               src={testimonial.image || "/placeholder.svg"}
//                               alt={testimonial.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                         </div>

//                         {/* Name and role */}
//                         <div className="text-center mb-4">
//                           <h3 className="text-white text-lg font-semibold">{testimonial.name}</h3>
//                           <p className="text-gray-400 text-sm">{testimonial.role}</p>
//                         </div>

//                         {/* Testimonial content */}
//                         <p className="text-white text-sm  leading-relaxed">
//                           {isCenter ? testimonial.content : `${testimonial.content.substring(0, 100)}...`}
//                         </p>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )
//               })}
//             </div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Alice Johnson',
    role: 'Product Manager',
    image: '/images/alice.jpg',
    feedback: 'This product has transformed my workflow completely! Highly recommend it to anyone.'
  },
  {
    id: 2,
    name: 'Mark Smith',
    role: 'Software Engineer',
    image: '/images/mark.jpg',
    feedback: 'Amazing experience! The team was super helpful and the product is top-notch.'
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'UI/UX Designer',
    image: '/images/emily.jpg',
    feedback: 'Absolutely love the interface and ease of use. A game changer for our company!'
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden"> 
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonials[index].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-2xl p-6 text-center flex flex-col items-center"
        >
          <img src={testimonials[index].image} alt={testimonials[index].name} className="w-16 h-16 rounded-full mb-4" />
          <p className="text-gray-700 italic">"{testimonials[index].feedback}"</p>
          <h3 className="font-semibold mt-4 text-lg">{testimonials[index].name}</h3>
          <p className="text-gray-500 text-sm">{testimonials[index].role}</p>
        </motion.div>
      </AnimatePresence>
      
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
        <ChevronLeft />
      </button>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
        <ChevronRight />
      </button>
    </div>
  );
}
