import Header from "../components/Header"

const ROTATING_WORDS = ["estrategia,", "precisión,", "resultados."]

export default function Home() {
    return (
        <main className="home-hero">
            <Header />

            <section className="home-hero__content">
                <div className="home-hero__brand">
                    <img
                        className="home-hero__brand-mark"
                        src="/svg/Logo.svg"
                        alt="Quantum"
                        loading="lazy"
                    />
                    <p className="home-hero__brand-name" aria-hidden="true">
                        quantum
                    </p>
                </div>

                <div className="home-hero__headline" aria-live="polite">
                    <span className="home-hero__headline-prefix">es</span>
                    <div className="home-hero__headline-rotator">
                        {ROTATING_WORDS.map((word, index) => (
                            <span
                                key={word}
                                className="home-hero__headline-word"
                                style={{ animationDelay: `${index * 3}s` }}
                            >
                                {word}
                            </span>
                        ))}
                    </div>
                </div>

                <p className="home-hero__lead">
                    Estrategia y tecnología que impulsan tu negocio con precisión creativa.
                </p>
                <a className="home-hero__cta" href="#contacto">
                    ¿Deseas un diagnóstico sin costo de tu modelo actual?
                </a>
            </section>
        </main>
    )
}
