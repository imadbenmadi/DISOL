import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, UserPlus, Star, StarHalf, Plus, Minus, Menu, Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
import data from "../Pages/Home/data.json";



const FAQ = () => {

    const [openItem, setOpenItem] = useState(1);


  return (
    <>
      
<section className=" px-4 py-16 text-white sm:px-6 lg:px-8" id="faq">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-4xl font-bold text-[#0088cc] sm:text-5xl">Questions</h2>
        <p className="mt-4 text-center text-xl text-gray-400 sm:text-2xl">
          Find answers to common questions about our services and process
        </p>

        <div className="mt-12 space-y-4 relative">
          {data.faqItems.map((item) => (
            <div key={item.id} className="overflow-hidden  rounded-lg">
              <button
                onClick={() => setOpenItem(openItem === item.id ? null : item.id)}
                className="flex w-full items-center justify-between py-5 text-left text-xl font-medium text-white transition-colors hover:text-[#0088cc] focus:outline-none focus:ring-2 focus:ring-[#0088cc] focus:ring-offset-2 focus:ring-offset-black"
                aria-expanded={openItem === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span className="pr-8 text-black">{item.question}</span>
                <span className="flex-shrink-0">
                  {openItem === item.id ? <Minus className="h-6 w-6 text-black" /> : <Plus className="h-6 w-6 text-black" />}
                </span>
              </button>
              <div
                id={`faq-answer-${item.id}`}
                className={`transition-all duration-300 text-black ease-in-out ${
                  openItem === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
                role="region"
                aria-hidden={openItem !== item.id}
              >
                <p className="pb-5 text-gray-400">{item.answer}</p>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}

export default FAQ
