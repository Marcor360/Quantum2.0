import React, { useState } from "react";
import useInView from "../components/useInView.tsx";

// Assets
import IMG_BOTELLA from "/Proyectos/BotellaProyecto.webp";
import IMG_CAMISA from "/Proyectos/CamisaProyect3.webp";
import IMG_CAMPANAS from "/Proyectos/Campañas.webp";
import IMG_CAMPANAS_DIG from "/Proyectos/CampañasDigitales.webp";
import IMG_HANDS from "/Proyectos/Hands-Holding-copy.webp";
const IMG_LIBRETAS = "/Proyectos/Libretas.webp";
const IMG_GORRA = "/Proyectos/Gorra.webp";
const IMG_DESARROLLO_WEB = "/Proyectos/Desarollo-web.webp";

interface Slide {
  img: string;
  text: string;
  bg: string;
}

const slides: Slide[] = [
  { img: IMG_HANDS, text: "Tip 1: Crea contenido atractivo", bg: "bg-[#753bd0]" },
  { img: IMG_CAMPANAS_DIG, text: "Tip 2: Mantén una línea gráfica", bg: "bg-white" },
  { img: IMG_CAMISA, text: "Tip 3: Publica constantemente", bg: "bg-pink-100" },
];

const Carousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative h-80 sm:h-96">
        {slides.map((s, i) => (
          <div
            key={s.text}
            className={`absolute inset-0 w-full h-full ${s.bg} flex items-center justify-center transition-opacity duration-500 ${index === i ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={s.img}
              alt={s.text}
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              loading="lazy"
            />
            <p className="relative z-10 text-lg md:text-xl font-bold text-center text-black px-4">
              {s.text}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2"
      >
        &#8249;
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2"
      >
        &#8250;
      </button>
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
        className={`transition-all duration-700 ease-out ${marcaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 "
          }`}
      >
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-30">
            <h2 className="text-right text-3xl sm:text-4xl font-bold uppercase">
              DESARROLLO DE MARCA
            </h2>
            <p className="text-right text-sm sm:text-base text-gray-200 mt-2">
              Las bases de un correcto proceso
            </p>
            <p className="text-right text-sm sm:text-base text-gray-200 mt-2">
              Enfocamos el complejo desarrollo de una adecuada implementación en todos los medios diseñando un modelo de brandbook con todas las especificaciones a un nivel competitivo.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
              {/* Libreta: ocupa 2 filas en md+ */}
              <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out hover:scale-105 md:col-span-2 md:row-span-2">
                <img
                  src={IMG_LIBRETAS}
                  alt="Mockup Libreta Payrolling Tech"
                  className="w-full h-64 sm:h-80 lg:h-96 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Brandbook abierto */}
              <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out md:col-start-3 md:row-start-1">
                <img
                  src={IMG_HANDS}
                  alt="Fotografía manos sujetando"
                  className="w-full h-48 sm:h-56 md:h-40 lg:h-48 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Gorra */}
              <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out md:col-start-3 md:row-start-2">
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
        className={`transition-all duration-700 ease-out ${webInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full aspect-[16/9]">
              <img
                src={IMG_DESARROLLO_WEB}
                alt="Mockup Desarrollo Web"
                className="absolute inset-0 w-full h-full object-contain rounded-xl drop-shadow-2xl"
                loading="lazy"
              />
              <h2
                className={`
                  absolute bottom-2 right-2
                  md:bottom-4 md:right-4
                  text-sm sm:text-base md:text-lg lg:text-xl xl:text-3xl
                  text-black
                  px-1.5 sm:px-2 md:px-4
                  py-0.5 sm:py-0.5 md:py-2
                  rounded
                `}
              >
                <span className="block font-semibold leading-tight">
                  DESARROLLO
                </span>
                <span
                  className={`
                    block font-bold
                    text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl
                  `}
                >
                  WEB
                </span>
              </h2>
            </div>
          </div>
        </section>
      </div>

      {/* Branding */}
      <div
        ref={brandingRef}
        className={`transition-all duration-700 ease-out ${brandingInView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
          }`}
      >
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase">
                  BRANDING
                </h2>
                <p className="mt-4 text-lg text-gray-200 max-w-lg">
                  Definimos la esencia, valores y promesa única de tu empresa,
                  alineado a una propuesta de valor poderosa.
                </p>
                <p className="mt-2 text-sm text-gray-200 max-w-lg">
                  La estrategia de la aplicación en materiales impresos y
                  Branding es fundamental para un posicionamiento adecuado frente
                  al consumidor. Nosotros facilitamos el enfoque.
                </p>
              </div>
              <div className="flex justify-end">
                <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out hover:scale-105">
                  <img
                    src={IMG_GORRA}
                    alt="Gorra con branding Payrolling Tech"
                    className="max-w-xs sm:max-w-sm w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out hover:scale-105">
                <img
                  src={IMG_CAMISA}
                  alt="Playera con branding Payrolling Tech"
                  className="w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out hover:scale-105">
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
        className={`transition-all duration-700 ease-out ${redesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="overflow-hidden rounded-lg shadow-lg transform transition duration-300 ease-out hover:scale-105 flex justify-center md:justify-start">
                <img
                  src={IMG_CAMPANAS}
                  alt="Mockup publicación de Instagram en móvil"
                  className="w-full sm:w-60 md:w-full object-contain"
                  loading="lazy"
                />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold uppercase mb-4">
                  REDES SOCIALES
                </h2>
                <p className="text-lg text-gray-200 mb-2">
                  La gestión estratégica de redes sociales es clave para lograr
                  posicionar tu marca y generar leads calificados.
                </p>
                <p className="text-base text-gray-200">
                  En Quantum logramos activar la presencia en las principales
                  redes mediante la gestión estratégica de estas, la correcta
                  segmentación de audiencias y generación de contenido relevante.
                  ¡Transforma seguidores en embajadores y datos en ventas!
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
        className={`transition-all duration-700 ease-out ${tipsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Carousel />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Proyecto;
