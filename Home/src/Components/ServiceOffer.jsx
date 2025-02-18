import React, { useState } from "react";
import { VideoIcon, WebIcon, GraphIcon } from "../Pages/Home/homeIcons/film-icon";
import data from "../Pages/Home/data.json";

const ServiceOffer = () => {
  const [same, setSame] = useState("role");

  // Ensure `data.services` exists before filtering
  const filteredService = data?.services?.filter((service) => service.same === same) || [];

  return (
    <div className="bg-white px-4 py-16 sm:px-6 -z-30 lg:px-8" id="services">
      {/* Services Section */}
      <div className="mx-auto max-w-7xl z-30 mt-24">
        <h2 className="mb-12 relative z-30 text-center text-4xl font-bold text-black md:text-4xl">
          What we <span className="text-[#0088cc] z-10">offer</span>
        </h2>

        <div className="grid justify-center px-16 lg:px-0 lg:ml-12 items-center grid-cols-1 z-30 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filteredService.map((service) => (
            <div
              key={service.type}
              className="transform rounded-3xl shadow-2xl md:w-[100%] lg:w-[85%] xl:w-[80%] h-[320px] lg:h-[420px] xl:h-[350px] bg-white p-6 transition duration-300 hover:scale-105 sm:p-8"
            >
              <div className="mb-4 text-[#0088cc]">
                {service.title === "Video editing" ? <VideoIcon /> : service.title === "Web development" ? <WebIcon /> : <GraphIcon />}
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceOffer;
