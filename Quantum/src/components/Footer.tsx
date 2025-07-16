// src/components/Footer.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '../assets/icons/facebook.svg?react';
import WhatsAppIcon from '../assets/icons/whatsapp.svg?react';
import InstagramIcon from '../assets/icons/instagram.svg?react';
import MailIcon from '../assets/icons/mail.svg?react';

export const Footer: React.FC = () => (
    <footer className="bg-[#110f0e] text-white py-5 font-subjectivity">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-8 md:gap-y-0 md:flex-row items-center md:items-start justify-between">

            {/* 1. Logo */}
            <Link to="/" className="order-1 md:order-none flex-shrink-0">
                <picture>
                    <source srcSet="/Quantum-Logo.webp" type="image/webp" />
                    <img
                        loading="lazy"
                        src="/Quantum-Logo.png"
                        alt="Quantum Logo"
                        className="h-16 sm:h-14 md:h-16 lg:h-28 w-auto"
                    />
                </picture>
            </Link>

            {/* 2. Texto central */}
            <div className="order-3 md:order-none w-full md:w-auto text-center md:text-left">
                <div className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                    © {new Date().getFullYear()} Quantum Marketing &amp; Sales
                </div>
                <div className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-snug">
                    Blvd. Palmas Hills 1, Valle de las Palmas<br />
                    52787 Naucalpan de Juárez, Mex.
                </div>
            </div>

            {/* 3. Iconos sociales */}
            <div className="order-2 md:order-none flex items-center w-full md:w-auto justify-center md:justify-end">
                <div className="hidden md:block h-12 border-l border-white opacity-50 mr-6" />
                <div className="flex space-x-3 sm:space-x-4">
                    {/* Facebook */}
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="bg-white text-[#110f0e] rounded-full p-2 sm:p-3 hover:opacity-90 transition"
                    >
                        <FacebookIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
                    </a>
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/525520814083"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="WhatsApp"
                        className="bg-white text-[#110f0e] rounded-full p-2 sm:p-3 hover:opacity-90 transition"
                    >
                        <WhatsAppIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
                    </a>
                    {/* Instagram */}
                    <a
                        href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="bg-white text-[#110f0e] rounded-full p-2 sm:p-3 hover:opacity-90 transition"
                    >
                        <InstagramIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
                    </a>
                    {/* Email */}
                    <a
                        href="mailto:jffonseca@quantumsales.mx"
                        aria-label="Email"
                        className="bg-white text-[#110f0e] rounded-full p-2 sm:p-3 hover:opacity-90 transition"
                    >
                        <MailIcon className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
                    </a>
                </div>
            </div>

        </div>
    </footer>
);

export default Footer