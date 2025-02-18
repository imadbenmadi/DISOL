import React from 'react'
import { motion } from "framer-motion"


const Landing = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }


  return (
    <>
       <main className="pt-16">
        <div className="mx-auto mt-10  max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
            <motion.h1
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                  delay:0.2,
                  duration:0.8,
                  ease: "easeInOut",
                  
            }}   
                  className="max-w-4xl text-4xl font-extrabold tracking-tight text-[#0088cc] sm:text-5xl md:text-6xl">
              Your journey to digital 
            </motion.h1>
            <motion.h1
                  variants={titleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{
                  delay: 0.5,
                  duration: 1,
                  ease: "easeInOut",
                  
            }}   
                  className="max-w-4xl text-4xl font-extrabold tracking-tight text-[#0088cc] sm:text-5xl md:text-6xl">
                excellence begins here
            </motion.h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Your destination for transforming ideas into a complete digital reality, from designing and developing
              modern websites to creating visual content that captures attention and boosts your presence
            </p>
            <div className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <button className="rounded-full bg-[#0088cc] px-8 py-3 text-base font-medium text-white transition-colors hover:bg-[#006699]">
                Request a service
              </button>
              <button className="rounded-full border-2 border-[#0088cc] px-8 py-3 text-base font-medium text-[#0088cc] transition-colors hover:bg-[#0088cc] hover:text-white">
                Let's Talk
              </button>
            </div>
          </div>
      </div>
    </main>
    </>
  )
}

export default Landing
