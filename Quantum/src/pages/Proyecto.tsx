// src/components/Proyectos.tsx
import React from "react";

/* =========================================================================
   TODO: Reemplaza las rutas de imágenes por las tuyas
   ======================================================================= */
import IMG_BRANDING_COVER from "/Proyectos/Hands-Holding-copy.webp";          // Libro cerrado morado
import IMG_BRANDING_SPREAD from "/Proyectos/Hands-Holding-copy.webp";        // Doble página abierta
import IMG_BRANDING_GUIDE  from "/Proyectos/Hands-Holding-copy.webp";         // Guía gráfica amarilla/púrimport
import IMG_WEB_MAIN   from "/Proyectos/Hands-Holding-copy.webp";                   // Mockup principal (monitor / sitio)
import IMG_WEB_LAYER1 from "/Proyectos/Hands-Holding-copy.webp";             // Pantalla 1
import IMG_WEB_LAYER2 from "/Proyectos/Hands-Holding-copy.webp";             // Pantalla 2 (opcional)

/* =========================================================================
   Componente BrandingBlock
   ======================================================================= */
function BrandingBlock() {
  return (
    <div
      id="branding-block"
      className="relative w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
    >
      {/* Collage de imágenes */}
      <div className="relative md:col-span-7 h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px]">
        {/* Libro cerrado */}
        <img
          src={IMG_BRANDING_COVER}
          alt="Manual de marca cerrado"
          loading="lazy"
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[55%] sm:w-[50%] md:w-[60%] max-w-xs md:max-w-sm lg:max-w-md drop-shadow-2xl rotate-[0.5deg]"
        />

        {/* Doble página abierta */}
        <img
          src={IMG_BRANDING_SPREAD}
          alt="Manual de marca abierto"
          loading="lazy"
          className="absolute bottom-2 left-[10%] w-[48%] sm:w-[42%] md:w-[45%] max-w-sm drop-shadow-2xl -rotate-2"
        />

        {/* Guía gráfica / assets */}
        <img
          src={IMG_BRANDING_GUIDE}
          alt="Guía gráfica de apoyo"
          loading="lazy"
          className="absolute bottom-[15%] right-[5%] w-[42%] sm:w-[38%] md:w-[40%] max-w-sm drop-shadow-2xl rotate-2"
        />
      </div>

      {/* Texto */}
      <div className="md:col-span-5 flex flex-col justify-start md:justify-center text-left px-2 md:px-0">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white leading-tight">
          Desarrollo <br className="hidden sm:block" /> de Marca
        </h2>
        <p className="mt-2 text-base sm:text-lg text-gray-300 font-light">
          Las bases de un correcto proceso
        </p>
        <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-prose">
          Enfocamos el complejo desarrollo de una adecuada implementación en
          todos los medios, diseñando un método de branding con todas las
          especificaciones a un nivel competitivo.
        </p>
      </div>
    </div>
  );
}

/* =========================================================================
   Componente WebBlock
   ======================================================================= */
function WebBlock() {
  return (
    <div
      id="web-block"
      className="relative w-full max-w-7xl mx-auto mt-24 md:mt-32"
    >
      {/* Collage */}
      <div className="relative mx-auto w-full max-w-5xl h-[380px] sm:h-[460px] md:h-[520px] lg:h-[600px] flex items-center justify-center">
        {/* Capa base (monitor / mockup grande) */}
        <img
          src={IMG_WEB_MAIN}
          alt="Desarrollo web principal"
          loading="lazy"
          className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl"
        />

        {/* Pantalla flotante izquierda */}
        <img
          src={IMG_WEB_LAYER1}
          alt="Vista secundaria de sitio"
          loading="lazy"
          className="absolute z-20 -top-4 -left-2 sm:-top-6 sm:-left-6 w-[55%] sm:w-[50%] md:w-[48%] object-contain drop-shadow-2xl -rotate-2"
        />

        {/* Pantalla flotante derecha (opcional) */}
        <img
          src={IMG_WEB_LAYER2}
          alt="Vista adicional de sitio"
          loading="lazy"
          className="absolute z-20 top-[18%] -right-2 sm:-right-6 w-[48%] sm:w-[44%] md:w-[42%] object-contain drop-shadow-2xl rotate-2"
        />
      </div>

      {/* Etiqueta inferior derecha */}
      <div className="mt-6 md:mt-8 text-right pr-2 sm:pr-4">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase text-white tracking-wide">
          Desarrollo Web
        </span>
      </div>
    </div>
  );
}

/* =========================================================================
   Componente principal Proyectos
   ======================================================================= */
const Proyectos: React.FC = () => {
  return (
    <section
      id="proyectos"
      aria-label="Proyectos destacados"
      className="relative w-full bg-black py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="space-y-24 md:space-y-40">
        <BrandingBlock />
        <WebBlock />
      </div>
    </section>
  );
};

export default Proyectos;
