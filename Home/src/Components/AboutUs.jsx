import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronDown, UserPlus, Star, StarHalf, Plus, Minus, Menu, Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
import data from "../Pages/Home/data.json";


const AboutUs = () => {
  const numberCards = data.testimonials.length;
  console.log("============== numberCards ===============", numberCards);

  const filteredTestminoalOne = data.testimonials.filter((service) => service.id <= numberCards / 2);
  console.log("============== filteredTestminoalOne ===============", filteredTestminoalOne);

  const filteredTestminoalTwo = data.testimonials.filter((service) => service.id > numberCards / 2);
  console.log("============== filteredTestminoalTwo ===============", filteredTestminoalTwo);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef(null);
  const controls = useAnimation();

  // Update width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Move carousel to the current index
  useEffect(() => {
    controls.start({ x: -currentIndex * width });
  }, [currentIndex, width, controls]);

  // Handle swipe gestures
  const handleDragEnd = (event, info) => {
    const swipe = info.offset.x;
    const threshold = width / 4; // Move to the next/prev slide if swipe is big enough

    if (swipe < -threshold && currentIndex < filteredTestminoalOne.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (swipe > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setCurrentIndex((prev) => (prev + 1) % data.testimonials.length);
    }

    if (touchStart - touchEnd < -75) {
      // Swipe right
      setCurrentIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <>
      <section className="px-4 py-16 sm:px-6 overflow-hidden lg:max-h-[850px] lg:px-8" id="about">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-black">
            Our Happy <span className="text-[#0088cc]">Clients</span>
          </h2>

          <div
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`grid gap-5 relative w-full max-w-3xl scroll-smooth transition-all delay-500 ease-in-out lg:gap-6`}
          >
            <motion.div
              animate={controls}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              drag="x"
              dragConstraints={{ left: -width * (filteredTestminoalOne.length - 1), right: 0 }}
              onDragEnd={handleDragEnd}
              className="flex gap-4 lg:gap-6"
            >
              {filteredTestminoalOne.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`min-w-[165px] box-border max-w-[415px] min-h-[245px] lg:w-[418px] shadow-xl ${testimonial.className} transform translate-x-20`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover bg-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.project}</p>
                    </div>
                    <div className="mt-1 flex items-center" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4">
                    <p className="text-gray-600">{testimonial.text}</p>
                  </blockquote>
                </div>
              ))}
            </motion.div>

            <motion.div
              animate={controls}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              drag="x"
              dragConstraints={{ left: -width * (filteredTestminoalTwo.length - 1), right: 0 }}
              onDragEnd={handleDragEnd}
              className="flex gap-4 lg:gap-6"
            >
              {filteredTestminoalTwo.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`min-w-[165px] max-w-[415px] min-h-[245px] lg:w-[418px] shadow-xl ${testimonial.className}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover bg-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.project}</p>
                    </div>
                    <div className="mt-1 flex items-center" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`h-5 w-5 ${
                            index < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <blockquote className="mt-4">
                    <p className="text-gray-600">{testimonial.text}</p>
                  </blockquote>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;


// fill-yellow-400 text-yellow-400