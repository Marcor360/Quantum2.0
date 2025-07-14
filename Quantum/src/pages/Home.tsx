import React, { useState } from "react";
import type { JSX } from "react";
import QM360 from "/Quantum-360.webp";
import QM360_MV from "/Quantum-360-mobile.webp";
import serviciosImg from "/Servicios_Web.webp";
import brandingImg from "/Branding_Web.webp";
import campanasImg from "/Campañas_Web.webp";
import ecommerceImg from "/Eomerce_Web.webp";
import appsIaImg from "/Apps_IA_Web.webp";
import MouseParticles from "../components/MouseParticles";
import VideoScrollSection from "../components/VideoScrollSection";


/* === DATA DE SLIDES ====================================================== */
const slides: { imgUrl: string; content: JSX.Element }[] = [
  {
    imgUrl: serviciosImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-4xl font-bold mb-2 text-white font-subjectivity">
          ¿Quieres redefinir tu propuesta de valor?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-white font-subjectivity">
          Redefine tu propuesta de valor: te ayudamos a abrir nuevos canales de
          venta y a comunicar con segmentos inéditos.
        </p>
      </>
    ),
  },
  {
    imgUrl: brandingImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-white font-subjectivity">
          ¿Buscas una identidad poderosa?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-white font-subjectivity">
          Creamos ADN estratégico para tu marca, elevamos reconocimiento y
          fidelizamos audiencias.
        </p>
      </>
    ),
  },
  {
    imgUrl: campanasImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-[#4B0082D9] font-subjectivity">
          ¿Ya tienes la estrategia?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-[#1F1F1F] font-subjectivity">
          Ejecutamos desde el storytelling hasta la compra de medios y analítica
          para convertir audiencias en clientes.
        </p>
      </>
    ),
  },
  {
    imgUrl: ecommerceImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-[#4B0082D9] font-subjectivity">
          ¿Listo para vender en los principales marketplaces?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-[#862bc7d9] font-subjectivity">
          Te llevamos a Amazon y Mercado Libre: estrategia, lanzamiento y
          operación integral.
        </p>
      </>
    ),
  },
  {
    imgUrl: appsIaImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-white font-subjectivity">
          ¿Deseas optimizar tu operación con tecnología?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-white font-subjectivity">
          Automatizamos procesos y desarrollamos apps a la medida para
          transformar tu negocio.
        </p>
      </>
    ),
  },
];

/* === COMPONENTE ========================================================== */
export const Home: React.FC = () => {
  const firstText = "Estrategia de marketing y ventas para el mundo real";
  const secondText =
    "Exponenciamos tus ingresos transformando la manera en que tu negocio hace negocio.";
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    /* LANDMARK principal */
    <main className="flex flex-col w-full min-h-screen">
      {/* ================= HERO ================= */}
      <header
        id="hero"
        aria-label="Mensaje principal"
        className="
          relative w-full
          h-[calc(99vh_-_theme(spacing.20))]
          flex flex-col items-center justify-center
        "
      >
        <MouseParticles />

        <h1
          className="
          text-4xl md:text-5xl font-bold text-white text-center
          font-subjectivity tracking-wider
          px-4
        "
        >
          {firstText}
        </h1>

        <p
          className="
          mt-20 text-lg md:text-4xl text-white text-center max-w-2xl
          font-subjectivity px-4
        "
        >
          {secondText}
        </p>
      </header>

      {/* =============== SLIDER DE SERVICIOS =============== */}
      <section
        id="servicios"
        aria-label="Nuestros servicios"
        className="overflow-auto md:overflow-hidden"
      >
        {/* Vista móvil / tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4 p-4">
          {slides.map((slide, idx) => (
            <article
              key={idx}
              className="relative rounded-lg overflow-hidden h-72 sm:h-80"
            >
              <img
                src={slide.imgUrl}
                alt=""
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/50 p-4 flex flex-col justify-between">
                {slide.content}
              </div>
            </article>
          ))}
        </div>

        {/* Vista escritorio */}
        <div className="hidden md:flex w-full overflow-hidden md:h-150">
          {slides.map((slide, idx) => (
            <article
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(0)}
              className="relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden h-full"
              style={{ flex: activeIndex === idx ? 9 : 3 }}
            >
              <img
                src={slide.imgUrl}
                alt=""
                className="w-full h-full object-cover object-[89%] transition-all duration-500 ease-in-out"
              />
              <div
                className={`absolute inset-0 p-8 flex flex-col transition-all duration-300 ${
                  idx === activeIndex
                    ? "justify-end"
                    : "opacity-0"
                }`}
              >
                <div className="max-w-[50%]">{slide.content}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===============VIDEO DE BIENVENIDA =============== */}
    
      <VideoScrollSection />

      {/* =============== CTA QUANTUM 360 =============== */}
      <section
        id="quantum360"
        aria-label="Descubre Quantum 360"
        className="relative w-full mt-4 h-[80vh] md:h-screen overflow-hidden"
      >
        {/* Fondos: móvil y escritorio */}
        <img
          src={QM360_MV}
          alt="Animación Quantum 360 móvil"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover md:hidden"
        />
        <img
          src={QM360}
          alt="Animación Quantum 360 escritorio"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
        />

        {/* Capa de contraste */}
        <div className="absolute inset-0" />

        {/* Botón */}
        <a
          href="/Quantum"
          className="
            absolute left-1/2 transform -translate-x-1/2
            bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-16
            px-3 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4
            bg-black/50 border border-white rounded-full
            text-xs sm:text-sm lg:text-base
            uppercase font-medium tracking-wide sm:tracking-wider
            text-white hover:bg-black/75 transition duration-300
          "
        >
          Descubre cómo funciona
        </a>
      </section>
    </main>
  );
};

export default Home;
