interface ProyectoItem {
  nombre: string
  color: string
}

const proyectos: ProyectoItem[] = [
  { nombre: 'Payrollig Tech', color: 'bg-yellow-300' },
  { nombre: 'Hotel Flor de Café', color: 'bg-red-300' },
  { nombre: 'AI Solutions', color: 'bg-orange-500' },
  { nombre: 'MercadoLocal', color: 'bg-purple-400' },
  { nombre: 'EcoAgro', color: 'bg-green-400' },
  { nombre: 'FastWeb', color: 'bg-blue-400' },
]

export default function Proyecto() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-[1500px] mx-auto flex flex-col md:flex-row items-start md:items-stretch gap-8">
        {/* Bloque de texto */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-black mb-4 sm:mb-6 leading-tight">
            PROYECTOS
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-black mb-2 font-bold">
            Algunos proyectos y empresas en los que he colaborado:
          </p>
          <p className="text-sm sm:text-base md:text-lg text-black">
            Desarrollo web, soluciones de nómina, IA y comercio local. Cada uno un reto y aprendizaje distintos.
          </p>
        </div>

        {/* Grid responsive */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {proyectos.map((proy) => (
            <div
              key={proy.nombre}
              className={`
                flex items-center justify-center
                ${proy.color}
                h-32 sm:h-40 md:h-48 lg:h-60
                text-black
                font-black
                text-lg sm:text-2xl md:text-3xl lg:text-4xl
                transition-transform duration-300
                hover:scale-105 hover:shadow-lg
                rounded
                cursor-pointer
                select-none
              `}
            >
              {proy.nombre}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
