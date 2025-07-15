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

/* === PALETA DE COLORES ============================================= */
// electrico1: #ffff00
// uva:       #753bd0
// electrico2:#ff6ef3
// dark:      #191514

/* === DATA DE SLIDES ====================================================== */
const slides: { imgUrl: string; content: JSX.Element }[] = [
  {
    imgUrl: serviciosImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-4xl font-bold mb-4 text-white font-subjectivity tracking-wide drop-shadow-lg">
          ¿Quieres{" "}
          <span className="text-[#ffff00] drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
            redefinir
          </span>{" "}
          tu propuesta de valor?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-white/95 font-subjectivity leading-relaxed">
          Redefine tu propuesta de valor: te ayudamos a{" "}
          <strong className="text-[#ffff00] font-extrabold">
            abrir nuevos canales
          </strong>{" "}
          de venta y a comunicar con segmentos inéditos.
        </p>
      </>
    ),
  },
  {
    imgUrl: brandingImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-white font-subjectivity tracking-wide drop-shadow-lg">
          ¿Buscas una identidad{" "}
          <span className="text-[#ff6ef3] drop-shadow-[0_0_10px_rgba(255,110,243,0.5)]">
            poderosa
          </span>
          ?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-white/95 font-subjectivity leading-relaxed">
          Creamos{" "}
          <strong className="text-[#ff6ef3] font-extrabold">
            ADN estratégico
          </strong>{" "}
          para tu marca, elevamos reconocimiento y fidelizamos audiencias.
        </p>
      </>
    ),
  },
  {
    imgUrl: campanasImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-[#fff] font-subjectivity tracking-wide drop-shadow-lg py-2">
          ¿Ya tienes la{" "}
          <span className="text-[#753bd0] drop-shadow-[0_0_10px_rgba(117,59,208,0.7)]">
            estrategia
          </span>
          ?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-[#fff] font-subjectivity leading-relaxed font-medium py-2 rounded-lg">
          Ejecutamos desde el{" "}
          <strong className="text-[#753bd0] font-extrabold">
            storytelling
          </strong>{" "}
          hasta la compra de medios y analítica para convertir audiencias en
          clientes.
        </p>
      </>
    ),
  },
  {
    imgUrl: ecommerceImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-[#753bd0] font-subjectivity tracking-wide drop-shadow-lg py-2 ">
          ¿Listo para vender en los principales{" "}
          <span className="text-[#ff6ef3] drop-shadow-[0_0_10px_rgba(255,110,243,0.7)]">
            marketplaces
          </span>
          ?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-[#753bd0] font-subjectivity leading-relaxed font-medium py-2">
          Te llevamos a{" "}
          <strong className="text-[#ff6ef3] font-extrabold">
            Amazon y Mercado Libre
          </strong>
          : estrategia, lanzamiento y operación integral.
        </p>
      </>
    ),
  },
  {
    imgUrl: appsIaImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-white font-subjectivity tracking-wide drop-shadow-lg">
          ¿Deseas optimizar tu operación con{" "}
          <span className="text-[#ffff00] drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
            tecnología
          </span>
          ?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-white/95 font-subjectivity leading-relaxed">
          Automatizamos procesos y desarrollamos{" "}
          <strong className="text-[#ffff00] font-extrabold">
            apps a la medida
          </strong>{" "}
          para transformar tu negocio.
        </p>
      </>
    ),
  },
];

/* === COMPONENTE ========================================================== */
export const Home: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    /* LANDMARK principal */
    <main className="flex flex-col w-screen min-h-screen">
      {/* ================= HERO ================= */}
      <header
        id="hero"
        aria-label="Mensaje principal"
        className="
          relative w-full
          h-[calc(99vh_-_theme(spacing.20))]
          flex flex-col items-center justify-center
          px-4
        "
      >
        {/* Partículas de fondo */}
        <MouseParticles />

        {/* Título principal con paleta personalizada */}
        <h1
          className="
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold
            text-white
            text-center font-subjectivity tracking-wider
            leading-tight mb-8
            drop-shadow-2xl
          "
        >
          Estrategia de{" "}
          <span className="text-[#ffff00] drop-shadow-[0_0_20px_rgba(255,255,0,0.6)] animate-pulse">
            marketing
          </span>{" "}
          y ventas para el mundo{" "}
          <span className="text-[#ff6ef3] drop-shadow-[0_0_20px_rgba(255,110,243,0.6)] animate-pulse">
            real
          </span>
        </h1>

        {/* Párrafo con efectos de la paleta */}
        <div className="relative mt-6 sm:mt-8 max-w-4xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6ef3]/30 via-[#753bd0]/30 to-[#ffff00]/30 rounded-4xl blur-md opacity-70"></div>
          <p
            className="
              relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium
              text-white
              pl-6 
              text-center font-subjectivity
              py-6
            "
          >
            <span className="text-[#ffff00] font-bold drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
              Exponenciamos
            </span>{" "}
            tus ingresos{" "}
            <strong className="text-[#ff6ef3] font-extrabold drop-shadow-[0_0_10px_rgba(255,110,243,0.5)]">
              transformando
            </strong>{" "}
            la manera en que tu negocio{" "}
            <span className="text-[#ffff00] font-bold drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
              hace negocio
            </span>
            .
          </p>
        </div>
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
              className="relative rounded-lg overflow-hidden h-72 sm:h-80 group border-2 border-[#753bd0]/30 hover:border-[#ffff00]/70 transition-all duration-300"
            >
              <img
                src={slide.imgUrl}
                alt=""
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#191514]/90 via-[#191514]/50 to-transparent p-4 flex flex-col justify-end">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {slide.content}
                </div>
              </div>
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#ffff00]/10 via-transparent to-[#ff6ef3]/10"></div>
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
              className="relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden h-full group"
              style={{
                flex: activeIndex === idx ? 16 : 3,
                borderTop:
                  activeIndex === idx
                    ? "4px solid #ffff00"
                    : "4px solid transparent",
              }}
            >
              <img
                src={slide.imgUrl}
                alt=""
                className="w-full h-full object-cover object-[89%] transition-all duration-500 ease-in-out group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 p-8 flex flex-col transition-all duration-300 ${idx === activeIndex
                  ? "justify-end"
                  : "opacity-0"
                  }`}
              >
                <div className="max-w-[50%] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {slide.content}
                </div>
              </div>
              {/* Indicador lateral activo */}
              <div
                className={`absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[#ffff00] to-[#ff6ef3] transition-all duration-300 ${activeIndex === idx ? "opacity-100" : "opacity-0"
                  }`}
              ></div>
            </article>
          ))}
        </div>
      </section>

      {/* =============== CTA QUANTUM 360 =============== */}
      <section
        id="quantum360"
        aria-label="Descubre Quantum 360"
        className="relative w-screen h-screen mt-4 overflow-hidden group"
      >
        {/* Fondos: móvil y escritorio */}
        <img
          src={QM360_MV}
          alt="Animación Quantum 360 móvil"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover md:hidden transition-transform duration-700 group-hover:scale-105"
        />
        <img
          src={QM360}
          alt="Animación Quantum 360 escritorio"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover hidden md:block transition-transform duration-700 group-hover:scale-105"
        />

        {/* —— Contenido superpuesto centrado con bloques —— */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-xl mx-auto px-6 md:px-0 grid gap-y-10 text-left text-white">

            {/* Bloque 1: Título y subtítulo */}
            <div>
              <div className="uppercase text-lg font-semibold">
                Metodología Universal 360°
              </div>
              <p className="mt-2 text-lg">
                Transformación Comercial Basada en Datos y Agilidad Estratégica
              </p>
            </div>

            {/* Bloque 2: ¿Qué resuelve? */}
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Qué resuelve?</h2>
              <p className="text-lg">
                El <span className="text-yellow-400 font-bold">89%</span> de las empresas fallan al adaptar sus modelos de valor a mercados volátiles por falta de integración sinérgica entre datos, cliente, agilidad y flexibilidad.
              </p>
            </div>

            {/* Bloque 3: ¿Cómo lo resolvemos? + círculos */}
            <div>
              <h2 className="text-2xl font-bold mb-4">¿Cómo lo resolvemos?</h2>
              <ul className="flex justify-between gap-4">
                {[
                  "Data Driven",
                  "Centrado en el cliente",
                  "Transformación operativa",
                  "Nuevos canales comerciales",
                ].map(label => (
                  <li
                    key={label}
                    className="bg-pink-400 rounded-full w-24 h-24 flex items-center justify-center text-sm font-medium text-white text-center px-2"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bloque 4: Barra de resultados */}
            <div>
              <div className="bg-purple-600 rounded-full text-center font-bold py-3">
                Resultados medibles en ventas
              </div>
            </div>

            {/* Bloque 5: CTA final */}
            <div>
              <p className="text-xl font-bold mb-2">
                Quantum es ciencia, no intuición...
              </p>
              <a
                href="#contacto"
                className="text-yellow-400 underline text-lg font-medium"
              >
                ¿Desea un diagnóstico sin costo de tu modelo actual? Contáctanos
              </a>
            </div>

          </div>
        </div>
      </section>




      {/* ===============VIDEO DE BIENVENIDA =============== */}

      <VideoScrollSection />

    </main>
  );
};

export default Home;
