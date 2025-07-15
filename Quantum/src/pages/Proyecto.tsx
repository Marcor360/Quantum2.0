// src/components/Proyectos.tsx
import React from "react";

interface Project {
  id: number;
  title: string;
  description?: string;
  // Controla si mostramos título/descr. debajo de las imágenes
  showInfo: boolean;
  // Clases Tailwind específicas para el contenedor de imágenes
  containerClasses: string;
  // Cada imagen con sus propias utilidades (posición, rotación, sombra...)
  images: {
    src: string;
    alt: string;
    classes?: string;
  }[];
}

const proyectos: Project[] = [
  {
    id: 1,
    title: "DESARROLLO WEB",
    showInfo: true,
    containerClasses:
      "relative h-72 md:h-96 flex items-center justify-center overflow-visible bg-white",
    images: [
      {
        src: "/Proyectos/Proyects2.webp",
        alt: "Mockup Web principal",
        classes:
          "relative z-20 max-w-[65%] object-contain transform -rotate-3 drop-shadow-2xl",
      },
      {
        src: "/Proyectos/desarrollo-web-2.png",
        alt: "Mockup Web secundario",
        classes:
          "absolute top-4 left-4 z-10 max-w-[65%] object-contain transform rotate-3 drop-shadow-2xl",
      },
    ],
  },
  {
    id: 2,
    title: "BRANDING",
    description: "Sin límites ni restricciones.",
    showInfo: true,
    containerClasses:
      "flex flex-wrap items-center justify-center gap-4 bg-white p-6",
    images: [
      {
        src: "/Proyectos/Proyects3.webp",
        alt: "Gorra branding",
        classes: "w-1/3 object-contain",
      },
      {
        src: "/Proyectos/CamisaProyect3.webp",
        alt: "Camiseta branding",
        classes: "w-1/3 object-contain",
      },
      {
        src: "/Proyectos/BotellaProyecto.webp",
        alt: "Botella branding",
        classes: "w-1/3 object-contain",
      },
    ],
  },
  {
    id: 3,
    title: "",
    showInfo: false,
    containerClasses: "bg-white",
    images: [
      {
        src: "/Proyectos/CampañasDigitales.webp",
        alt: "Campañas Digitales",
        classes: "w-full object-contain",
      },
    ],
  },
  {
    id: 4,
    title: "",
    showInfo: false,
    containerClasses:
      "flex flex-col items-center justify-center bg-white p-4 space-y-4",
    images: [
      {
        src: "/Proyectos/facebook-metrics.png",
        alt: "Métricas Facebook",
        classes: "w-full object-contain",
      },
      {
        src: "/Proyectos/instagram-metrics.png",
        alt: "Métricas Instagram",
        classes: "w-full object-contain",
      },
    ],
  },
];

const Proyectos: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-purple-800 to-purple-900 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {proyectos.map(
          ({
            id,
            title,
            description,
            showInfo,
            containerClasses,
            images,
          }) => (
            <article
              key={id}
              className="rounded-lg shadow-lg overflow-hidden"
            >
              {/* Imágenes */}
              <div className={containerClasses}>
                {images.map(({ src, alt, classes }, i) => (
                  <img key={i} src={src} alt={alt} className={classes} />
                ))}
              </div>

              {/* Título / Descripción SOLO para id 1 y 2 */}
              {showInfo && (
                <div className="px-6 py-4 bg-white">
                  <h3 className="text-2xl font-bold uppercase">
                    {title}
                  </h3>
                  {description && (
                    <p className="mt-2 text-gray-600">{description}</p>
                  )}
                </div>
              )}
            </article>
          )
        )}
      </div>
    </section>
  );
};

export default Proyectos;
