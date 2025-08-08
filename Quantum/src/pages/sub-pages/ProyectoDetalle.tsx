import React from 'react'
import { useParams } from 'react-router-dom'
import { proyectos } from '../../data/proyectos'

export default function ProyectoDetalle(): React.JSX.Element {
    const { slug } = useParams<{ slug: string }>()
    const proyecto = proyectos.find(p => p.slug === slug)

    if (!proyecto) {
        return (
            <section className="min-h-screen flex items-center justify-center text-white">
                Proyecto no encontrado
            </section>
        )
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center gap-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white text-center">
                    {proyecto.nombre}
                </h1>
                <div
                    className="w-full h-64 sm:h-80 md:h-96 bg-center bg-cover rounded"
                    style={{ backgroundImage: `url(${proyecto.imagen})` }}
                />
            </div>
        </section>
    )
}