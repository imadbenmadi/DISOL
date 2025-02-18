import React from 'react'
import { ChevronDown, UserPlus, Star, StarHalf, Plus, Minus, Menu, Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
import data from "../Pages/Home/data.json";



const TwinCard = () => {
  return (
    <>
    <div className=" hidden md:block mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-3">
        {/* Completed Projects Card */}
        <div className="relative overflow-hidden rounded-full lg:max-w-[368px] lg:max-h-[104px]  bg-white p-6 shadow-lg">
          <div className="absolute left-0  top-1/2 h-16 w-1 -translate-y-1/2 "></div>
          <div className="ml-8 flex space-x-4  items-baseline ">
            {/* <span className="bg-[#0046FE] w-[61px] h-0 "></span> */}
            <span className="text-4xl font-bold text-[#0088cc]"><span className="text-center text-4xl text-[#0046FE] w-[91px] h-0 ">|</span>+{data.completeAndClient.numberProjects}</span>
            <span className="text-xl font-normal text-gray-500">{data.completeAndClient.textProject}</span>
          </div>
        </div>

        {/* New Clients Card */}
        <div className="relative overflow-hidden rounded-[46px] lg:max-w-[375px] bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold text-[#0088cc]">+{data.completeAndClient.numberClient}<br /></span>
                </div>
                <span className="text-base font-medium text-gray-500">{data.completeAndClient.textClient}</span>
                <span className="mt-1 flex items-center text-sm font-medium text-green-500">
                  +{data.completeAndClient.nuberRevenuePerSent}%
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </span>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
    </>
  )
}

export default TwinCard
