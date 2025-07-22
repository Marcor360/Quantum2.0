import React, { useState } from "react";

// Assets
import IMG_BOTELLA from "/Proyectos/BotellaProyecto.webp";
import IMG_CAMISA from "/Proyectos/CamisaProyect3.webp";
import IMG_CAMPANAS from "/Proyectos/Campañas.webp";
import IMG_CAMPANAS_DIG from "/Proyectos/CampañasDigitales.webp";
import IMG_HANDS from "/Proyectos/Hands-Holding-copy.webp";
const IMG_LIBRETAS = "/Proyectos/Libretas.webp";
const IMG_GORRA = "/Proyectos/Gorra.webp";
const IMG_DESARROLLO_WEB = "/Proyectos/Desarollo-web.webp"

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
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.text} className={`w-full flex-shrink-0 h-80 sm:h-96 ${s.bg} flex items-center justify-center relative`}>
            <img src={s.img} alt={s.text} className="absolute inset-0 w-full h-full object-cover opacity-70" />
            <p className="relative z-10 text-lg md:text-xl font-bold text-center text-black px-4">{s.text}</p>
          </div>
        ))}
      </div>
      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2">&#8249;</button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2">&#8250;</button>
    </div>
  );
};

const Proyecto: React.FC = () => {
  return (
    <main className="font-subjectivity text-white">
      {/* Desarrollo de Marca */}
      <section >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-right text-3xl sm:text-4xl font-bold uppercase">DESARROLLO DE MARCA</h2>
          <p className="text-right text-sm sm:text-base mt-2">Las bases de un correcto proceso</p>
          <p className="text-right text-sm sm:text-base mt-2">Enfocamos el complejo desarrollo de una adecuada implementación en todos los medios diseñando un modelo de brandbook con todas las especificaciones a un nivel competitivo.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <img src={IMG_CAMPANAS} alt="Brochure" className="rounded-lg shadow-lg object-contain w-full h-64" />
            <div className="space-y-6">
              <img src={IMG_HANDS} alt="Fotografía" className="rounded-lg shadow-lg object-cover w-full h-64 mix-blend-multiply" />
              <img src={IMG_GORRA} alt="Ilustración" className="rounded-lg shadow-lg object-cover w-full h-64" />
            </div>
            <img src={IMG_LIBRETAS} alt="Infografía" className="rounded-lg shadow-lg object-cover w-full h-64" />
          </div>
        </div>
      </section>

      {/* Desarrollo Web */}
      <section className="text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold uppercase mb-8">DESARROLLO WEB</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-6 items-center justify-center">
            <img src={IMG_DESARROLLO_WEB} alt="Sitio 1" className="rounded-xl drop-shadow-2xl w-full md:w-1/3 object-contain" />
          </div>
        </div>
      </section>

      {/* Branding */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold uppercase text-white">BRANDING</h2>
          <p className="max-w-lg mx-auto mt-2 text-base text-white font-medium">Definimos la esencia, valores y promesa única de tu empresa, alineado a una propuesta de valor poderosa.</p>
          <p className="max-w-lg mx-auto mt-2 text-sm text-white">La estrategia de la aplicación en materiales impresos y Branding es fundamental para un posicionamiento adecuado frente al consumidor. Nosotros facilitamos el enfoque.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            <img src={IMG_CAMISA} alt="Camisa" className="rounded-lg shadow-lg object-cover" />
            <img src={IMG_BOTELLA} alt="Botella" className="rounded-lg shadow-lg object-cover" />
            <img src={IMG_LIBRETAS} alt="Gafete" className="rounded-lg shadow-lg object-cover" />
            <img src={IMG_GORRA} alt="Gorra" className="rounded-lg shadow-lg object-cover" />
          </div>
        </div>
      </section>

      {/* Redes Sociales */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold uppercase text-white">REDES SOCIALES</h2>
            <p className="text-sm leading-relaxed mt-4 text-white">La gestión estratégica de redes sociales es clave para lograr posicionar tu marca y generar leads calificados.</p>
            <p className="text-sm leading-relaxed mt-4 text-white">En Quantum logramos activar la presencia en las principales redes mediante la gestión estratégica de estas, la correcta segmentación de audiencias y generación de contenido relevante. ¡Transforma seguidores en embajadores y datos en ventas!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <img src={IMG_CAMPANAS} alt="campañas" />
            </div>
          </div>
          <div className="flex justify-center">
            <img src={IMG_CAMPANAS_DIG} alt="Post" className="rounded-lg shadow-lg w-72" />
          </div>
        </div>
      </section>

      {/* Carrusel de Tips */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Carousel />
        </div>
      </section>
    </main>
  );
};

export default Proyecto;
