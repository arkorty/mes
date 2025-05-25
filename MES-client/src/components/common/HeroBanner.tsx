import React from "react";

interface HeroBannerProps {
  image: string;
  title: string;
  subtitle: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ image, title, subtitle }) => {
  return (
    <div className="relative">
      <div className="h-[30vh] overflow-hidden">
        <img
          src={image}
          alt="Banner image"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {title}
              </h1>
              <p className="text-xl text-white/90">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
