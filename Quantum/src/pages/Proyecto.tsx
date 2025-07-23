import useInView from "../components/useInView.tsx";
import React, { useState, useCallback, useEffect } from "react";

// Assets
import IMG_BOTELLA from "/Proyectos/BotellaProyecto.webp";
import IMG_CAMISA from "/Proyectos/CamisaProyect3.webp";
import IMG_CAMPANAS from "/Proyectos/Campañas.webp";
import IMG_CAMPANAS_DIG from "/Proyectos/CampañasDigitales.webp";
import IMG_HANDS from "/Proyectos/Hands-Holding-copy.webp";
import IMG_SL1PY from "/Proyectos/SliderPayrolling-1.webp";
import IMG_SL2PY from "/Proyectos/SliderPayrolling-2.webp";
import IMG_SL3PY from "/Proyectos/SliderPayrolling-3.webp";
const IMG_LIBRETAS = "/Proyectos/Libretas.webp";
const IMG_GORRA = "/Proyectos/Gorra.webp";
const IMG_DESARROLLO_WEB = "/Proyectos/Desarollo-web.webp";

interface Slide {
  img: string;
}

const slides: Slide[] = [
  { img: IMG_SL1PY },
  { img: IMG_SL2PY },
  { img: IMG_SL3PY },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = slides.length;

  const translateX = -currentIndex * 100;

  const prev = useCallback(() => {
    setCurrentIndex(i => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setCurrentIndex(i => (i + 1) % total);
  }, [total]);

  // Auto-play funcionalidad
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-gray-900/20 backdrop-blur-sm">
      {/* Contenedor flex para las imágenes */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {slides.map((s, i) => (
          <div key={i} className="flex-none w-full relative">
            <img
              src={s.img}
              alt={`Slide ${i + 1}`}
              className="w-full h-[28rem] sm:h-[34rem] md:h-[38rem] lg:h-[42rem] object-cover"
              loading="lazy"
            />
            {/* Overlay gradient para mejor legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Botones de navegación mejorados */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 group"
      >
        <svg className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95 group"
      >
        <svg className="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === currentIndex 
                ? "bg-white scale-125 shadow-lg" 
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
            aria-label={`Ir al slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Proyecto: React.FC = () => {
  const { ref: marcaRef, inView: marcaInView } = useInView();
  const { ref: webRef, inView: webInView } = useInView();
  const { ref: brandingRef, inView: brandingInView } = useInView();
  const { ref: redesRef, inView: redesInView } = useInView();
  const { ref: tipsRef, inView: tipsInView } = useInView();

  return (
    <main className="font-subjectivity text-white space-y-16">
      {/* Desarrollo de Marca */}
      <div
        ref={marcaRef}
        className={`transition-all duration-700 ease-out ${
          marcaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <section className="py-6 md:py-20 relative ">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30 relative z-10">
            <div className="text-right mb-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl uppercase text-[#ffff00] font-bold drop-shadow-[0_0_10px_rgba(255,255,0,0.5)] bg-clip-text">
                DESARROLLO DE MARCA
              </h2>
              <p className="text-right text-lg sm:text-xl text-gray-300 mt-4 font-medium">
                Las bases de un correcto proceso
              </p>
              <p className="text-right text-sm sm:text-base text-gray-400 mt-4 max-w-3xl ml-auto leading-relaxed">
                Enfocamos el complejo desarrollo de una adecuada implementación en todos los medios diseñando un modelo de brandbook con todas las especificaciones a un nivel competitivo.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-8">
              {/* Libreta: ocupa 2 filas en md+ */}
              <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-rotate-1 md:col-span-2 md:row-span-2 bg-white/5 backdrop-blur-sm border border-white/10">
                <img
                  src={IMG_LIBRETAS}
                  alt="Mockup Libreta Payrolling Tech"
                  className="w-full h-64 sm:h-80 lg:h-96 object-contain p-4"
                  loading="lazy"
                />
              </div>

              {/* Brandbook abierto */}
              <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:rotate-1 md:col-start-3 md:row-start-1 bg-white/5 backdrop-blur-sm border border-white/10">
                <img
                  src={IMG_HANDS}
                  alt="Fotografía manos sujetando"
                  className="w-full h-48 sm:h-56 md:h-40 lg:h-48 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Gorra */}
              <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-rotate-1 md:col-start-3 md:row-start-2 bg-white/5 backdrop-blur-sm border border-white/10">
                <img
                  src={IMG_GORRA}
                  alt="Mockup Gorra Payrolling Tech"
                  className="w-full h-48 sm:h-56 md:h-40 lg:h-48 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Desarrollo Web */}
      <div
        ref={webRef}
        className={`transition-all duration-700 ease-out ${
          webInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="relative w-full aspect-[16/9] group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <img
                src={IMG_DESARROLLO_WEB}
                alt="Mockup Desarrollo Web"
                className="relative w-full h-full object-contain rounded-2xl drop-shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20">
                <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl text-white">
                  <span className="block font-semibold leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    DESARROLLO
                  </span>
                  <span className="block font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    WEB
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Branding */}
      <div
        ref={brandingRef}
        className={`transition-all duration-700 ease-out ${
          brandingInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  BRANDING
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  Definimos la esencia, valores y promesa única de tu empresa,
                  alineado a una propuesta de valor poderosa.
                </p>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  La estrategia de la aplicación en materiales impresos y
                  Branding es fundamental para un posicionamiento adecuado frente
                  al consumidor. Nosotros facilitamos el enfoque.
                </p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-110 hover:rotate-3 bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                  <img
                    src={IMG_GORRA}
                    alt="Gorra con branding Payrolling Tech"
                    className="max-w-xs sm:max-w-sm w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:-rotate-2 bg-white/5 backdrop-blur-sm border border-white/10 p-4">
                <img
                  src={IMG_CAMISA}
                  alt="Playera con branding Payrolling Tech"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:rotate-2 bg-white/5 backdrop-blur-sm border border-white/10 p-4">
                <img
                  src={IMG_BOTELLA}
                  alt="Botella con branding Payrolling Tech"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Redes Sociales */}
      <div
        ref={redesRef}
        className={`transition-all duration-700 ease-out ${
          redesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 ease-out hover:scale-105 hover:rotate-1 flex justify-center md:justify-start bg-white/5 backdrop-blur-sm border border-white/10 p-6">
                <img
                  src={IMG_CAMPANAS}
                  alt="Mockup publicación de Instagram en móvil"
                  className="w-full sm:w-60 md:w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-6 md:pt-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                  REDES SOCIALES
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                  La gestión estratégica de redes sociales es clave para lograr
                  posicionar tu marca y generar leads calificados.
                </p>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  En Quantum logramos activar la presencia en las principales
                  redes mediante la gestión estratégica de estas, la correcta
                  segmentación de audiencias y generación de contenido relevante.
                  ¡Transforma seguidores en embajadores y datos en ventas!
                </p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 transform transition-all duration-500 hover:scale-105">
              <img
                src={IMG_CAMPANAS_DIG}
                alt="Reporte mensual de redes sociales (Facebook e Instagram)"
                className="w-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Carrusel de Tips */}
      <div
        ref={tipsRef}
        className={`transition-all duration-700 ease-out ${
          tipsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 backdrop-blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
            </div>
            <Carousel />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Proyecto;