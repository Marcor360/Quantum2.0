// src/pages/Servicios.tsx
import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import cardBg1 from "../assets/svg/Servicios/Tarjeta 1 fondo.svg";
import cardBg2 from "../assets/svg/Servicios/tarjeta 2 fondo.svg";
import cardBg3 from "../assets/svg/Servicios/Tarjeta 3 fondo.svg";
import cardStar from "../assets/svg/Servicios/Asterisco_tarjetas.svg";

gsap.registerPlugin(ScrollTrigger);

type Card = {
    key: string;
    title: string;
    desktopSrc: string;
    mobileSrc: string;
};

type Plan = {
    key: string;
    title: string;
    price: string;
    currency: string;
    perks: string[];
    bg: string;
    highlight?: boolean;
};

function getHeaderH(): number {
    if (typeof window === "undefined") return 96;
    const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--header-h")
        .trim();
    const n = parseInt(raw.replace("px", ""), 10);
    return Number.isFinite(n) ? n : 96;
}

export default function Servicios() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);

    const cards = useMemo<Card[]>(
        () => [
            {
                key: "apps-ia",
                title: "APPS & I.A",
                desktopSrc: "/img/appsIA.webp",
                mobileSrc: "/img/appsIA-mobile.webp",
            },
            {
                key: "branding",
                title: "BRANDING",
                desktopSrc: "/img/branding.webp",
                mobileSrc: "/img/branding-mobile.webp",
            },
            {
                key: "campanas",
                title: "CAMPAÑAS",
                desktopSrc: "/img/campañas.webp",
                mobileSrc: "/img/campañas-mobiles.webp",
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

    const plans = useMemo<Plan[]>(
        () => [
            {
                key: "emprende",
                title: "Agencia emprende",
                price: "$ 2,999",
                currency: "MXN",
                perks: [
                    "10% de descuento en todos nuestros servicios.",
                    "1 cuenta de plan esencial (cada mes con la renovación de tu membresía, acumulables para usar en cuentas nuevas).",
                ],
                bg: cardBg3,
            },
            {
                key: "completa",
                title: "Agencia completa",
                price: "$ 25,000",
                currency: "MXN",
                perks: [
                    "25% de descuento en todos nuestros servicios.",
                    "Agente inteligencia artificial.",
                    "Sitio web de tu agencia con tienda en línea (Tienda básica).",
                    "3 cuentas de plan indispensable (2 redes sociales) reutilizables una única vez (las puedes utilizar cuando gustes).",
                    "Diseño de logotipo para tu agencia.",
                    "30 USD de inversión mensual para campaña publicitaria por 3 meses.",
                ],
                bg: cardBg2,
                highlight: true,
            },
            {
                key: "startup",
                title: "Agencia startup",
                price: "$ 15,000",
                currency: "MXN",
                perks: [
                    "15% de descuento en todos nuestros servicios.",
                    "5 cuentas de plan esencial (una red social) para cuentas nuevas.",
                    "Diseño de logotipo para tu agencia o marca.",
                ],
                bg: cardBg1,
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

        const PIN_GAP = 16; // separación bajo header
        const TRAVEL_DESKTOP = 90; // px (movimiento vertical en transiciones)
        const TRAVEL_MOBILE = 60; // px
        const HOLD = 0.65; // “tiempo” de lectura por tarjeta (en unidades del timeline)
        const TRANS = 0.75; // transición entre tarjetas (en unidades del timeline)
        const SCROLL_FACTOR = 0.9; // multiplica vh para convertir timeline->scroll

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    isDesktop: "(min-width: 769px)",
                    isMobile: "(max-width: 768px)",
                },
                (context: gsap.Context) => {
                    const isMobile = !!context.conditions?.isMobile;
                    const travel = isMobile ? TRAVEL_MOBILE : TRAVEL_DESKTOP;

                    const cardEls = gsap.utils.toArray<HTMLElement>(".ServiciosCards__card");
                    if (cardEls.length <= 1) return;

                    // Estado inicial
                    gsap.set(cardEls, { autoAlpha: 0, y: travel, scale: 0.985 });
                    gsap.set(cardEls[0], { autoAlpha: 1, y: 0, scale: 1 });

                    const tl = gsap.timeline({ defaults: { ease: "none" } });

                    for (let i = 0; i < cardEls.length - 1; i++) {
                        const curr = cardEls[i];
                        const next = cardEls[i + 1];

                        // hold
                        tl.to({}, { duration: HOLD });

                        // transición: curr sale arriba, next entra desde abajo
                        tl.to(
                            curr,
                            { autoAlpha: 0, y: -travel, scale: 0.99, duration: TRANS },
                            "<"
                        );
                        tl.fromTo(
                            next,
                            { autoAlpha: 0, y: travel, scale: 0.985 },
                            { autoAlpha: 1, y: 0, scale: 1, duration: TRANS },
                            "<"
                        );
                    }

                    // hold final
                    tl.to({}, { duration: HOLD });

                    ScrollTrigger.create({
                        animation: tl,
                        trigger: section,
                        pin: pin,
                        start: () => `top top+=${getHeaderH() + PIN_GAP}`,
                        end: () => {
                            // mapeo: duración timeline -> scroll (vh)
                            const px = tl.duration() * window.innerHeight * SCROLL_FACTOR;
                            return `+=${Math.max(1, Math.floor(px))}`;
                        },
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    });

                    // refresca cuando cargan imágenes (evita cálculos malos)
                    requestAnimationFrame(() => ScrollTrigger.refresh());

                    return () => {
                        mm.kill();
                    };
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

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

                                <div className="ServiciosCards__label" aria-hidden="true">
                                    {c.title}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== PRECIOS ====== */}
            <section className="ServiciosPricing" aria-labelledby="precios-title">
                <div className="ServiciosPricing__head">
                    <p className="ServiciosPricing__eyebrow">Consulta nuestros planes</p>
                    <h2 id="precios-title">Precios</h2>
                </div>

                <div className="ServiciosPricing__grid">
                    {plans.map((plan) => (
                        <article
                            key={plan.key}
                            className={`ServiciosPricing__card ${plan.highlight ? "is-highlight" : ""}`}
                            style={{ backgroundImage: `url(${plan.bg})` }}
                        >
                            <div className="ServiciosPricing__cardInner">
                                <p className="ServiciosPricing__subtitle">{plan.title}</p>

                                <div className="ServiciosPricing__priceBlock">
                                    <span className="ServiciosPricing__price">{plan.price}</span>
                                    <span className="ServiciosPricing__currency">{plan.currency}</span>
                                </div>

                                <ul className="ServiciosPricing__perks">
                                    {plan.perks.map((perk) => (
                                        <li key={perk}>
                                            <img src={cardStar} alt="" aria-hidden="true" />
                                            <span>{perk}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button type="button" className="ServiciosPricing__cta">Me interesa</button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
