import React, { useState, useRef, useEffect } from "react";
import type { JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import QM360 from "/Quantum-360.webp";
import QM360_MV from "/Quantum-360-mobile.webp";

import serviciosImg from "/Servicios_Web.webp";
import brandingImg from "/Branding_Web.webp";
import campanasImg from "/Campañas_Web.webp";
import ecommerceImg from "/Eomerce_Web.webp";
import appsIaImg from "/Apps_IA_Web.webp";

// Sliders para mobile
import serviciosImgMV from "/Servicios_Web_mobile.webp";
import brandingImgMV from "/Branding_Web_mobile.webp";
import campanasImgMV from "/Campanas_Web_mobile.webp";
import ecommerceImgMV from "/Eomerce_Web_mobile.webp";
import appsIaImgMV from "/Apps_IA_Web_mobile.webp";

import MouseParticles from "../components/MouseParticles";
import CompVid from "../assets/video/Comp.mp4";

gsap.registerPlugin(ScrollTrigger);

// Hook para detectar móvil
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs para animaciones GSAP
  const circlesRefMobile = useRef<HTMLUListElement | null>(null);
  const resultsRefMobile = useRef<HTMLDivElement | null>(null);
  const circlesRefDesktop = useRef<HTMLUListElement | null>(null);
  const resultsRefDesktop = useRef<HTMLDivElement | null>(null);

  // Data de slides dinámicos
  const slides: { imgUrl: string; content: JSX.Element }[] = [
    {
      imgUrl: isMobile ? serviciosImgMV : serviciosImg,
      content: (
        <>
          <h2 className="pb-45 text-6xl font-subjectivity text-[#ff6ef3] drop-shadow-[0_0_10px_rgba(255,110,243,0.9)] font-bold uppercase">
            Estrategia
          </h2>
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
      imgUrl: isMobile ? brandingImgMV : brandingImg,
      content: (
        <>
          <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-white font-subjectivity tracking-wide drop-shadow-lg uppercase">
            ¿Buscas una identidad{" "}
            <span className="text-[#ff6ef3] drop-shadow-[0_0_10px_rgba(255,110,243,0.9)] uppercase">
              poderosa
            </span>
            ?
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-white/95 font-subjectivity leading-relaxed pr-30">
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
      imgUrl: isMobile ? campanasImgMV : campanasImg,
      content: (
        <>
          <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-[#fff] font-subjectivity tracking-wide drop-shadow-lg py-2 uppercase">
            ¿Ya tienes la{" "}
            <span className="text-[#3b0394] drop-shadow-[0_0_10px_rgba(117,59,208,10.9)]">
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
      imgUrl: isMobile ? ecommerceImgMV : ecommerceImg,
      content: (
        <>
          <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-[#fff] md:text-[#3b0394] font-subjectivity tracking-wide drop-shadow-lg  pr-10 uppercase">
            ¿Listo para vender en los principales{" "}
            <span className="text-[#ff6ef3] drop-shadow-[0_0_10px_rgba(255,110,243,0.9)]">
              marketplaces
            </span>
            ?
          </h2>
          <p className="text-xs sm:text-sm md:text-lg text-[#fff] md:text-[#3b0394] font-subjectivity leading-relaxed font-medium py-2 pr-30">
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
      imgUrl: isMobile ? appsIaImgMV : appsIaImg,
      content: (
        <>
          <h2 className="text-base sm:text-lg md:text-5xl font-bold mb-4 text-white font-subjectivity tracking-wide drop-shadow-lg uppercase">
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

  // GSAP animaciones para móvil
  useEffect(() => {
    const list = circlesRefMobile.current;
    if (!list) return;
    const tween = gsap.fromTo(
      Array.from(list.children),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: list,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const bar = resultsRefMobile.current;
    if (!bar) return;
    const tween = gsap.fromTo(
      bar,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: bar,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // GSAP animaciones para escritorio
  useEffect(() => {
    const list = circlesRefDesktop.current;
    if (!list) return;
    const tween = gsap.fromTo(
      Array.from(list.children),
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: list,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const bar = resultsRefDesktop.current;
    if (!bar) return;
    const tween = gsap.fromTo(
      bar,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: bar,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <main className="flex flex-col w-screen min-h-screen">
      {/* =============== HERO =============== */}
      <header
        id="hero"
        aria-label="Mensaje principal"
        className="relative min-h-screen flex flex-col items-center justify-center px-4"
      >
        <MouseParticles />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white text-center font-subjectivity tracking-wider leading-tight mb-8 drop-shadow-2xl">
          Estrategia de{" "}
          <span className="text-[#ffff00] drop-shadow-[0_0_20px_rgba(255,255,0,0.6)] animate-pulse">
            marketing
          </span>{" "}
          y ventas para el mundo{" "}
          <span className="text-[#ff6ef3] drop-shadow-[0_0_20px_rgba(255,110,243,0.6)] animate-pulse">
            real
          </span>
        </h1>
        <div className="relative mt-6 sm:mt-8 max-w-4xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6ef3]/30 via-[#753bd0]/30 to-[#ffff00]/30 rounded-4xl blur-md opacity-70"></div>
          <p className="relative text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white pl-6 text-center font-subjectivity py-6">
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
        {/* Móvil */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-4 p-4">
          {slides.map((slide, idx) => (
            <article
              key={idx}
              className="relative rounded-lg overflow-hidden h-72 sm:h-80 group border-2 border-[#753bd0]/30 hover:border-[#ffff00]/70 transition-all duration-300"
            >
              <img
                src={slide.imgUrl}
                alt=""
                className="w-full h-67 object-fit sm:object-cover object-center transform scale-[1.1] transition-transform duration-500 z-0"
              />
              <div className="absolute inset-0 z-10 opacity-30 animate-pulse bg-gradient-to-r from-[#ffff00]/20 via-transparent to-[#ff6ef3]/20" />
              <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent z-20">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {slide.content}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Escritorio */}
        <div className="hidden md:flex w-full overflow-hidden md:h-150">
          {slides.map((slide, idx) => (
            <article
              key={idx}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(0)}
              className="relative transition-all duration-500 ease-in-out cursor-pointer overflow-hidden h-full group"
              style={{
                flex: activeIndex === idx ? 17 : 3,
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
                className={`absolute inset-0 p-8 flex flex-col transition-all duration-300 ${
                  idx === activeIndex ? "justify-end" : "opacity-0"
                }`}
              >
                <div className="max-w-[50%] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {slide.content}
                </div>
              </div>
              <div
                className={`absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-[#ffff00] to-[#ff6ef3] transition-all duration-300 ${
                  activeIndex === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            </article>
          ))}
        </div>
      </section>
      {/* =============== CTA QUANTUM 360 =============== */}

      <section
        id="quantum360"
        aria-label="Descubre Quantum 360"
        className="relative w-full min-h-screen overflow-hidden group font-subjectivity"
      >
        {/* Imagen de fondo — móvil */}
        <img
          src={QM360_MV}
          alt="Animación Quantum 360 móvil"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain object-top md:hidden transition-transform duration-700 group-hover:scale-105 z-0"
        />

        {/* Imagen de fondo — escritorio */}
        <img
          src={QM360}
          alt="Animación Quantum 360 escritorio"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover hidden md:block transition-transform duration-700 group-hover:scale-105 z-0"
        />

        {/* ---------- Overlay Móvil (derecha y sobre la imagen) ---------- */}
        <div className="absolute inset-0 z-10 flex flex-col items-end justify-center px-4 text-center bg-black/60 md:hidden">
          <div className="w-full max-w-md grid gap-y-6 pt-30">
            {/* Encabezado */}
            <div>
              <div className="uppercase text-2xl font-extrabold text-[#ff6ef3] drop-shadow-[0_0_8px_rgba(255,110,243,0.9)]">
                Metodología Universal 360°
              </div>
              <p className="mt-1 text-sm text-white">
                Transformación Comercial Basada en Datos y Agilidad Estratégica
              </p>
            </div>

            {/* ¿Qué resuelve? */}
            <div>
              <h2 className="text-2xl font-bold text-[#ffff00] drop-shadow-[0_0_8px_rgba(255,255,0,0.9)]">
                ¿Qué resuelve?
              </h2>
              <p className="mt-1 text-sm text-white">
                El <span className="font-bold text-yellow-400">89%</span> de
                las empresas fallan al adaptar sus modelos de valor…
              </p>
            </div>

            {/* ¿Cómo lo resolvemos? */}
            <div>
              <h3 className="mb-2 text-lg font-bold text-white">
                ¿Cómo lo resolvemos?
              </h3>
              <ul
                ref={circlesRefMobile}
                className="flex flex-wrap justify-center gap-2"
              >
                {[
                  "Data Driven",
                  "Centrado en el cliente",
                  "Transformación operativa",
                  "Nuevos canales comerciales",
                ].map((label) => (
                  <li
                    key={label}
                    className="bg-pink-400 rounded-full flex items-center justify-center
                              w-24 h-24 sm:w-24 sm:h-24
                              text-center text-[0.55rem] sm:text-[0.6rem]
                              leading-tight whitespace-normal break-words px-1
                               text-white font-bold"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resultados */}
            <div className="flex justify-center">
              <div
                ref={resultsRefMobile}
                className="bg-purple-600 py-2 px-4 rounded-full font-bold text-sm text-white"
              >
                Resultados medibles en ventas
              </div>
            </div>

            {/* CTA */}
            <div>
              <p className="mb-2 text-base font-bold text-white">
                Quantum es ciencia, no intuición...
              </p>
              <a
                href="https://wa.me/525520814083?text=Hola%20Quantum%2C%20me%20gustar%C3%ADa%20más%20info%20sobre%20Marketing%2C%20E-commerce%2C%20Desarrollo%20Web%20y%20Branding."
                className="inline-block bg-yellow-400 text-black font-medium py-2 px-5 rounded-lg hover:bg-yellow-300 transition"
              >
                Diagnóstico gratuito →
              </a>
            </div>
          </div>
        </div>

        {/* ---------- Overlay Escritorio (derecha) ---------- */}
        <div
          className="
      hidden md:flex absolute inset-0 z-10 items-center justify-end
      pl-7 sm:pl-10 md:pl-16 lg:pl-25
      pr-24 sm:pr-40 md:pr-60 xl:pr-60 2xl:pr-[28rem]
      text-right
    "
        >
          <div
            className="
        w-full max-w-screen-lg shrink-0
        grid gap-y-8 text-white
        bg-black/60 md:bg-transparent md:backdrop-blur-0
        p-4 md:p-0
      "
          >
            {/* Encabezado */}
            <div>
              <div className="uppercase text-[#ff6ef3] font-extrabold drop-shadow-[0_0_10px_rgba(255,110,243,0.5)] text-3xl">
                Metodología Universal 360°
              </div>
              <p className="mt-1 text-base md:text-lg">
                Transformación Comercial Basada en Datos y Agilidad Estratégica
              </p>
            </div>

            {/* ¿Qué resuelve? */}
            <div>
              <h2 className="text-[#ffff00] font-bold drop-shadow-[0_0_10px_rgba(255,255,0,0.5)] text-4xl">
                ¿Qué resuelve?
              </h2>
              <p className="pt-2.5 text-base md:text-lg">
                El <span className="text-yellow-400 font-bold">89 %</span> de
                las empresas fallan al adaptar sus modelos de valor…
              </p>
            </div>

            {/* ¿Cómo lo resolvemos? */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Cómo lo resolvemos?
              </h2>
              <ul
                ref={circlesRefDesktop}
                className="flex flex-wrap justify-end gap-9"
              >
                {[
                  "Data Driven",
                  "Centrado en el cliente",
                  "Transformación operativa",
                  "Nuevos canales comerciales",
                ].map((label) => (
                  <li
                    key={label}
                    className="bg-pink-400 rounded-full flex items-center justify-center
                   w-28 h-28
                   text-center text-xs
                   leading-tight whitespace-normal break-words px-1
                   text-white font-medium"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resultados */}
            <div className="flex justify-end">
              <div
                ref={resultsRefDesktop}
                className="bg-purple-600 rounded-full text-center font-bold py-3 px-6 md:px-16 text-base md:text-lg"
              >
                Resultados medibles en ventas
              </div>
            </div>

            {/* CTA */}
            <div>
              <p className="text-xl md:text-2xl font-bold mb-1">
                Quantum es ciencia, no intuición…
              </p>
              <a
                href="https://wa.me/525520814083?text=Hola%20Quantum%2C%20me%20gustar%C3%ADa%20más%20info%20sobre%20Marketing%2C%20E-commerce%2C%20Desarrollo%20Web%20y%20Branding."
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 underline text-base md:text-lg font-medium"
              >
                ¿Deseas un diagnóstico sin costo de tu modelo actual?
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* =============== VIDEO DE BIENVENIDA =============== */}
      <section
        id="bienvenida"
        aria-label="Video de bienvenida"
        className="relative w-screen h-[67vh] md:h-[85vh] overflow-hidden bg-black"
      >
        <video
          src={CompVid}
          autoPlay
          loop
          muted
          playsInline
          className={`
            absolute top-1/2 left-1/2
            w-full h-auto origin-center
            md:relative md:top-0 md:left-0 md:w-full md:h-full md:object-cover
          `}
          style={{
            transform: isMobile
              ? "translate(-50%, -50%) scale(2.5)"
              : undefined,
          }}
        />
      </section>
    </main>
  );
};

export default Home;
