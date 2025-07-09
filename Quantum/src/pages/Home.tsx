import React, { useState, useEffect } from "react";
import type { JSX } from "react";
import CompGif from "/Comp.gif";
import serviciosImg from "/Servicios_Web.webp";
import brandingImg from "/Branding_Web.webp";
import campanasImg from "/Campañas_Web.webp";
import ecommerceImg from "/Eomerce_Web.webp";
import appsIaImg from "/Apps_IA_Web.webp";

const slides: { imgUrl: string; content: JSX.Element }[] = [
  {
    imgUrl: serviciosImg,
    content: (
      <>
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-red-400">
          ¿Quieres redefinir tu propuesta de valor?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-red-200">
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
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-green-400">
          ¿Buscas una identidad poderosa?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-green-200">
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
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-yellow-400">
          ¿Ya tienes la estrategia?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-yellow-200">
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
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-indigo-400">
          ¿Listo para vender en los principales marketplaces?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-indigo-200">
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
        <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-2 text-pink-400">
          ¿Deseas optimizar tu operación con tecnología?
        </h2>
        <p className="text-xs sm:text-sm md:text-lg text-pink-200">
          Automatizamos procesos y desarrollamos apps a la medida para
          transformar tu negocio.
        </p>
      </>
    ),
  },
];

export const Home: React.FC = () => {
  const firstText = "Estrategia de Marketing & Ventas para el mundo REAL…";
  const secondText =
    "Exponenciamos tus ingresos TRANSFORMANDO la manera en que tu negocio hace negocio.";

  const [typed, setTyped] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // cursor parpadeante
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  // efecto typing
  useEffect(() => {
    if (typed.length < firstText.length) {
      const to = setTimeout(
        () => setTyped(firstText.slice(0, typed.length + 1)),
        100
      );
      return () => clearTimeout(to);
    } else {
      const to2 = setTimeout(() => setShowSecond(true), 300);
      return () => clearTimeout(to2);
    }
  }, [typed]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-r from-purple-600 to-pink-400">
      {/* === HERO TEXT === */}
      <section className="w-full py-16 flex flex-col items-center ">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
          {typed}
          {typed.length < firstText.length && (
            <span className="inline-block ml-1">
              {cursorVisible ? "|" : " "}
            </span>
          )}
        </h1>
        {showSecond && (
          <p className="mt-4 text-lg md:text-2xl text-white text-center max-w-2xl">
            {secondText}
          </p>
        )}
      </section>

      {/* === SLIDER PRINCIPAL === */}
      <div className="overflow-auto pb-4 md:overflow-hidden">
        {/* MÓVIL / TABLET */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4 p-4">
          {slides.map((slide, idx) => (
            <div
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
            </div>
          ))}
        </div>

        {/* ESCRITORIO */}
        <div className="hidden md:flex w-full overflow-hidden md:h-150">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(0)}
              className="relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden h-full"
              style={{ flex: activeIndex === idx ? 5 : 1 }}
            >
              <img
                src={slide.imgUrl}
                alt=""
                className="w-full h-full object-cover object-[88%] transition-all duration-500 ease-in-out"
              />
              <div
                className={`absolute inset-0 p-8 flex flex-col transition-all duration-300 ${
                  idx === activeIndex ? "opacity-100 justify-start" : "opacity-0"
                }`}
              >
                <div className="max-w-[35%]">{slide.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === GIF DE BIENVENIDA === */}
      <div className="w-full overflow-hidden mt-4">
        <img
          src={CompGif}
          alt="Animación de bienvenida"
          loading="lazy"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Home;
