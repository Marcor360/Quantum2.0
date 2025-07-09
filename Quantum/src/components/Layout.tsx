import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-purple-600 to-pink-400 px-6 py-4 flex justify-between items-center relative z-50">
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

        {/* Menú en tablet y escritorio */}
        <ul className="hidden md:flex space-x-8 items-center text-white text-base sm:text-lg md:text-xl">
          <li>
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/proyecto" className="hover:underline">
              Proyectos
            </Link>
          </li>
          <li>
            <Link to="/quantum" className="hover:underline">
              Quantum360°
            </Link>
          </li>
          <li>
            <Link to="/servicio" className="hover:underline">
              Servicios
            </Link>
          </li>
          <li>
            <Link to="/contacto" className="hover:underline">
              Contacto
            </Link>
          </li>
        </ul>

        {/* Botón hamburguesa en móvil */}
        <button
          className="md:hidden focus:outline-none text-white"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Menú desplegable en móvil */}
        <ul
          className={`md:hidden absolute top-full left-0 w-full
                      bg-gradient-to-r from-purple-600 to-pink-400
                      flex flex-col items-center space-y-4 py-4
                      transition-transform duration-200 ease-in-out
                      ${isOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <li>
            <Link
              to="/"
              className="text-white text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/proyecto"
              className="text-white text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Proyectos
            </Link>
          </li>
          <li>
            <Link
              to="/quantum"
              className="text-white text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Quantum360°
            </Link>
          </li>
          <li>
            <Link
              to="/servicio"
              className="text-white text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Servicios
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className="text-white text-lg hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
