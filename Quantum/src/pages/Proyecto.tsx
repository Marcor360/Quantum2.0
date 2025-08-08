import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { proyectos } from '../data/proyectos'

export default function Proyecto(): React.JSX.Element {
  const [hovered, setHovered] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <>
      {/* Variables CSS definidas en el JSX */}
      <style>{`
        :root {
          --color-electrico-amarillo: #ffff00;
          --color-uva:             #753bd0;
          --color-electrico-rosa:  #ff6ef3;
          --color-crema:           #fff2ec;
        }
      `}</style>

      <section className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[1500px] mx-auto flex flex-col md:flex-row items-start md:items-stretch gap-8">
          {/* Bloque de texto */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              PROYECTOS
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white mb-2 font-bold">
              Algunos proyectos y empresas en los que he colaborado:
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white">
              Desarrollo web, soluciones de nómina, IA y comercio local. Cada uno un reto y aprendizaje distintos.
            </p>
          </div>

          {/* Grid responsivo de proyectos */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {proyectos.map((proy) => (
              <div
                key={proy.nombre}
                className={`
                  flex items-center justify-center
                  ${proy.color}
                  h-32 sm:h-40 md:h-48 lg:h-60
                  text-black text-center
                  font-black
                  text-lg sm:text-2xl md:text-3xl lg:text-4xl
                  transition-transform duration-300
                  hover:scale-105 hover:shadow-lg
                  rounded
                  cursor-pointer
                  select-none
                  bg-cover bg-center
                `}
                style={hovered === proy.slug ? { backgroundImage: `url(${proy.imagen})` } : undefined}
                onMouseEnter={() => setHovered(proy.slug)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate(`/proyecto/${proy.slug}`)}
              >
                {proy.nombre}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}