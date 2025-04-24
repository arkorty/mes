import { Link } from "react-router-dom";
import homeImg from "../../assets/homeImg.png";

const Hero = () => {
  return (
    <div className="  mx-auto w-full ">
         <div className="flex flex-col mx-auto  ">
          {/* Image Container */}
          <div className=" mx-auto ">
            <div className="w-screen  h- [400px] mb-6 relative">
              <img
                src={homeImg}
                alt="Mountain expedition"
                className="w-full bg-cover h-full object-cover"
              />
              <div className="absolute top-[30%] left-[10%]">
                <p className="text-xs md:text-sm lg:text-xl xl:text-2xl 2xl:text-5xl uppercase tracking-wider text-[#FFFFFF] mb-2 lg:mb-4 text-center">
                  YOUR BEST VACATION DECISION
                </p>

                <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-9xl font-bold text-center text-[#FFFFFF]">
                  Welcome to Mountain <br /> Expedition Supply
                </h1>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="w-[90%] md:w-[86%] lg:w-[75%] xl:w-[76%] mx-auto text-center px-4">
            <div className="space-y-4">
              <h2 className="text-xl xl:text-3xl 2xl:text-5xl font-medium">
                Meticulously curated outdoor apparel & gear for purchase or rent
                for the whole family!
              </h2>

              <p className="text-gray-600 text-sm lg:text-lg 2xl:text-3xl">
                Mountain Expedition Supply is your next basecamp for everything
                you need to Ski, Camp and Explore! We've got topline skis,
                snowboards, boots, hiking shoes, sleeping bags, apparel and
                custom services so you can get out & play!
              </p>

              <Link to="/shop">
              <button
                className="bg-blue-700 text-white px-16 py-2 rounded-full hover:bg-blue-800 cursor-pointer transition-colors"
              >
                SHOP
              </button>
            </Link>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero