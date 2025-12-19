import { useEffect, useRef, useState } from "react"
import Header from "../components/Header"

const ROTATING_WORDS = ["estrategia,", "precisión,", "resultados."]
const OVERLAY_LETTERS = ["Q", "U", "A", "N", "T", "U", "M"]

const SERVICES_PLACEHOLDERS = [
    { title: "Servicio 01", subtitle: "Espacio reservado", body: "Breve descripción pendiente para este servicio. Añade aquí el enfoque y el entregable principal." },
    { title: "Servicio 02", subtitle: "Espacio reservado", body: "Añade el nombre real del servicio y un statement corto que explique su impacto." },
    { title: "Servicio 03", subtitle: "Espacio reservado", body: "Texto de apoyo para este bloque. Ideal para resultados esperados o metodología." },
    { title: "Servicio 04", subtitle: "Espacio reservado", body: "Lugar para detallar la oferta. Incluye tipo de cliente objetivo o KPI clave." },
    { title: "Servicio 05", subtitle: "Espacio reservado", body: "Usa este espacio para beneficios o la promesa de valor principal del servicio." },
    { title: "Servicio 06", subtitle: "Espacio reservado", body: "Placeholder para un servicio futuro. Indica etapa, entregable o equipo involucrado." },
]

type UseInViewOptions = IntersectionObserverInit & { once?: boolean }

function useInView(options: UseInViewOptions = {}) {
    const { once = true, ...observerOptions } = options
    const ref = useRef<HTMLElement | null>(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const target = ref.current
        if (!target) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    if (once) observer.disconnect()
                } else if (!once) {
                    setIsInView(false)
                }
            },
            {
                root: observerOptions.root,
                rootMargin: observerOptions.rootMargin,
                threshold: observerOptions.threshold,
            },
        )

        observer.observe(target)
        return () => observer.disconnect()
    }, [observerOptions.root, observerOptions.rootMargin, observerOptions.threshold, once])

    return { ref, isInView }
}

export default function Home() {
    const { ref: videoRef, isInView: videoVisible } = useInView({ threshold: 0.35 })
    const { ref: messageRef, isInView: messageVisible } = useInView({ threshold: 0.55 })

    return (
        <main className="home-hero">
            <Header />

            <section className="home-hero__immersive">
                <div className="home-hero__intro-rail">
                    <div className="home-hero__brand">
                        <img
                            className="home-hero__brand-mark"
                            src="/svg/Logo-text.svg"
                            alt="Quantum"
                            loading="lazy"
                        />
                        <p className="home-hero__brand-note">Desplaza para entrar al modo video.</p>
                    </div>
                    <div className="home-hero__scroll-cue" aria-hidden="true">
                        <span className="home-hero__scroll-dot" />
                        <span className="home-hero__scroll-line" />
                        <span>scroll</span>
                    </div>
                </div>

                <div className="home-hero__scroll-stage">
                    <div className={`home-hero__video-stage ${videoVisible ? "is-visible" : ""}`} ref={videoRef}>
                        <video
                            className="home-hero__video"
                            src="/video/quantum-showreel.mp4"
                            poster="/svg/Logo-Amarillo.svg"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <div className="home-hero__video-sheen" />
                        <div className="home-hero__word-stack" aria-hidden="true">
                            {OVERLAY_LETTERS.map((letter, index) => (
                                <span
                                    key={letter + index}
                                    className={`home-hero__overlay-letter ${videoVisible ? "is-visible" : ""}`}
                                    style={{ transitionDelay: `${index * 90}ms` }}
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="home-hero__message-wrap" ref={messageRef}>
                        <div className={`home-hero__message ${messageVisible ? "is-visible" : ""}`}>
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
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-services" id="servicios" aria-labelledby="servicios-title">
                <div className="home-services__header">
                    <p className="eyebrow">Servicios</p>
                    <div>
                        <h2 id="servicios-title">Capas de servicio en progreso</h2>
                        <p className="home-services__lead">
                            Bloques reservados para detallar la oferta completa. Usa estos espacios para titular,
                            describir y priorizar entregables clave.
                        </p>
                    </div>
                </div>

                <div className="home-services__grid">
                    {SERVICES_PLACEHOLDERS.map((service) => (
                        <article key={service.title} className="home-services__card">
                            <header>
                                <p className="home-services__badge">{service.title}</p>
                                <h3>{service.subtitle}</h3>
                            </header>
                            <p className="home-services__body">{service.body}</p>
                            <div className="home-services__meta">
                                <span>Espacio para bullets</span>
                                <span>Tiempo / entregable</span>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}
