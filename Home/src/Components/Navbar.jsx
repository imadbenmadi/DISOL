import React, { useState } from "react";
import { ChevronDown, UserPlus, Star, StarHalf, Plus, Minus, Menu, Facebook, Instagram, Linkedin, Twitter, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [languageIs, setLanguageIs] = useState("En");
  const [isOpen, setIsOpen] = useState(false);
  const [navbarActive, setNavbarActive] = useState("Home");
  const [hiddenMobileMenu,setHiddenMobileMenu] = useState(true);


  return (
    <>
      <nav className="w-full fixed z-[70] bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              {isOpen ? (
                " "
              ) : (
                <a href="#">
                  <svg
                    className="w-[80px] pb-3 h-[60px] lg:w-[92px] lg:h-[65px]"
                    viewBox="0 0 92 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 20C25.4547 20 28.3806 20.582 31.1104 21.7127C33.8402 22.8434 36.3206 24.5008 38.4099 26.5901C40.4992 28.6794 42.1566 31.1598 43.2873 33.8896C44.418 36.6195 45 39.5453 45 42.5C45 45.4547 44.418 48.3806 43.2873 51.1104C42.1566 53.8402 40.4992 56.3206 38.4099 58.4099C36.3206 60.4992 33.8402 62.1566 31.1104 63.2873C28.3805 64.418 25.4547 65 22.5 65L22.5 52.6941C23.8387 52.6941 25.1643 52.4304 26.4011 51.9181C27.6379 51.4058 28.7617 50.6549 29.7083 49.7083C30.6549 48.7617 31.4058 47.6379 31.9181 46.4011C32.4304 45.1643 32.6941 43.8387 32.6941 42.5C32.6941 41.1613 32.4304 39.8357 31.9181 38.5989C31.4058 37.3621 30.6549 36.2383 29.7083 35.2917C28.7617 34.3451 27.6379 33.5942 26.4011 33.0819C25.1643 32.5696 23.8387 32.3059 22.5 32.3059V20Z"
                      fill="#0085C8"
                    />
                    <path
                      d="M72.7017 64.771C69.4936 65.2322 66.2237 64.9949 63.1158 64.0753C60.0079 63.1556 57.1354 61.5754 54.6948 59.4427C52.2542 57.3101 50.3032 54.6753 48.9753 51.7187C47.6473 48.7622 46.9738 45.5536 47.0008 42.3126L59.3062 42.4151C59.294 43.8835 59.5992 45.3372 60.2008 46.6768C60.8025 48.0163 61.6864 49.21 62.7922 50.1763C63.8979 51.1425 65.1994 51.8585 66.6075 52.2751C68.0156 52.6918 69.4971 52.7993 70.9506 52.5904L72.7017 64.771Z"
                      fill="#0085C8"
                    />
                    <path
                      d="M72.7017 44.771C69.4936 45.2322 66.2237 44.9949 63.1158 44.0753C60.0079 43.1556 57.1354 41.5754 54.6948 39.4427C52.2542 37.3101 50.3032 34.6753 48.9753 31.7187C47.6473 28.7622 46.9738 25.5536 47.0008 22.3126L59.3062 22.4151C59.294 23.8835 59.5992 25.3372 60.2008 26.6768C60.8025 28.0163 61.6864 29.21 62.7922 30.1763C63.8979 31.1425 65.1994 31.8585 66.6075 32.2751C68.0156 32.6918 69.4971 32.7993 70.9506 32.5904L72.7017 44.771Z"
                      fill="#0085C8"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6 space-x-8">
              <div className="hidden md:flex md:items-center md:space-x-8">
                <a
                  href="#"
                  onClick={() => {
                    setNavbarActive("Home");
                    console.log(navbarActive);
                  }}
                  className={`font-semibold ${
                    navbarActive === "Home" ? "text-[#0088cc]" : "text-black"
                  } hover:text-[#0085C8]`}
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={() => {
                    setNavbarActive("Our services");
                    console.log(navbarActive);
                  }}
                  className={`font-semibold ${
                    navbarActive === "Our services" ? "text-[#0088cc]" : "text-black"
                  } hover:text-[#0085C8]`}
                >
                  Our services
                </a>
                <a
                  href="#about"
                  onClick={() => {
                    setNavbarActive("About us");
                    console.log(navbarActive);
                  }}
                  className={`font-semibold ${
                    navbarActive === "About us" ? "text-[#0088cc]" : "text-black"
                  } hover:text-[#0085C8]`}
                >
                  About us
                </a>
                <a
                  href="#contact"
                  onClick={() => {
                    setNavbarActive("Contact");
                    console.log(navbarActive);
                  }}
                  className={`font-semibold ${
                    navbarActive === "Contact" ? "text-[#0088cc]" : "text-black"
                  } hover:text-[#0085C8]`}
                >
                  Contact
                </a>
              </div>

              {/* Desktop Right Section */}
              <div className="hidden md:flex md:items-center md:space-x-4">
                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                  >
                    <span className="font-semibold languageIs">{languageIs}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {isLanguageOpen && (
                    <div className="absolute right-0 mt-2 w-24 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                      <a
                        onClick={() => setLanguageIs("Ar")}
                        href="#"
                        className={`block ${
                          languageIs === "Ar" ? "text-[#0088cc]" : "text-gray-700"
                        } px-4 py-2 font-semibold Ar hover:bg-gray-100`}
                      >
                        Arabic
                      </a>
                      <a
                        onClick={() => setLanguageIs("En")}
                        href="#"
                        className={`block ${
                          languageIs === "En" ? "text-[#0088cc]" : "text-gray-700"
                        } px-4 py-2 font-semibold En hover:bg-gray-100`}
                      >
                        English
                      </a>
                    </div>
                  )}
                </div>

                <Link href="/Login" className="text-gray-600 font-semibold hover:text-[#0085C8]">
                  Log in
                </Link>
                <Link
                  href="/Register"
                  className="rounded-full bg-[#0085C8] px-8 py-3 text-sm font-medium text-white hover:bg-blue-600"
                >
                  Sign up
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div
              className={`flex relative items-center h-full ${
                isOpen ? "bg-white" : ""
              } justify-end pr-1 fixed w-full transition-all z-[70] ease-linear duration-500 transform space-x-8 md:hidden`}
            >
              <div className="z-[70]">
                {isOpen ? (
                  <button
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
                  >
                    <span className="font-semibold languageIs">{languageIs}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  ""
                )}
                {isLanguageOpen && isOpen && (
                  <div className="absolute z-[70] w-24 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative">
                      <a
                        onClick={() => setLanguageIs("Ar")}
                        href="#"
                        className={`block z-[100] px-4 relative py-2 Ar font-semibold ${
                          languageIs === "Ar" ? "text-[#0088cc]" : "text-gray-700"
                        } hover:bg-gray-100`}
                      >
                        Arabic
                      </a>
                      <a
                        onClick={() => setLanguageIs("En")}
                        href="#"
                        className={`block z-[60] px-4 relative py-2 En font-semibold ${
                          languageIs === "En" ? "text-[#0088cc]" : "text-gray-700"
                        } hover:bg-gray-100`}
                      >
                        English
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex buttonMenu items-center ${
                  isOpen ? "transform -rotate-180 -translate-x-[calc(100vw-90px)] duration-700" : "duration-1000 -rotate-0"
                } justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500`}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen &&  (
          <div className="absolute z-50">
            <div
              className={`fixed transition-all activeWole shadow-lg ease-linear duration-300 w-full bg-white h-full`}
            >
              <div className="mt-[56px] text-cent md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  <a
                    href="#"
                    onClick={() =>{ setNavbarActive("Home")
                      setIsOpen(!isOpen)}}
                    className={`block text-center Home rounded-md ${
                      navbarActive === "Home" ? "text-[#0088cc]" : "text-black"
                    } px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-blue-600`}
                  >
                    Home
                  </a>
                  <a
                    href="#services"
                    onClick={() =>{ setNavbarActive("Our services")
                      setIsOpen(!isOpen)}}
                    className={`block text-center Our services rounded-md ${
                      navbarActive === "Our services" ? "text-[#0088cc]" : "text-black"
                    } px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-blue-600`}
                  >
                    Our services
                  </a>
                  <a
                    href="#about"
                    onClick={() =>{ setNavbarActive("About us")
                      setIsOpen(!isOpen)}}
                    className={`block text-center About us rounded-md ${
                      navbarActive === "About us" ? "text-[#0088cc]" : "text-black"
                    } px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-blue-600`}
                  >
                    About us
                  </a>
                  <a
                    href="#contact"
                    onClick={() =>{ setNavbarActive("Contact")
                      setIsOpen(!isOpen)}}
                    className={`block text-center Contact rounded-md ${
                      navbarActive === "Contact" ? "text-[#0088cc]" : "text-black"
                    } px-3 py-2 text-base font-medium hover:bg-gray-50 hover:text-blue-600`}
                  >
                    Contact
                  </a>
                  <div className="border-t text-center border-gray-200 pt-4">
                    <Link
                      href="/Login"
                      onClick={()=> setIsOpen(!isOpen)}
                      className="block text-center Log in rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/Register"
                      onClick={()=> setIsOpen(!isOpen)}
                      className="rounded-full mt-5 block border-2 px-8 py-3 text-base font-medium text-white transition-colors bg-[#0088cc] hover:bg-blue-600"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;