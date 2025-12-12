import Header from "../components/Header"

export default function Home() {
    return (
        <main className="home-hero">
            <Header />

            <section className="home-hero__content">
                <p className="home-hero__eyebrow">El tiempo de Quantum es ahora</p>
                <h1 className="home-hero__title">
                    Quantum es <span>estrategia</span>,
                </h1>
                <p className="home-hero__lead">
                    Estrategia y tecnología que impulsan tu negocio con precisión creativa. Somos el
                    puente entre tus ideas y los resultados que puedes medir.
                </p>
                <a className="home-hero__cta" href="#contacto">
                    ¿Deseas un diagnóstico sin costo de tu modelo actual?
                </a>
            </section>
        </main>
    )
}
