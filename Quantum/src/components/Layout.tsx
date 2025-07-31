import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Footer from "./Footer";
//import WhatsAppButton from "./WhatsAppButton";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScroll && current > 50) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { to: "/#servicios", label: "Servicios" },
    { to: "/#Quantum360", label: "Quantum360°" },
    { to: "/proyecto", label: "Proyectos" },
    { to: "/Credenciales", label: "Credenciales" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className={`font-subjectivity fixed top-0 w-full transition-transform duration-300 bg-black/25 backdrop-blur-lg px-4 sm:px-6 flex justify-between items-center z-50 h-16 sm:h-18 md:h-20 lg:h-24
        ${showMenu ? "translate-y-0" : "-translate-y-full"}`}>

        {/* Logo - Tamaño ajustado para diferentes pantallas */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/Quantum-Logo.webp"
              alt="Logo Quantum"
              className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
            />
          </Link>
        </div>

        {/* Menú de escritorio - Solo visible en pantallas grandes (xl+) */}
        <ul className="hidden xl:flex space-x-6 2xl:space-x-8 items-center text-white text-lg 2xl:text-xl font-subjectivity font-semibold">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="hover:text-[#ffff00] transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa - Visible en pantallas menores a xl */}
        {!isOpen && (
          <button
            className="xl:hidden focus:outline-none text-white hover:text-[#ffff00] transition-colors"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
          >
            <FiMenu size={24} className="sm:w-7 sm:h-7" />
          </button>
        )}
      </nav>

      {/* Overlay para cerrar menú al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel móvil/tablet deslizante */}
      <div
        className={`
          fixed inset-y-0 right-0 w-80 sm:w-96 xl:hidden
          bg-gradient-to-b from-blue-900/90 to-purple-900/90 backdrop-blur-xl
          transform transition-transform duration-500 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          z-50 font-subjectivity shadow-2xl
        `}
      >
        {/* Header del menú */}
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-white text-xl font-semibold">Menú</h2>
          <button
            className="focus:outline-none text-white hover:text-[#ffff00] transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar menú"
          >
            <FiX size={28} />
          </button>
        </div>

        {/* Lista de enlaces */}
        <ul className="flex flex-col pt-8 px-6 space-y-6">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className="block text-white text-xl py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[#ffff00] transition-all duration-200 border-l-4 border-transparent hover:border-[#ffff00]"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer del menú */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4"></div>
          <img
            src="/Quantum-Logo.webp"
            alt="Logo Quantum"
            className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto " />
        </div>
      </div>

      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;