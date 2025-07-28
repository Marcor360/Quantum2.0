import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  twinkle: number;
}

const NotFoundPage: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.5 + 0.1,
          twinkle: Math.random() * 2 + 1,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#191514] text-white font-subjectivity">
      {/* Campo de estrellas animado */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.twinkle}s ease-in-out infinite alternate, float ${star.speed * 20}s linear infinite`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Nebulosa de fondo interactiva */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, #753bd0 0%, #ff6ef3 25%, transparent 70%)`,
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-6 lg:p-8">

        {/* Planeta perdido animado */}
        <div className="relative mb-8 sm:mb-12">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto mb-8">
            {/* Planeta */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#753bd0] to-[#ff6ef3] animate-spin-slow shadow-2xl">
              <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-[#191514] to-transparent opacity-60" />
            </div>

            {/* Anillos orbitales */}
            <div className="absolute inset-0 rounded-full border-2 border-[#ffff00] opacity-60 animate-ping"
              style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-4 rounded-full border border-[#ff6ef3] opacity-40 animate-pulse"
              style={{ animationDuration: '4s' }} />
            <div className="absolute -inset-8 rounded-full border border-[#753bd0] opacity-30 animate-pulse"
              style={{ animationDuration: '5s' }} />
          </div>
        </div>

        {/* Título 404 con efecto glitch */}
        <div className="relative mb-6 sm:mb-8">
          <h1 className="text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff6ef3] via-[#ffff00] to-[#753bd0] animate-pulse select-none">
            404
          </h1>
          {/* Efecto glitch */}
          <h1 className="absolute inset-0 text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black text-[#ff6ef3] opacity-30 animate-glitch">
            404
          </h1>
          <h1 className="absolute inset-0 text-6xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black text-[#ffff00] opacity-20 animate-glitch-2">
            404
          </h1>
        </div>

        {/* Mensaje principal */}
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#ffff00] animate-fadeInUp opacity-0"
            style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            Perdido en el Espacio Digital
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 animate-fadeInUp opacity-0 px-4"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
            Esta página se ha desintegrado en las profundidades del cosmos digital.
            <br className="hidden sm:block" />
            Los fragmentos de datos flotan eternamente entre las estrellas.
          </p>
        </div>

        {/* Botones de navegación espacial */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fadeInUp opacity-0 w-full max-w-md mb-8 sm:mb-12"
          style={{ animationDelay: '1.1s', animationFillMode: 'forwards' }}>

          <Link
            to="/"
            className="group relative flex-1 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#ff6ef3] to-[#753bd0] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#ff6ef3]/50 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              🚀 Regresar a la Base
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#753bd0] to-[#ffff00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group relative flex-1 px-6 py-3 sm:px-8 sm:py-4 border-2 border-[#ffff00] text-[#ffff00] font-bold rounded-full transition-all duration-300 hover:bg-[#ffff00] hover:text-[#191514] hover:scale-105 hover:shadow-lg hover:shadow-[#ffff00]/50 active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              ⬅️ Volver al Pasado
            </span>
          </button>
        </div>

        {/* Constelación interactiva */}
        <div className="relative mb-8 sm:mb-12 animate-fadeInUp opacity-0 w-full max-w-md"
          style={{ animationDelay: '1.4s', animationFillMode: 'forwards' }}>
          <svg
            viewBox="0 0 400 200"
            className="w-full h-32 sm:h-40 text-[#ff6ef3] hover:scale-110 transition-all duration-500 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Constelación principal */}
            <g className="animate-float">
              {/* Líneas de conexión */}
              <path d="M50 150 L150 50 L250 100 L350 40"
                fill="none" stroke="#753bd0" strokeWidth="2" opacity="0.6"
                className="animate-dash" strokeDasharray="5 5" />
              <path d="M150 50 L200 150 L300 120"
                fill="none" stroke="#ffff00" strokeWidth="2" opacity="0.4"
                className="animate-dash-reverse" strokeDasharray="3 7" />

              {/* Estrellas de la constelación */}
              <circle cx="50" cy="150" r="4" fill="#ff6ef3" className="animate-pulse" />
              <circle cx="150" cy="50" r="6" fill="#ffff00" className="animate-bounce-slow" />
              <circle cx="250" cy="100" r="5" fill="#753bd0" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
              <circle cx="350" cy="40" r="4" fill="#ff6ef3" className="animate-bounce-slow" style={{ animationDelay: '1s' }} />
              <circle cx="200" cy="150" r="3" fill="#ffff00" className="animate-pulse" style={{ animationDelay: '1.5s' }} />
              <circle cx="300" cy="120" r="4" fill="#753bd0" className="animate-bounce-slow" style={{ animationDelay: '2s' }} />
            </g>
          </svg>
        </div>

        {/* Mensaje de ayuda */}
        <div className="text-center animate-fadeInUp opacity-0"
          style={{ animationDelay: '1.7s', animationFillMode: 'forwards' }}>
          <p className="text-sm sm:text-base text-gray-400 mb-2">
            Transmisión desde el espacio profundo
          </p>
          <div className="flex items-center justify-center gap-2 text-[#753bd0]">
            <div className="w-2 h-2 bg-[#753bd0] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#ff6ef3] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-[#ffff00] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>

      {/* Meteoros ocasionales */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-1 h-20 bg-gradient-to-b from-[#ffff00] to-transparent rotate-45 animate-meteor"
          style={{ top: '10%', left: '20%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-16 bg-gradient-to-b from-[#ff6ef3] to-transparent rotate-45 animate-meteor"
          style={{ top: '60%', left: '80%', animationDelay: '5s' }} />
        <div className="absolute w-1 h-12 bg-gradient-to-b from-[#753bd0] to-transparent rotate-45 animate-meteor"
          style={{ top: '30%', left: '60%', animationDelay: '8s' }} />
      </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes twinkle {
          from { opacity: 0.3; }
          to { opacity: 1; }
        }

        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-100vh); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }

        @keyframes dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -40; }
        }

        @keyframes dash-reverse {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 40; }
        }

        @keyframes meteor {
          0% { opacity: 0; transform: translateX(-100px) translateY(-100px); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateX(300px) translateY(300px); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-glitch { animation: glitch 2s linear infinite; }
        .animate-glitch-2 { animation: glitch-2 2.1s linear infinite; }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out; }
        .animate-float { animation: float 8s ease-in-out infinite alternate; }
        .animate-dash { animation: dash 3s linear infinite; }
        .animate-dash-reverse { animation: dash-reverse 3s linear infinite; }
        .animate-meteor { animation: meteor 6s ease-in infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default NotFoundPage;