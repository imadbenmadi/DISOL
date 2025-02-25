import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Hero from "../../Components/Hero";
import TwinCard from "../../Components/TwinCard";
import Service from "../../Components/Service";
import Package from "../../Components/Package";
import Projects from "../../Components/Projects";
import Review from "../../Components/Review";
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
            <Hero />

            {/* TwinCard Section */}
            <TwinCard />

            <div className="relative py-36">
                {/* // Blue Circle */}
                <Bg_of_services />
                {/* // TwinCard Section */}
                <Service />
                {/* // TwinCard Section */}
            </div>
            <Package />

            {/* Project Section */}
            {/* <Projects /> */}

            {/* reviews Section */}
            {/* <Review /> */}

            {/* Project Section */}
            <FAQs />

            {/* Footer Section */}
            <Footer />
        </div>
    );
}

export default Home;
