import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Asterisco from "../assets/svg/Branding/ASTERISCO.svg";

gsap.registerPlugin(ScrollTrigger);

/**
 * Helper: calcula la altura del header para offset top del pin
 */
function getHeaderH(): number {
    if (typeof document === "undefined") return 0;
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue("--header-h").trim();
    return parseFloat(val) || 0;
}

export default function Servicios() {
    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    const cards = useMemo(
        () => [
            {
                key: "branding",
                title: "BRANDING",
                desktopSrc: "/img/branding.webp",
                mobileSrc: "/img/branding-mobile.webp",
            },
            {
                key: "marketing",
                title: "MARKETING DIGITAL",
                desktopSrc: "/img/campañas.webp",
                mobileSrc: "/img/campañas-mobiles.webp",
            },
            {
                key: "social",
                title: "SOCIAL ADS",
                desktopSrc: "/img/campañas.webp",
                mobileSrc: "/img/campañas-mobiles.webp",
            },
            {
                key: "web",
                title: "WEB & APPS",
                desktopSrc: "/img/appsIA.webp",
                mobileSrc: "/img/appsIA-mobile.webp",
            },
            {
                key: "seo",
                title: "SEO",
                desktopSrc: "/img/appsIA.webp",
                mobileSrc: "/img/appsIA-mobile.webp",
            },
            {
                key: "ecommerce",
                title: "E-COMMERCE",
                desktopSrc: "/img/e-commerce.webp",
                mobileSrc: "/img/e-commerce-mobile.webp",
            },
        ],
        []
    );

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const pin = pinRef.current;
        if (!section || !pin) return;

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    isDesktop: "(min-width: 769px)",
                    isMobile: "(max-width: 768px)",
                },
                (context: gsap.Context) => {
                    const isDesktop = !!context.conditions?.isDesktop;
                    const cardEls = gsap.utils.toArray<HTMLElement>(".ServiciosCards__card");

                    if (cardEls.length <= 1) return;

                    if (isDesktop) {
                        // DESKTOP: Pin + transiciones suaves con snap
                        const STEP_PX = Math.max(window.innerHeight * 0.95, 700);

                        // Estado inicial: solo primera card visible
                        gsap.set(cardEls, { autoAlpha: 0, scale: 0.985 });
                        gsap.set(cardEls[0], { autoAlpha: 1, scale: 1 });

                        const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

                        // Crear transiciones 1 por 1
                        for (let i = 0; i < cardEls.length - 1; i++) {
                            const curr = cardEls[i];
                            const next = cardEls[i + 1];

                            // Fade out actual, fade in siguiente (sin movimiento vertical)
                            tl.to(curr, { autoAlpha: 0, scale: 0.985, duration: 0.6 }, i);
                            tl.fromTo(
                                next,
                                { autoAlpha: 0, scale: 0.985 },
                                { autoAlpha: 1, scale: 1, duration: 0.6 },
                                i
                            );
                        }

                        // AGREGADO: Paso extra para "congelar" la última imagen antes de des-anclar
                        // Lo insertamos en el tiempo (cardEls.length - 1) para que dure 1 unidad completa hasta el final
                        tl.to({}, { duration: 1 }, cardEls.length - 1);

                        ScrollTrigger.create({
                            animation: tl,
                            trigger: section,
                            pin: pin,
                            start: () => `top top+=${getHeaderH() + 16}`,
                            // Aumentamos la distancia para incluir el "hold" final (cardEls.length en vez de length-1)
                            end: () => `+=${cardEls.length * STEP_PX}`,
                            scrub: 1.4,
                            snap: {
                                // Ajustamos el snap para considerar el paso extra
                                snapTo: 1 / cardEls.length,
                                duration: { min: 0.15, max: 0.6 },
                                ease: "power1.inOut",
                            },
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                        });

                        // Refresh después de que carguen imágenes
                        requestAnimationFrame(() => ScrollTrigger.refresh());
                    } else {
                        // MOBILE: limpiar props, scroll normal
                        gsap.set(cardEls, { clearProps: "all" });
                    }

                    return () => {
                        mm.kill();
                    };
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const PerksList = ({ items }: { items: string[] }) => (
        <ul className="ServiciosPricing__perks">
            {items.map((perk) => (
                <li key={perk}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>{perk}</span>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <Header />

            <section className="Servicios-hero">
                <h2>S E R V I C I O S</h2>
                <h1>IMPULSA TU CRECIMIENTO</h1>
                <p>
                    Diseñamos estrategias que convierten usuarios en clientes. Conectamos
                    creatividad, tecnología y resultados.
                </p>
                <p>Conoce nuestros servicios</p>
            </section>

            {/* ====== SECCIÓN NUEVA (sticky real tipo mock) ====== */}
            <section ref={sectionRef} className="ServiciosCards" aria-label="Servicios">
                <div className="ServiciosCards__wrap">
                    <div ref={pinRef} className="ServiciosCards__pin">
                        {cards.map((c) => (
                            <article key={c.key} className="ServiciosCards__card">
                                <picture className="ServiciosCards__media">
                                    <source media="(max-width: 768px)" srcSet={c.mobileSrc} />
                                    <img
                                        src={c.desktopSrc}
                                        alt={c.title}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </picture>

                                <div className="ServiciosCards__shade" aria-hidden="true" />

                                <p className="ServiciosCards__label">{c.title}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== SECCIÓN DE PRICING ====== */}
            <section className="ServiciosPricing" aria-label="Opciones de agencia">
                <div className="ServiciosPricing__grid">
                    <article className="ServiciosPricing__card ServiciosPricing__card--emprende">
                        <img
                            className="ServiciosPricing__asterisk ServiciosPricing__asterisk--bottom"
                            src={Asterisco}
                            alt=""
                            aria-hidden="true"
                        />
                        <div className="ServiciosPricing__cardInner">
                            <h3 className="ServiciosPricing__subtitle">Agencia emprende</h3>

                            <p className="ServiciosPricing__price">$3,898</p>

                            <PerksList
                                items={[
                                    "Identidad de Marca con elementos visuales básicos",
                                    "Creación y diseño de un sitio web adaptable",
                                    "Posicionamiento SEO",
                                    "Estrategia de marketing digital personalizada (Redes Sociales, Ads, etc.)",
                                    "1 Modificación cada mes",
                                ]}
                            />

                            <button className="ServiciosPricing__cta">ME INTERESA</button>
                        </div>
                    </article>

                    <article className="ServiciosPricing__card ServiciosPricing__card--completa">
                        <img
                            className="ServiciosPricing__asterisk ServiciosPricing__asterisk--bottom"
                            src={Asterisco}
                            alt=""
                            aria-hidden="true"
                        />
                        <div className="ServiciosPricing__cardInner">
                            <h3 className="ServiciosPricing__subtitle">Agencia completa</h3>

                            <p className="ServiciosPricing__price">$32,500</p>

                            <PerksList
                                items={[
                                    "Identidad de Marca + Manual de Nuevas identidades",
                                    "Desarrollo completo de sitio web (Backend y Frontend + Hosting)",
                                    "Posicionamiento SEO + Pauta Publicitaria (Meta business + Google ads)",
                                    "Estrategia de Marketing Digital (Redes Sociales, Ads, etc.)",
                                    "4 Modificaciones cada mes",
                                ]}
                            />

                            <button className="ServiciosPricing__cta">ME INTERESA</button>
                        </div>
                    </article>

                    <article className="ServiciosPricing__card ServiciosPricing__card--startup">
                        <img
                            className="ServiciosPricing__asterisk ServiciosPricing__asterisk--bottom"
                            src={Asterisco}
                            alt=""
                            aria-hidden="true"
                        />
                        <div className="ServiciosPricing__cardInner">
                            <h3 className="ServiciosPricing__subtitle">Agencia startup</h3>

                            <p className="ServiciosPricing__price">$19,500</p>

                            <PerksList
                                items={[
                                    "Identidad de Marca + Manual de Marca",
                                    "Creación y diseño de sitio web adaptable + Hosting",
                                    "Posicionamiento SEO + Pauta Publicitaria (Meta Business o Google Ads)",
                                    "Estrategia de marketing digital (Redes Sociales, Ads, etc.)",
                                    "3 Modificaciones cada mes",
                                ]}
                            />

                            <button className="ServiciosPricing__cta">ME INTERESA</button>
                        </div>
                    </article>
                </div>
            </section>
            <Footer />
        </>
    );
}
