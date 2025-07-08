import { Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-400 px-6 py-4 flex justify-between items-center z-50 relative">
      <Link to="/" className="flex-shrink-0">
        <picture>
          <source srcSet="/Quantum-Logo.webp" type="image/webp" />
          <img
            loading="lazy"
            src="/Quantum-Logo.png"
            alt="Quantum Logo"
            className="h-26 w-auto"
          />
        </picture>
      </Link>

      {/* Desktop navigation con separadores */}
      <nav className="hidden md:flex items-center text-white uppercase font-semibold text-lg">
        <Link to="/servicio" className="hover:underline">
          Servicios
        </Link>
        <span className="mx-3">|</span>
        <Link to="/proyecto" className="hover:underline">
          Proyectos
        </Link>
        <span className="mx-3">|</span>
        <Link to="/Quantum" className="hover:underline">
          Quantum 360°
        </Link>
        <span className="mx-3">|</span>
        <Link to="/contacto" className="hover:underline">
          Contacto
        </Link>
      </nav>

      {/* Botón hamburguesa (móvil) */}
      <button
        className="md:hidden text-white focus:outline-none z-60"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Menú móvil deslizable */}
      <div
        style={{
          backgroundColor: "rgba(219, 39, 119, 0.2)", // rosa oscuro al 80%
          backdropFilter: "blur(10px)", // desenfoque de fondo
          WebkitBackdropFilter: "blur(10px)", // soporte Safari
          backgroundImage: "url('/textures/water-ripples.png')", // textura de ondas
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay", // mezcla textura+color
          animation: "wave 8s linear infinite", // animación de ondas
        }}
        className={`
            fixed top-0 right-0 h-full w-2/3 max-w-xs
            shadow-lg z-50 flex flex-col justify-start items-start
            transform ${isOpen ? "translate-x-0" : "translate-x-full"}
            transition-transform duration-300 ease-in-out md:hidden
          `}
      >
        <nav className="flex flex-col mt-20 space-y-6 text-white uppercase font-semibold text-lg px-6">
          <Link to="/servicio" onClick={() => setIsOpen(false)}>
            Servicios
          </Link>
          <Link to="/proyecto" onClick={() => setIsOpen(false)}>
            Proyectos
          </Link>
          <Link to="/quantum360" onClick={() => setIsOpen(false)}>
            Quantum 360°
          </Link>
          <Link to="/contacto" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
        </nav>
      </div>

      {/* Añade esto también dentro del componente para definir los keyframes sin CSS externo */}
      <style>
        {`
          @keyframes wave {
            from { background-position: 0 0; }
            to   { background-position: 200px 200px; }
          }
        `}
      </style>
    </header>
  );
};
export default Layout;
