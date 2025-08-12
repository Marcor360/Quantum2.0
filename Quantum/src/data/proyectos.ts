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
        imagen: '/Proyecto/Payrolling.webp',
        slug: 'payrolling-tech'
    },
    {
        nombre: 'Hotel Flor de Café',
        color: 'bg-[var(--color-crema)]',
        imagen: '/Proyecto/CasaFlorDeCafe.webp',
        slug: 'hotel-flor-de-cafe'
    }
];