import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Landing from "../../Components/Landing";
import TwinCard from "../../Components/TwinCard";
import ServiceOffer from "../../Components/ServiceOffer";
import Package from "../../Components/Package";
import Projects from "../../Components/Projects";
import AboutUs from "../../Components/AboutUs";
import FAQs from "../../Components/FAQ";
import Footer from "../../Components/Footer";
import "keen-slider/keen-slider.min.css";
import Bg_of_services from "../../Components/Bg_of_services";
function Home({ children }) {
    useEffect(() => {
        const handleScroll = (e) => {
            e.preventDefault();
            const target = e.target;
            const id = target.getAttribute("href")?.slice(1);
            if (id) {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        };

        const links = document.querySelectorAll('nav a[href^="#"]');
        links.forEach((link) => {
            link.addEventListener("click", handleScroll);
        });

        return () => {
            links.forEach((link) => {
                link.removeEventListener("click", handleScroll);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <Navbar />

            {/* Hero Section */}
            <Landing />

            {/* TwinCard Section */}
            <TwinCard />

            <div className="relative py-36">
                {/* // Blue Circle */}
                <Bg_of_services />
                {/* // TwinCard Section */}
                <ServiceOffer />
                {/* // TwinCard Section */}
            </div>
            <Package />

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
