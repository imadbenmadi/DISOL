import React, { useState } from "react";
import data from "../../Pages/Home/data.json";

const Package = () => {
    const [selectedPackage, setSelectedPackage] = useState("web");

    return (
        <>
            <section
                className="bg-white px-4 overflow-hidden py-16 sm:px-6 lg:px-8"
                id="contact"
            >
                <div className="mx-auto max-w-7xl">
                    <h2 className="mb-12 text-center relative text-4xl font-bold text-black">
                        Choose Your{" "}
                        <span className="text-[#0088cc]">Package</span>
                    </h2>

                    <div className="mx-auto mb-16 max-w-2xl">
                        <div className="flex rounded-full relative bg-white p-1 shadow-lg">
                            <button
                                onClick={() => setSelectedPackage("video")}
                                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                                    selectedPackage === "video"
                                        ? "bg-[#0088cc] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Video editing
                            </button>
                            <button
                                onClick={() => setSelectedPackage("web")}
                                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                                    selectedPackage === "web"
                                        ? "bg-[#0088cc] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Web development
                            </button>
                            <button
                                onClick={() => setSelectedPackage("posts")}
                                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors sm:text-base ${
                                    selectedPackage === "posts"
                                        ? "bg-[#0088cc] text-white"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                Graphic design
                            </button>
                        </div>
                    </div>

                    <div className="grid items-center gap-8 relative md:grid-cols-2">
                        {Array.isArray(data.packages[selectedPackage]) ? (
                            data.packages[selectedPackage].map((pkg, index) => (
                                <div
                                    key={index}
                                    className="rounded-3xl lg:max-w-[80%] lg:ml-32 bg-white p-8 shadow-2xl"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {pkg.title}
                                    </h3>
                                    <p className="mt-4 text-gray-600">
                                        {pkg.description}
                                    </p>
                                    <div className="my-8">
                                        <div className="text-4xl font-bold text-[#0088cc]">
                                            {pkg.price}
                                        </div>
                                    </div>
                                    <ul className="mb-8 space-y-4">
                                        {pkg.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center"
                                            >
                                                <span className="text-gray-600">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full rounded-full bg-[#0088cc] px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#0077b3]">
                                        Get Started
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl lg:max-w-[80%] lg:ml-32 bg-white p-8 shadow-2xl">
                                <h3 className="text-2xl font-bold text-gray-900">
                                    {data.packages[selectedPackage].title}
                                </h3>
                                <p className="mt-4 text-gray-600">
                                    {data.packages[selectedPackage].description}
                                </p>
                                <div className="my-8">
                                    <div className="text-4xl font-bold text-[#0088cc]">
                                        {data.packages[selectedPackage].price}
                                    </div>
                                </div>
                                <ul className="mb-8 space-y-4">
                                    {data.packages[
                                        selectedPackage
                                    ].features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center"
                                        >
                                            <span className="text-gray-600">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full rounded-full bg-[#0088cc] px-8 py-3 text-center text-base font-medium text-white transition-colors hover:bg-[#0077b3]">
                                    Get Started
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Package;
