import React, { useState } from "react";
import data from "../Pages/Home/data.json";



const Package = () => {
  const [selectedPackage, setSelectedPackage] = useState("web");

  return (
    <>
      <section className="bg-white px-4 overflow-hidden py-16 sm:px-6 lg:px-8" id="contact">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center relative text-4xl font-bold text-black">
            Choose Your <span className="text-[#0088cc]">Package</span>
          </h2>

          {/* Package Selector */}
          <div className="mx-auto mb-16 max-w-2xl">
            <div className="flex rounded-full relative bg-white p-1 shadow-lg">
              <button
                onClick={() => setSelectedPackage("video")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                  selectedPackage === "video" ? "bg-[#0088cc] text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Video editing
              </button>
              <button
                onClick={() => setSelectedPackage("web")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                  selectedPackage === "web" ? "bg-[#0088cc] text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Web development
              </button>
              <button
                onClick={() => setSelectedPackage("design")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                  selectedPackage === "design" ? "bg-[#0088cc] text-white" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                Graphic design
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid items-center gap-8 relative md:grid-cols-2">
            {/* Basic Package */}
            <div className="rounded-3xl lg:max-w-[80%] lg:ml-32 bg-white p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900">{data.packages[selectedPackage].basic.title}</h3>
              <p className="mt-4 text-gray-600">
                A modern, user-friendly landing page to showcase your business or product ideal for quick launches with
                essential features
              </p>
              <div className="my-8">
                <div className="text-4xl font-bold text-[#0088cc]">{data.packages[selectedPackage].basic.price}</div>
              </div>
              <ul className="mb-8 space-y-4">
                {data.packages[selectedPackage].basic.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-16" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6573 21.752L8 16.0934L9.88533 14.208L13.6573 17.9787L21.1987 10.436L23.0853 12.3227L13.6573 21.752Z" fill="black" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 15.9999C1.3335 7.89992 7.90016 1.33325 16.0002 1.33325C24.1002 1.33325 30.6668 7.89992 30.6668 15.9999C30.6668 24.0999 24.1002 30.6666 16.0002 30.6666C7.90016 30.6666 1.3335 24.0999 1.3335 15.9999ZM16.0002 27.9999C14.4243 27.9999 12.8639 27.6895 11.408 27.0865C9.95205 26.4834 8.62918 25.5995 7.51488 24.4852C6.40058 23.3709 5.51666 22.048 4.91361 20.5921C4.31055 19.1362 4.00016 17.5758 4.00016 15.9999C4.00016 14.4241 4.31055 12.8636 4.91361 11.4077C5.51666 9.95181 6.40058 8.62894 7.51488 7.51464C8.62918 6.40033 9.95205 5.51642 11.408 4.91336C12.8639 4.31031 14.4243 3.99992 16.0002 3.99992C19.1828 3.99992 22.235 5.2642 24.4854 7.51464C26.7359 9.76507 28.0002 12.8173 28.0002 15.9999C28.0002 19.1825 26.7359 22.2348 24.4854 24.4852C22.235 26.7356 19.1828 27.9999 16.0002 27.9999Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-full bg-[#0088cc] px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#0077b3]">
                Get Started
              </button>
            </div>

            {/* Premium Package */}
            <div className="rounded-3xl lg:max-w-[80%] bg-white p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-gray-900">{data.packages[selectedPackage].premium.title}</h3>
              <p className="mt-4 text-gray-600">
                Tailored solutions for complex platforms and multi-page websites designed to support your unique business
                needs. Contact us for a personalized quote
              </p>
              <div className="my-8">
                <div className="text-4xl font-bold text-[#0088cc]">{data.packages[selectedPackage].premium.price}</div>
              </div>
              <ul className="mb-8 space-y-4">
                {data.packages[selectedPackage].premium.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-16" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6573 21.752L8 16.0934L9.88533 14.208L13.6573 17.9787L21.1987 10.436L23.0853 12.3227L13.6573 21.752Z" fill="black" fillOpacity="0.6"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M1.3335 15.9999C1.3335 7.89992 7.90016 1.33325 16.0002 1.33325C24.1002 1.33325 30.6668 7.89992 30.6668 15.9999C30.6668 24.0999 24.1002 30.6666 16.0002 30.6666C7.90016 30.6666 1.3335 24.0999 1.3335 15.9999ZM16.0002 27.9999C14.4243 27.9999 12.8639 27.6895 11.408 27.0865C9.95205 26.4834 8.62918 25.5995 7.51488 24.4852C6.40058 23.3709 5.51666 22.048 4.91361 20.5921C4.31055 19.1362 4.00016 17.5758 4.00016 15.9999C4.00016 14.4241 4.31055 12.8636 4.91361 11.4077C5.51666 9.95181 6.40058 8.62894 7.51488 7.51464C8.62918 6.40033 9.95205 5.51642 11.408 4.91336C12.8639 4.31031 14.4243 3.99992 16.0002 3.99992C19.1828 3.99992 22.235 5.2642 24.4854 7.51464C26.7359 9.76507 28.0002 12.8173 28.0002 15.9999C28.0002 19.1825 26.7359 22.2348 24.4854 24.4852C22.235 26.7356 19.1828 27.9999 16.0002 27.9999Z" fill="black" fillOpacity="0.6"/>
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full rounded-full bg-[#0088cc] px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#0077b3]">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Package;