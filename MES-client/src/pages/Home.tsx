
import { AnimatedTestimonialsDemo } from "../components/Home/AnimatedTestimonialsDemo";
import Apparel from "../components/Home/Apparel";
import Contactus from "../components/Home/Contactus";
import FeaturedSection from "../components/Home/FeaturedSection";
import Hero from "../components/Home/Hero";


export default function Home() {
  return (
    <div>
    {/* <section className="min-h-screen">
      <div className="flex justify-center flex-col items-center py-6">
        
        
        

      </div>
    </section> */}
    <Hero />
    <FeaturedSection />

    <Apparel />
    <Contactus />
    {/* <TestimonialCarousel /> */}
    <AnimatedTestimonialsDemo />
    </div>
  );
}
