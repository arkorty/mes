import { motion } from "framer-motion"
import homeImg from "../../assets/Home/feature.png"
import { Link } from "react-router-dom"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function FeaturedSection() {
  return (
    <motion.section
      className="container min-h-screen mx-auto px-4 py-12  "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.h2 className="text-xl font-semibold mb-4" variants={fadeIn}>
        Featured
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left large card */}
        <motion.div className="md:col-span-2 relative overflow-hidden rounded-md h-64 md:h-[30rem]" variants={fadeIn}>
          <img
            src={homeImg || "/placeholder.svg"}
            alt="Gears, boots, bindings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-4">
            <h3 className="text-white text-xl font-bold">GEARS, BOOTS, BINDINGS</h3>
            <Link
              to="/"
              className="bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-md mt-2 inline-block w-max"
            >
              LEARN MORE
            </Link>
          </div>
        </motion.div>

        {/* Right column with 3 cards */}
        <div className="md:col-span-1 g rid grid-cols-1 gap-4  flex flex-col justify-between h-full md:h-[30rem] ">
          {[
            { title: "OUTDOOR GEARS AND EQUIPMENT", image: homeImg },
            { title: "CAMPING GEAR", image: homeImg },
            { title: "HIKING GEAR", image: homeImg },
          ].map((item, index) => (
            <motion.div key={index} className="relative overflow-hidden rounded-lg h-56 md:h- [8rem]" variants={fadeIn}>
              <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-4">
                <h3 className="text-white text-sm font-bold">{item.title}</h3>
                <p className="text-white/70 text-xs">Explore our collection</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

