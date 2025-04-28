
import { useEffect, useState } from "react";
import { AnimatedTestimonialsDemo } from "../components/Home/AnimatedTestimonialsDemo";
import Apparel from "../components/Home/Apparel";
import Contactus from "../components/Home/Contactus";
import FeaturedSection from "../components/Home/FeaturedSection";
import Hero from "../components/Home/Hero";
import { useScrollToTop } from "@/hooks/useScrollToTop";


export default function Home() {

  useScrollToTop();

  return (
    <div>
    
    <Hero />
    <FeaturedSection  />

    <Apparel />
    <Contactus />
    {/* <TestimonialCarousel /> */}
    <AnimatedTestimonialsDemo />
    </div>
  );
}
