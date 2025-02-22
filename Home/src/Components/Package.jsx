import React, { useState } from "react";
import data from "../Pages/Home/data.json";

const Package = () => {
    const [selectedPackage, setSelectedPackage] = useState("web");

    return (
        <section
            className="bg-white px-4 overflow-hidden py-16 sm:px-6 lg:px-8"
            id="contact"
        >
            <div className="mx-auto max-w-7xl">
                <h2 className="mb-12 text-center text-4xl font-bold text-black">
                    Choose Your <span className="text-[#0088cc]">Package</span>
                </h2>

                {/* Package Selector */}
                <div className="mx-auto mb-16 max-w-2xl">
                    <div className="flex justify-center rounded-full bg-white p-1 shadow-lg">
                        {Object.keys(data.packages).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedPackage(category)}
                                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                                    selectedPackage === category
                                        ? "bg-[#0088cc] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Package Cards */}
                <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 ">
                    {Array.isArray(data.packages[selectedPackage])
                        ? data.packages[selectedPackage].map((pkg, index) => (
                              <div
                                  key={index}
                                  className="rounded-3xl bg-white p-8 shadow-2xl"
                              >
                                  <h3 className="text-2xl font-bold text-gray-900">
                                      {pkg.title}
                                  </h3>
                                  <p className="mt-4 text-gray-600">
                                      {pkg.description}
                                  </p>
                                  <div className="my-8 text-4xl font-bold text-[#0088cc]">
                                      {pkg.price}
                                  </div>
                                  <ul className="mb-8 space-y-4">
                                      {pkg.features.map((feature, i) => (
                                          <li
                                              key={i}
                                              className="flex items-center"
                                          >
                                              ✅{" "}
                                              <span className="text-gray-600 ml-2">
                                                  {feature}
                                              </span>
                                          </li>
                                      ))}
                                  </ul>
                                  <button className="w-full rounded-full bg-[#0088cc] px-8 py-3 text-base font-medium text-white transition hover:bg-[#0077b3]">
                                      Get Started
                                  </button>
                              </div>
                          ))
                        : data.packages[selectedPackage] && (
                              <div className="rounded-3xl bg-white p-8 shadow-2xl">
                                  <h3 className="text-2xl font-bold text-gray-900">
                                      {data.packages[selectedPackage].title}
                                  </h3>
                                  <p className="mt-4 text-gray-600">
                                      {
                                          data.packages[selectedPackage]
                                              .description
                                      }
                                  </p>
                                  <div className="my-8 text-4xl font-bold text-[#0088cc]">
                                      {data.packages[selectedPackage].price}
                                  </div>
                                  <ul className="mb-8 space-y-4">
                                      {data.packages[
                                          selectedPackage
                                      ].features.map((feature, i) => (
                                          <li
                                              key={i}
                                              className="flex items-center"
                                          >
                                              ✅{" "}
                                              <span className="text-gray-600 ml-2">
                                                  {feature}
                                              </span>
                                          </li>
                                      ))}
                                  </ul>
                                  <button className="w-full rounded-full bg-[#0088cc] px-8 py-3 text-base font-medium text-white transition hover:bg-[#0077b3]">
                                      Get Started
                                  </button>
                              </div>
                          )}
                </div>
            </div>
        </section>
    );
};

export default Package;
