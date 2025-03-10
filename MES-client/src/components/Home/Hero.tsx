import homeImg from "../../assets/homeImg.png";

const Hero = () => {
  return (
    <div className="container min-h-screen mx-auto  w-full  ">
         <div className="flex flex-col   mx-auto  ">
          {/* Image Container */}
          <div className=" lg:w-[98%] mx-auto ">
            <div className="w-full  h- [400px] mb-8 relative">
              <img
                src={homeImg}
                alt="Mountain expedition"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-[30%] left-[10%]">
                <p className="text-sm uppercase tracking-wider text-[#FFFFFF] mb-2 text-center">
                  YOUR BEST VACATION DECISION
                </p>

                <h1 className="text-2xl md:text-2xl font-bold text-center text-[#FFFFFF]">
                  Welcome to Mountain <br /> Expedition Supply
                </h1>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="max-w-3xl mx-auto text-center px-4">
            <div className="space-y-6">
              <h2 className="text-xl font-medium">
                Meticulously curated outdoor apparel & gear for purchase or rent
                for the whole family!
              </h2>

              <p className="text-gray-600">
                Mountain Expedition Supply is your next basecamp for everything
                you need to Ski, Camp and Explore! We've got topline skis,
                snowboards, boots, hiking shoes, sleeping bags, apparel and
                custom services so you can get out & play!
              </p>

              <button className="bg-blue-700 text-white px-16 py-2 rounded-full hover:bg-blue-800 transition-colors">
                SHOP
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Hero