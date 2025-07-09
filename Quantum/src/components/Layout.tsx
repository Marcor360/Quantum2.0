import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/proyecto", label: "Proyectos" },
    { to: "/quantum", label: "Quantum360°" },
    { to: "/servicio", label: "Servicios" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 to-pink-400 px-6 py-4 flex justify-between items-center relative z-50">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/Quantum-Logo.webp"
              alt="Logo Quantum"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
            />
          </Link>
        </div>

        <ul className="hidden md:flex space-x-8 items-center text-white text-base sm:text-lg md:text-xl">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {!isOpen && (
          <button
            className="md:hidden focus:outline-none text-white"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
          >
            <FiMenu size={28} />
          </button>
        )}
      </nav>

      <div
        className={`
          fixed inset-y-0 right-0 w-2/3 md:hidden
          bg-pink-200/30 backdrop-blur-lg
          transform transition-transform duration-700 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          z-50
        `}
      >
        <button
          className="absolute top-4 right-4 focus:outline-none text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar menú"
        >
          <FiX size={28} />
        </button>

        <ul className="h-full flex flex-col items-center justify-center space-y-8">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl hover:underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Outlet />
    </>
  );
};

export default Layout;
