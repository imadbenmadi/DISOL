import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import  Navbar  from "../../Components/Navbar"
import  Landing  from "../../Components/Landing"
import  TwinCard  from "../../Components/TwinCard"
import  ServiceOffer  from "../../Components/ServiceOffer"
import  Package  from "../../Components/Package"
import  Projects  from "../../Components/Projects"
import  AboutUs  from "../../Components/AboutUs"
import  FAQs  from "../../Components/FAQ"
import  Footer  from "../../Components/Footer"
import "keen-slider/keen-slider.min.css"



function Home({children}) {
  


useEffect(() => {
  const handleScroll = (e) => {
    e.preventDefault()
    const target = e.target;
    const id = target.getAttribute("href")?.slice(1)
    if (id) {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const links = document.querySelectorAll('nav a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", handleScroll)
  })

  return () => {
    links.forEach((link) => {
      link.removeEventListener("click", handleScroll)
    })
  }
}, []);

return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Landing />

        {/* TwinCard Section */}
        <TwinCard />
    
<div className="relative">
        {/* Blue Circle */}
<svg className="absolute left-[18%] lg:w-[840px] lg:h-[850px] xl:w-[1000px] hidden lg:block xl:h-[1000px]"  width="1248" height="1126" viewBox="0 0 1248 1126" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_1_639)">
<rect width="1440" height="7478" transform="translate(-96 -1016)" fill="white"/>
<g filter="url(#filter0_f_1_639)">
<circle cx="618.5" cy="561.5" r="525.5" fill="#E0EAFF"/>
</g>
<path d="M1144 561.5C1144 851.726 908.726 1087 618.5 1087C328.274 1087 93 851.726 93 561.5C93 271.274 328.274 36 618.5 36C908.726 36 1144 271.274 1144 561.5ZM98.255 561.5C98.255 848.823 331.177 1081.74 618.5 1081.74C905.823 1081.74 1138.74 848.823 1138.74 561.5C1138.74 274.177 905.823 41.255 618.5 41.255C331.177 41.255 98.255 274.177 98.255 561.5Z" fill="white"/>
<g filter="url(#filter1_f_1_639)">
<circle cx="617.624" cy="561.5" r="350.333" fill="#56C7FF" fillOpacity="0.1"/>
</g>
<g filter="url(#filter2_f_1_639)">
<circle cx="617.624" cy="561.5" r="175.167" fill="#75CAFE" fillOpacity="0.1"/>
</g>
<mask id="path-5-outside-1_1_639" maskUnits="userSpaceOnUse" x="266.291" y="210.167" width="703" height="703" fill="black">
<rect fill="white" x="266.291" y="210.167" width="703" height="703"/>
<path d="M967.958 561.5C967.958 754.984 811.108 911.833 617.624 911.833C424.141 911.833 267.291 754.984 267.291 561.5C267.291 368.016 424.141 211.167 617.624 211.167C811.108 211.167 967.958 368.016 967.958 561.5ZM267.641 561.5C267.641 754.79 424.334 911.483 617.624 911.483C810.915 911.483 967.607 754.79 967.607 561.5C967.607 368.21 810.915 211.517 617.624 211.517C424.334 211.517 267.641 368.21 267.641 561.5Z"/>
</mask>
<path d="M967.958 561.5C967.958 754.984 811.108 911.833 617.624 911.833C424.141 911.833 267.291 754.984 267.291 561.5C267.291 368.016 424.141 211.167 617.624 211.167C811.108 211.167 967.958 368.016 967.958 561.5ZM267.641 561.5C267.641 754.79 424.334 911.483 617.624 911.483C810.915 911.483 967.607 754.79 967.607 561.5C967.607 368.21 810.915 211.517 617.624 211.517C424.334 211.517 267.641 368.21 267.641 561.5Z" fill="white"/>
<path d="M967.958 561.5C967.958 754.984 811.108 911.833 617.624 911.833C424.141 911.833 267.291 754.984 267.291 561.5C267.291 368.016 424.141 211.167 617.624 211.167C811.108 211.167 967.958 368.016 967.958 561.5ZM267.641 561.5C267.641 754.79 424.334 911.483 617.624 911.483C810.915 911.483 967.607 754.79 967.607 561.5C967.607 368.21 810.915 211.517 617.624 211.517C424.334 211.517 267.641 368.21 267.641 561.5Z" stroke="white" strokeWidth="1.82149" mask="url(#path-5-outside-1_1_639)"/>
<path d="M792.791 561.5C792.791 658.242 714.366 736.667 617.624 736.667C520.882 736.667 442.458 658.242 442.458 561.5C442.458 464.758 520.882 386.333 617.624 386.333C714.366 386.333 792.791 464.758 792.791 561.5ZM444.209 561.5C444.209 657.274 521.85 734.915 617.624 734.915C713.399 734.915 791.039 657.274 791.039 561.5C791.039 465.726 713.399 388.085 617.624 388.085C521.85 388.085 444.209 465.726 444.209 561.5Z" fill="white"/>
</g>
<defs>
<filter id="filter0_f_1_639" x="-82.1667" y="-139.167" width="1401.33" height="1401.33" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="87.5833" result="effect1_foregroundBlur_1_639"/>
</filter>
<filter id="filter1_f_1_639" x="92.1243" y="36" width="1051" height="1051" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="87.5833" result="effect1_foregroundBlur_1_639"/>
</filter>
<filter id="filter2_f_1_639" x="354.874" y="298.75" width="525.5" height="525.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feGaussianBlur stdDeviation="43.7917" result="effect1_foregroundBlur_1_639"/>
</filter>
<clipPath id="clip0_1_639">
<rect width="1440" height="7478" fill="white" transform="translate(-96 -1016)"/>
</clipPath>
</defs>
</svg>

        {/* TwinCard Section */}
        <ServiceOffer />

        {/* TwinCard Section */}
        <Package />
    </div>
        
        {/* Project Section */} 
   <Projects />

        {/* Project Section */} 
    <AboutUs />

        {/* Project Section */} 
    <FAQs />

        {/* Footer Section */} 
    <Footer />
    
    </div>
  );
}

export default Home;




