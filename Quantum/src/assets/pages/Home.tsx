import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type CSSProperties, useRef } from "react"
import Header from "../components/Header"

type ServiceCard = {
    id: string
    label: string
    title: string
    description: string
    href: string
    accent: string
    overlay: string
    desktopImage: string
    mobileImage?: string
    minHeight?: string
}

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SERVICE_CARDS: ServiceCard[] = [
    {
        id: "branding",
        label: "BRANDING",
        title: "Branding",
        description: "Creamos ADN estratégico para tu marca, elevamos reconocimiento y fidelizamos audiencias.",
        href: "/servicios#branding",
        accent: "#d7ff00",
        overlay: "linear-gradient(135deg, rgba(3, 3, 3, 0.72), rgba(8, 8, 8, 0.82))",
        desktopImage: "/img/branding.webp",
        mobileImage: "/img/branding-mobile.webp",
        minHeight: "36rem",
    },
    {
        id: "ecommerce",
        label: "E - COMMERCE",
        title: "E-commerce",
        description: "Operamos canales digitales para crecer ticket, tráfico y recompra con procesos precisos.",
        href: "/servicios#ecommerce",
        accent: "#ff4d4d",
        overlay: "linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.78))",
        desktopImage: "/img/e-commerce.webp",
        mobileImage: "/img/e-commerce-mobile.webp",
        minHeight: "36rem",
    },
    {
        id: "apps",
        label: "APPS & I.A",
        title: "Apps & I.A",
        description: "Diseñamos experiencias móviles y flujos con I.A. aplicada para crear hábitos y eficiencia.",
        href: "/servicios#apps-ia",
        accent: "#5b3ae6",
        overlay: "linear-gradient(160deg, rgba(8, 6, 20, 0.35), rgba(8, 6, 20, 0.75))",
        desktopImage: "/img/appsIA.webp",
        mobileImage: "/img/appsIA-mobile.webp",
        minHeight: "32rem",
    },
    {
        id: "campanas",
        label: "CAMPAÑAS",
        title: "Campañas",
        description: "Creatividad accionable: campañas full-funnel con narrativa, performance y optimización continua.",
        href: "/servicios#campanas",
        accent: "#b687ff",
        overlay: "linear-gradient(200deg, rgba(13, 7, 24, 0.52), rgba(8, 6, 12, 0.86))",
        desktopImage: "/img/campan~as.webp",
        mobileImage: "/img/campan~as-mobiles.webp",
        minHeight: "32rem",
    },
]

export default function Home() {
    const scope = useRef<HTMLElement | null>(null)

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

            if (prefersReducedMotion) {
                gsap.set("[data-animate]", { opacity: 1, y: 0 })
                gsap.set("[data-animate-card]", { opacity: 1, y: 0 })
                return
            }

            gsap.fromTo(
                "[data-animate]",
                { opacity: 0, y: 18 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.1 },
            )

            gsap.from("[data-animate-card]", {
                opacity: 0,
                y: 22,
                duration: 1,
                ease: "power2.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: ".quantum-services",
                    start: "top 78%",
                },
            })
        },
        { scope },
    )

    return (
        <main className="home-hero" ref={scope}>
            <Header />

            <section className="quantum-hero" aria-labelledby="quantum-title">
                <div className="quantum-hero__identifier" data-animate>
                    <img
                        className="quantum-hero__logo"
                        src="/svg/Logo-text.svg"
                        alt="Quantum"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div className="quantum-hero__statement">
                    <span className="quantum-hero__prefix" data-animate>
                        es
                    </span>
                    <h1 className="quantum-hero__headline" id="quantum-title" data-animate>
                        estrategia,
                    </h1>
                </div>

            </section>

            <section className="quantum-services" id="servicios" aria-label="Servicios principales">
                <div className="quantum-grid">
                    {SERVICE_CARDS.map((card) => (
                        <a
                            key={card.id}
                            className={`quantum-card quantum-card--${card.id}`}
                            href={card.href}
                            aria-label={`Ir a ${card.title}`}
                            data-animate-card
                            style={
                                {
                                    "--card-accent": card.accent,
                                    "--card-overlay": card.overlay,
                                    "--card-image-desktop": `url(${card.desktopImage})`,
                                    "--card-image-mobile": card.mobileImage ? `url(${card.mobileImage})` : undefined,
                                    "--card-min-height": card.minHeight,
                                } as CSSProperties
                            }
                        >
                            <span className="quantum-card__bg" aria-hidden="true" />
                            <span className="quantum-card__overlay" aria-hidden="true" />

                            <span className="quantum-card__badge">
                                {card.label}
                                <span className="quantum-card__arrow" aria-hidden="true">
                                    →
                                </span>
                            </span>

                            <div className="quantum-card__content">
                                <h3 className="quantum-card__title">{card.title}</h3>
                                <p className="quantum-card__desc">{card.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </main>
    )
}
