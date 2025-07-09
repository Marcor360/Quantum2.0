import React, { useState, useEffect } from 'react';
import Q360B from '/Q360.webp';
import Q360MV from '/Q360-Mobile.webp';

// Componente reutilizable para cada sección con título y contenido
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <article className="space-y-2">
    <h2 className="text-xl font-bold">{title}</h2>
    <div className="text-base">{children}</div>
  </article>
);

const Quantum: React.FC = () => {
  // Listado de pilares estratégicos para renderizar dinámicamente
  const pillars = [
    'DATA-DRIVEN',
    'CENTRADO EN EL CLIENTE',
    'TRANSFORMACIÓN OPERATIVA',
    'NUEVOS CANALES COMERCIALES',
  ];

  // Estado para la imagen de fondo según ancho de pantalla
  const [bgImage, setBgImage] = useState<string>(Q360B);

  useEffect(() => {
    const updateBg = () => {
      // breakpoint md de Tailwind es 768px
      setBgImage(window.innerWidth < 768 ? Q360MV : Q360B);
    };
    updateBg();
    window.addEventListener('resize', updateBg);
    return () => window.removeEventListener('resize', updateBg);
  }, []);

  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center px-4 py-8 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Capa semitransparente opcional para mejorar contraste */}
      <div className="absolute inset-0 bg-black/15" />

      <section className="relative z-10 max-w-3xl text-amber-50 space-y-8 p-6">
        <Section title="METODOLOGÍAS UNIVERSALES 360°">
          <p>Transformación Comercial Basada en Datos y Agilidad Estratégica</p>
        </Section>

        <Section title="¿QUÉ RESUELVE?">
          <p>
            El 89% de las empresas fallan al adaptar sus modelos de valor a mercados volátiles
            por falta de integración sinérgica entre datos, cliente, agilidad y flexibilidad.
          </p>
        </Section>

        <Section title="¿CÓMO LO RESOLVEMOS?">
          <p>
            Con una metodología probada que convierte información en crecimiento tangible mediante 4
            pilares estratégicos interconectados:
          </p>
          <ul className="list-disc list-inside space-y-1">
            {pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </Section>

        <Section title="RESULTADOS MEDIBLES">
          <p>KPI, Tasa de Conversión, Ingreso de nuevos clientes, Costo de ventas, Margen</p>
        </Section>

        <Section title="¿POR QUÉ ES REVOLUCIONARIO?">
          <ul className="list-decimal list-inside space-y-1">
            <li>
              <strong>Ciencia, no intuición:</strong> Basado en 11 herramientas analíticas estandarizadas
              (FODA, PESTEL, 5 Fuerzas, Value Prop Canvas, etc.).
            </li>
            <li>
              <strong>Agilidad implantada:</strong> Ciclos de 4-6 semanas desde diagnóstico a implementación.
            </li>
            <li>
              <strong>Sinergia brutal:</strong> Los 4 pilares operan como cadena: Datos → Personalización →
              Velocidad → Adaptación.
            </li>
          </ul>
        </Section>

        <blockquote className="border-l-4 border-pink-500 pl-4 italic text-cyan-300">
          “Con QUANTUM 360° redefinimos las reglas de tu juego.”
        </blockquote>

        <Section title="SIGUIENTE PASO">
          <p>¿Deseas un diagnóstico sin costo de tu modelo actual? Contáctanos.</p>
          <a
            href="#contacto"
            className="mt-4 inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
          >
            Descubre cómo funciona
          </a>
        </Section>
      </section>
    </main>
  );
};

export default Quantum;
