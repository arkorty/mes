
import { useEffect, useState } from "react";
import { AnimatedTestimonialsDemo } from "../components/Home/AnimatedTestimonialsDemo";
import Apparel from "../components/Home/Apparel";
import Contactus from "../components/Home/Contactus";
import FeaturedSection from "../components/Home/FeaturedSection";
import Hero from "../components/Home/Hero";
import axios from "axios";


export default function Home() {

  // const [categories, setCategories] = useState([])

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_BASE_URL}/api/category/dropdown`)
  //     .then((res) => setCategories(res.data.data))
  //     .catch((err) => console.error(err))
  // }, [])

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
