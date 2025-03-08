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
      className="container h-screen py-12 mx-auto px-4 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <motion.h2 className="text-xl font-semibold mb-4 mt-10" variants={fadeIn}>
        For All The Apparels Your Vacation Wants
      </motion.h2>

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

      <div className="flex justify-end mt-4">
        <Link to="/" className="bg-blue-600 text-white text-xs font-semibold px-6 py-2 rounded-md inline-block">
          LEARN MORE
        </Link>
      </div>
    </motion.section>
  )
}

