import { Link } from "react-router-dom";
import homeImg from "@/assets/homeImg.png";
import logo from "@/assets/Home/footerlogo.png";
import { useState, useEffect } from "react";

const Hero = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLogo(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mx-auto w-full overflow-hidden">
      <div className="flex flex-col mx-auto">
        {/* Image Container */}
        <div className="mx-auto">
          <div className="w-screen h-[60vh] mb-6 relative">
            <img
              src={homeImg}
              alt="Mountain expedition"
              className="w-full bg-cover h-full object-cover"
            />
            <div
              className={`absolute top-[30%] left-1/2 transform -translate-x-1/2 transition-transform duration-1000 ${
                showLogo
                  ? "translate-x-full opacity-0"
                  : "translate-y-0 opacity-100"
              } text-center`}
            >
              <p className="text-lg md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl uppercase tracking-wider text-[#FFFFFF] mb-2 lg:mb-4 mes-typeface">
                YOUR BEST VACATION DECISION
              </p>

              <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-7xl font-semibold text-[#FFFFFF] mes-typeface">
                Welcome to Mountain <br /> Expedition Supply
              </h1>
            </div>
            <div
              className={`absolute top-[30%] left-1/2 transform -translate-x-1/2 transition-transform duration-1000 ${
                showLogo
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-full opacity-0"
              }`}
            >
              <img
                src={logo}
                alt="Logo"
                className="w-[300px] md:w-[400px] lg:w-[500px]"
              />
            </div>
          </div>
        </div>

        <div className="w-[90%] md:w-[86%] lg:w-[75%] xl:w-[76%] mx-auto text-center px-4">
          <div className="space-y-4">
            <h2 className="text-xl xl:text-3xl 2xl:text-5xl font-medium">
              Meticulously curated outdoor apparel & gear for purchase or rent
              for the whole family!
            </h2>

            <p className="text-gray-600 text-sm lg:text-lg 2xl:text-3xl">
              Mountain Expedition Supply is your next basecamp for everything
              you need to Ski, Camp and Explore! We've got topline skis,
              snowboards, boots, hiking shoes, sleeping bags, apparel and custom
              services so you can get out & play!
            </p>

            <Link to="/shop">
              <button className="bg-blue-700 text-white px-16 py-2 rounded-full hover:bg-blue-800 cursor-pointer transition-colors">
                SHOP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
