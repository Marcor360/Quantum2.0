// src/pages/Servicios.tsx
import { useLayoutEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLang, type Lang } from "../i18n/lang";
import { formatMoney } from "../config/currency";

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

type CardKey = "branding" | "marketing" | "appia" | "ecommerce";

const CARD_ASSETS: Record<
    CardKey,
    {
        desktopSrc: string;
        mobileSrc: string;
        path: string;
    }
> = {
    branding: {
        desktopSrc: "/img/branding.webp",
        mobileSrc: "/img/branding-mobile.webp",
        path: "/servicios/branding",
    },
    marketing: {
        desktopSrc: "/img/campañas.webp",
        mobileSrc: "/img/campañas-mobiles.webp",
        path: "/servicios/campañas",
    },
    appia: {
        desktopSrc: "/img/appsIA.webp",
        mobileSrc: "/img/appsIA-mobile.webp",
        path: "/servicios/app-e-ia",
    },
    ecommerce: {
        desktopSrc: "/img/e-commerce.webp",
        mobileSrc: "/img/e-commerce-mobile.webp",
        path: "/servicios/ecomerce",
    },
};

const COPY: Record<
    Lang,
    {
        heroEyebrow: string;
        heroTitle: string;
        heroDesc1: string;
        heroDesc2: string;

        servicesAria: string;
        pricingAria: string;

        cardTitles: Record<CardKey, string>;

        plans: {
            emprende: { title: string; cta: string; perks: string[] };
            completa: { title: string; cta: string; perks: string[] };
            startup: { title: string; cta: string; perks: string[] };
        };
    }
> = {
    es: {
        heroEyebrow: "S E R V I C I O S",
        heroTitle: "IMPULSA TU CRECIMIENTO",
        heroDesc1: "Diseñamos estrategias que convierten usuarios en clientes. Conectamos creatividad, tecnología y resultados.",
        heroDesc2: "Conoce nuestros servicios",

        servicesAria: "Servicios",
        pricingAria: "Opciones de agencia",

        cardTitles: {
            branding: "BRANDING",
            marketing: "MARKETING DIGITAL",
            appia: "APP E IA",
            ecommerce: "E-COMMERCE",
        },

        plans: {
            emprende: {
                title: "Agencia emprende",
                cta: "ME INTERESA",
                perks: [
                    "Identidad de Marca con elementos visuales básicos",
                    "Creación y diseño de un sitio web adaptable",
                    "Posicionamiento SEO",
                    "Estrategia de marketing digital personalizada (Redes Sociales, Ads, etc.)",
                    "1 Modificación cada mes",
                ],
            },
            completa: {
                title: "Agencia completa",
                cta: "ME INTERESA",
                perks: [
                    "Identidad de Marca + Manual de Nuevas identidades",
                    "Desarrollo completo de sitio web (Backend y Frontend + Hosting)",
                    "Posicionamiento SEO + Pauta Publicitaria (Meta business + Google ads)",
                    "Estrategia de Marketing Digital (Redes Sociales, Ads, etc.)",
                    "4 Modificaciones cada mes",
                ],
            },
            startup: {
                title: "Agencia startup",
                cta: "ME INTERESA",
                perks: [
                    "Identidad de Marca + Manual de Marca",
                    "Creación y diseño de sitio web adaptable + Hosting",
                    "Posicionamiento SEO + Pauta Publicitaria (Meta Business o Google Ads)",
                    "Estrategia de marketing digital (Redes Sociales, Ads, etc.)",
                    "3 Modificaciones cada mes",
                ],
            },
        },
    },
    en: {
        heroEyebrow: "S E R V I C E S",
        heroTitle: "BOOST YOUR GROWTH",
        heroDesc1: "We design strategies that turn users into customers. We connect creativity, technology, and measurable results.",
        heroDesc2: "Explore our services",

        servicesAria: "Services",
        pricingAria: "Agency options",

        cardTitles: {
            branding: "BRANDING",
            marketing: "DIGITAL MARKETING",
            appia: "APPS & A.I.",
            ecommerce: "E-COMMERCE",
        },

        plans: {
            emprende: {
                title: "Starter agency",
                cta: "I’M INTERESTED",
                perks: [
                    "Brand identity with basic visual elements",
                    "Responsive website design and build",
                    "SEO positioning",
                    "Custom digital marketing strategy (Social, Ads, etc.)",
                    "1 update each month",
                ],
            },
            completa: {
                title: "Full-service agency",
                cta: "I’M INTERESTED",
                perks: [
                    "Brand identity + expanded identity manual",
                    "Full website development (Backend + Frontend + Hosting)",
                    "SEO + paid ads (Meta Business + Google Ads)",
                    "Digital marketing strategy (Social, Ads, etc.)",
                    "4 updates each month",
                ],
            },
            startup: {
                title: "Startup agency",
                cta: "I’M INTERESTED",
                perks: [
                    "Brand identity + brand manual",
                    "Responsive website + Hosting",
                    "SEO + paid ads (Meta Business or Google Ads)",
                    "Digital marketing strategy (Social, Ads, etc.)",
                    "3 updates each month",
                ],
            },
        },
    },
};

export default function Servicios() {
    const [lang] = useLang();
    const t = useMemo(() => COPY[lang], [lang]);

    const sectionRef = useRef<HTMLElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    const cards = useMemo(
        () =>
            (Object.keys(CARD_ASSETS) as CardKey[]).map((key) => ({
                key,
                title: t.cardTitles[key],
                ...CARD_ASSETS[key],
            })),
        [t]
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

                gsap.set(items, { autoAlpha: 0, y: 36 });
                gsap.set(items[0], { autoAlpha: 1, y: 0 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: () => `top top+=${getHeaderH()}`,
                        end: () => `+=${window.innerHeight * (items.length + 1) * 0.9}`,
                        pin: pin,
                        pinSpacing: true,
                        pinReparent: true,
                        scrub: 0.45,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                items.forEach((_, i) => {
                    if (i === 0) return;
                    tl.to(items[i - 1], { autoAlpha: 0, y: -28, duration: 0.25, ease: "power1.out" }, i - 1).fromTo(
                        items[i],
                        { autoAlpha: 0, y: 28 },
                        { autoAlpha: 1, y: 0, duration: 0.25, ease: "power1.out" },
                        i - 1
                    );
                });

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

    const Price = ({ valueMXN }: { valueMXN: number }) => {
        const [lang] = useLang();
        const { amount, suffix } = formatMoney(valueMXN, lang);

        return (
            <div className="ServiciosPricing__priceBlock">
                <p className="ServiciosPricing__price">${amount}</p>
                <span className="ServiciosPricing__currency">{suffix}</span>
            </div>
        );
    };

    const PerksList = ({ items }: { items: string[] }) => (
        <ul className="ServiciosPricing__perks">
            {items.map((perk) => (
                <li key={perk}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                <h2>{t.heroEyebrow}</h2>
                <h1>{t.heroTitle}</h1>
                <p>{t.heroDesc1}</p>
                <p>{t.heroDesc2}</p>
            </section>

            {/* ====== SECCIÓN STICKY ====== */}
            <section ref={sectionRef} className="ServiciosCards" aria-label={t.servicesAria}>
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

            {/* ====== PRICING ====== */}
            <section className="ServiciosPricing" aria-label={t.pricingAria}>
                <div className="ServiciosPricing__grid">
                    <article className="ServiciosPricing__card ServiciosPricing__card--emprende">
                        <div className="ServiciosPricing__cardInner">
                            <h3 className="ServiciosPricing__subtitle">{t.plans.emprende.title}</h3>
                            <Price valueMXN={3898} />
                            <PerksList items={t.plans.emprende.perks} />
                            <button className="ServiciosPricing__cta">{t.plans.emprende.cta}</button>
                        </div>
                    </article>

                    <article className="ServiciosPricing__card ServiciosPricing__card--completa">
                        <div className="ServiciosPricing__cardInner">
                            <h3 className="ServiciosPricing__subtitle">{t.plans.completa.title}</h3>
                            <Price valueMXN={32500} />
                            <PerksList items={t.plans.completa.perks} />
                            <button className="ServiciosPricing__cta">{t.plans.completa.cta}</button>
                        </div>
                    </article>

                    <article className="ServiciosPricing__card ServiciosPricing__card--startup">
                        <div className="ServiciosPricing__cardInner">
                            <h3 className="ServiciosPricing__subtitle">{t.plans.startup.title}</h3>
                            <Price valueMXN={19500} />
                            <PerksList items={t.plans.startup.perks} />
                            <button className="ServiciosPricing__cta">{t.plans.startup.cta}</button>
                        </div>
                    </article>
                </div>
            </section>

            <Footer />
        </>
    );
}