import ShopPage from "../../components/Shop/ShopPage"
import prdtbg from "../../assets/Shop/shopbg.png"


const Shoppage = () => {
  return (
    <div className=" mb-12">

<div className="relative w-ful -mt-4 mb-6">
        <img
          src={prdtbg}
          alt="Men's Gear Banner"
          className="object-cover brightness-75"
          
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <div className="text-xs text-white uppercase tracking-wider">HOME / MEN / MOUNTAIN</div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">MEN&apos;S GEARS</h1>
        </div>
      </div>

        <div>
            <ShopPage />
        </div>
    </div>
  )
}

export default Shoppage