import React, { useEffect, useState, useRef } from "react";
import {
    ChevronDown,
    UserPlus,
    Star,
    StarHalf,
    Plus,
    Minus,
    Menu,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";
import data from "../Pages/Home/data.json";

const Footer = () => {
    return (
        <>
            <footer className="bg-[#0088cc] mt-24 md:mt-36 lg:mt-48 text-white">
                <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                    {/* Top Section with Logo and Heading */}
                    <div className="flex flex-col items-start gap-8 pb-16 lg:flex-row lg:items-center lg:gap-16">
                        <div className="w-24 flex-shrink-0">
                            {/* <Footer_image/> */}
                            <img
                                src="../../public/Logo/Logo_white.png"
                                alt=""
                            />
                        </div>
                        <h2 className="text-2xl font-medium leading-tight sm:text-3xl text-white lg:text-4xl">
                            Bringing your digital ideas to life through
                            innovative design, engaging video content, and
                            user-centered web solutions
                        </h2>
                    </div>

                    {/* Main Footer Content */}
                    <div className="grid gap-12 border-t text-center lg:text-left border-white/20 py-16 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Social Media */}
                        <div>
                            <h3 className="mb-6 text-xl text-white font-semibold">
                                Social Media
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href={data.socialmedia.facebook}
                                        className="flex items-center justify-center lg:justify-start text-white gap-2 hover:opacity-80"
                                    >
                                        <Facebook className="h-5 w-5" />
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={data.socialmedia.instgram}
                                        className="flex items-center justify-center lg:justify-start text-white gap-2 hover:opacity-80"
                                    >
                                        <Instagram className="h-5 w-5" />
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={data.socialmedia.linkedIn}
                                        className="flex items-center justify-center lg:justify-start text-white gap-2 hover:opacity-80"
                                    >
                                        <Linkedin className="h-5 w-5" />
                                        Linkedin
                                    </a>
                                </li>
                                {/* <li>
                                    <Link
                                        href={data.socialmedia.X}
                                        className="flex items-center justify-center lg:justify-start text-white gap-2 hover:opacity-80"
                                    >
                                        <Twitter className="h-5 w-5" />X
                                    </Link>
                                </li> */}
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div>
                            <h3 className="mb-6 text-xl text-white font-semibold">
                                Contact Us
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href={`mailto:${data.contactUs.email}`}
                                        className="text-white hover:opacity-80"
                                    >
                                        {data.contactUs.email}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={`tel:${data.contactUs.numberPhone}`}
                                        className=" text-white hover:opacity-80"
                                    >
                                        {data.contactUs.numberPhone}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="mb-6 text-xl text-white font-semibold">
                                Services
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="#services"
                                        className="text-white hover:opacity-80"
                                    >
                                        Website Development
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#services"
                                        className="text-white hover:opacity-80"
                                    >
                                        Graphic Design
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#services"
                                        className="text-white hover:opacity-80"
                                    >
                                        Video Editing
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="mb-6 text-xl text-white font-semibold">
                                Quick Links
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a
                                        href="#"
                                        className="text-white hover:opacity-80"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#services"
                                        className="text-white hover:opacity-80"
                                    >
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#portfolio"
                                        className="text-white hover:opacity-80"
                                    >
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#faq"
                                        className="text-white hover:opacity-80"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#contact"
                                        className="text-white hover:opacity-80"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="text-white border-t border-white/20 py-8 text-center">
                        <p>&copy; 2024 Disol Agency . All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
