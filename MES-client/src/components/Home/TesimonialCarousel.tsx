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
