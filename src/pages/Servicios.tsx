import { useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./servicios.css";

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
                path: "/servicios/branding",
            },
            {
                key: "marketing",
                title: "MARKETING DIGITAL",
                desktopSrc: "/img/campañas.webp",
                mobileSrc: "/img/campañas-mobiles.webp",
                path: "/servicios/campañas",
            },
            {
                key: "seo",
                title: "APP E IA",
                desktopSrc: "/img/appsIA.webp",
                mobileSrc: "/img/appsIA-mobile.webp",
                path: "/servicios/campañas",
            },
            {
                key: "ecommerce",
                title: "E-COMMERCE",
                desktopSrc: "/img/e-commerce.webp",
                mobileSrc: "/img/e-commerce-mobile.webp",
                path: "/servicios/ecomerce",
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

            // DESKTOP
            mm.add("(min-width: 769px)", () => {
                const items = gsap.utils.toArray<HTMLElement>(".ServiciosCards__card", pin);
                if (!items.length) return;

                // Estado inicial
                gsap.set(items, { autoAlpha: 0, y: 60 });
                gsap.set(items[0], { autoAlpha: 1, y: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: () => `top top+=${getHeaderH()}`, // ✅ respeta header sticky
                        end: () => `+=${window.innerHeight * (items.length + 1) * 1.2}`,
                        pin: pin,
                        pinSpacing: true,
                        pinReparent: true, // ✅ ayuda si hay parents raros (overflow/transform)
                        scrub: 0.9,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,

                        // Si tu layout global tiene transforms y sigue fallando, descomenta:
                        // pinType: "transform",
                    },
                });

                // Transiciones card por card
                items.forEach((_, i) => {
                    if (i === 0) return;

                    tl.to(items[i - 1], { autoAlpha: 0, y: -60, duration: 0.35 }, i - 1).fromTo(
                        items[i],
                        { autoAlpha: 0, y: 60 },
                        { autoAlpha: 1, y: 0, duration: 0.35 },
                        i - 1
                    );
                });

                // Refresh cuando carguen imágenes (clave para pins estables)
                const imgs = Array.from(pin.querySelectorAll("img"));
                const onLoad = () => ScrollTrigger.refresh();

                imgs.forEach((img) => {
                    if (!img.complete) img.addEventListener("load", onLoad, { once: true });
                });

                requestAnimationFrame(() => ScrollTrigger.refresh());

                return () => {
                    imgs.forEach((img) => img.removeEventListener("load", onLoad));
                };
            });

            // MOBILE: sin pin (scroll normal)
            mm.add("(max-width: 768px)", () => {
                const items = gsap.utils.toArray<HTMLElement>(".ServiciosCards__card", pin);
                gsap.set(items, { clearProps: "all" });
            });

            return () => mm.revert();
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
                            <Link key={c.key} to={c.path} className="ServiciosCards__card">
                                <picture className="ServiciosCards__media">
                                    <source media="(max-width: 768px)" srcSet={c.mobileSrc} />
                                    <img src={c.desktopSrc} alt={c.title} loading="lazy" decoding="async" />
                                </picture>

                                <div className="ServiciosCards__shade" aria-hidden="true" />

                                <p className="ServiciosCards__label">{c.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== SECCIÓN DE PRICING ====== */}
            <section className="ServiciosPricing" aria-label="Opciones de agencia">
                <div className="ServiciosPricing__grid">
                    <article className="ServiciosPricing__card ServiciosPricing__card--emprende">
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