import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The climbing gear I bought exceeded my expectations! The quality and durability are unmatched—I've taken it on multiple climbs, and it's still as good as new.",
      name: "Sarah Chen",
      designation: "Professional Mountaineer",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "I’ve never felt safer while climbing! The harness and ropes are top-notch, providing incredible grip and security on even the toughest terrains.",
      name: "Michael Rodriguez",
      designation: "Adventure Enthusiast",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The insulated climbing jacket kept me warm at high altitudes without feeling bulky. Absolutely love the lightweight yet durable design!",
      name: "Emily Watson",
      designation: "Alpine Climber",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Finally, a place where I can get all my climbing essentials! The carabiners, ropes, and helmets are all premium quality and priced fairly.",
      name: "James Kim",
      designation: "Rock Climbing Guide",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The best part of this store is the expert recommendations! I got the perfect pair of climbing shoes that provide incredible grip and comfort.",
      name: "Lisa Thompson",
      designation: "Outdoor Explorer",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}
