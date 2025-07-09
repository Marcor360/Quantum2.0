import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Footer from "./Footer";

const Layout: React.FC = () => {
  // Controla si el menú móvil está abierto
  const [isOpen, setIsOpen] = useState(false);

  // Rutas y etiquetas del menú
  const links = [
    { to: "/", label: "Inicio" },
    { to: "/proyecto", label: "Proyectos" },
    { to: "/quantum", label: "Quantum360°" },
    { to: "/servicio", label: "Servicios" },
    { to: "/contacto", label: "Contacto" },
  ];

  return (
    <>
      {/* -----------------------------------------
          Navbar con mismo estilo “bubblegum blur”
          que el menú móvil
      ----------------------------------------- */}
      <nav className="
    bg-white/5        /* blanco al 20% de opacidad */
    backdrop-blur-lg   /* desenfoque grande */
    px-6 py-4
    flex justify-between items-center
    relative z-50
  ">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/Quantum-Logo.webp"
              alt="Logo Quantum"
              className="h-12 sm:h-16 md:h-20 lg:h-24 w-auto"
            />
          </Link>
        </div>

        {/* -------------------------------
            Menú de escritorio (desktop)
            Visible en pantallas md+ (>=768px)
        ------------------------------- */}
        <ul className="hidden md:flex space-x-8 items-center text-white text-base sm:text-lg md:text-xl">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="hover:underline hover:text-[#ffff00]">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------------------------------
            Botón hamburguesa (mobile)
            Visible en <md (<768px)
        --------------------------------- */}
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

      {/* ---------------------------------
          Panel móvil deslizante (desde la derecha)
          Aparece al hacer clic en el botón hamburguesa
      --------------------------------- */}
      <div
        className={`
          fixed inset-y-0 right-0 w-2/3 md:hidden
          bg-pink-500/40 backdrop-blur-lg
          transform transition-transform duration-700 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          z-50
        `}
      >
        {/* Tache interno para cerrar */}
        <button
          className="absolute top-4 right-4 focus:outline-none text-white"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar menú"
        >
          <FiX size={28} />
        </button>

        {/* Lista de enlaces móvil */}
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


      {/* Punto de renderizado de rutas hijas */}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
