import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import homeImg from "../../assets/homeImg.png"

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

export default function Contactus() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Submitted email:", email)
    setEmail("")
  }

  return (
    <motion.section
      className="bg-yellow-400 h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Image */}
          <motion.div className="overflow-hidden" variants={fadeIn}>
            <img
              src={homeImg || "/placeholder.svg"}
              alt="Hiker with backpack"
              className="w-full h-auto object-cover rounded-md"
            />
          </motion.div>

          {/* Right side - Newsletter form */}
          <motion.div className="bg-white p-6 rounded-md shadow-md" variants={fadeIn}>
            <h3 className="text-lg font-semibold mb-4">Never Miss Deals</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email below and we'll send you great deals and special offers that you won't find anywhere
              else.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Your email address"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-xs text-gray-600">
                    I am at least 13 years old and subscribe to receive promotional emails.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

