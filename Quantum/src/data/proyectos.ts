export interface ProyectoItem {
    nombre: string;
    color: string;
    imagen: string;
    slug: string;
}

export const proyectos: ProyectoItem[] = [
    {
        nombre: 'Payrollig Tech',
        color: 'bg-[var(--color-electrico-amarillo)]',
        imagen: '/Proyectos/SliderPayrolling-1.webp',
        slug: 'payrolling-tech'
    },
    {
        nombre: 'Hotel Flor de Café',
        color: 'bg-[var(--color-crema)]',
        imagen: '/Proyectos/Campañas.webp',
        slug: 'hotel-flor-de-cafe'
    },
    {
        nombre: 'AI Solutions',
        color: 'bg-[var(--color-electrico-rosa)]',
        imagen: '/Proyectos/Desarollo-web.webp',
        slug: 'ai-solutions'
    },
    {
        nombre: 'MercadoLocal',
        color: 'bg-[var(--color-electrico-rosa)]',
        imagen: '/Proyectos/Gorra.webp',
        slug: 'mercadolocal'
    },
    {
        nombre: 'EcoAgro',
        color: 'bg-[var(--color-uva)]',
        imagen: '/Proyectos/BotellaProyecto.webp',
        slug: 'ecoagro'
    },
    {
        nombre: 'FastWeb',
        color: 'bg-[var(--color-electrico-amarillo)]',
        imagen: '/Proyectos/CampañasDigitales.webp',
        slug: 'fastweb'
    }
];