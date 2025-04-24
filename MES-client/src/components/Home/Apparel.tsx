import { motion } from "framer-motion"
import homeImg from "../../assets/homeImg.png"
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

export default function Apparel() {
  return (
    <motion.section
      className="w-[96%] py-10 mx-auto px-4 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
        <div className="flex w-full mb-6 justify-between">
      <h2 className=" w-[56%] md:w-[80%] text-base md:text-xl lg:text-3xl  font-semibold " >
        For All The Apparels Your Vacation Wants
      </h2>

      <button className=" px-2 py-1 md:px-6 md:py-2 text-white bg-[#003EA5] rounded-3xl flex items-center justify-center md:text-sm text-xs">
        Learn more
      </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-md overflow-hidden shadow-sm"
            variants={fadeIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="h-64 overflow-hidden">
              <img
                src={homeImg || "/placeholder.svg"}
                alt={`Apparel item ${item}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex justify-center">
              <Link
                to="/"
                className="bg-blue-600 text-white text-xs font-semibold px-6 py-2 rounded-md inline-block w-full text-center"
              >
                SHOP NOW
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      
    </motion.section>
  )
}

