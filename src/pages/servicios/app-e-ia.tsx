import { useLayoutEffect, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./app-ia.css";

// ===== Assets (src) =====
import AsteriscoSvg from "../../assets/svg/Branding/ASTERISCO.svg";
import BenefitsTitleSvg from "../../assets/svg/Branding/Beneficios y degradado.svg";

import BenefitCard01 from "../../assets/svg/Branding/Tarjeta Beneficio/1.svg";
import BenefitCard02 from "../../assets/svg/Branding/Tarjeta Beneficio/2.svg";
import BenefitCard03 from "../../assets/svg/Branding/Tarjeta Beneficio/3.svg";
import BenefitCard04 from "../../assets/svg/Branding/Tarjeta Beneficio/4.svg";
import ChatbotTitleSvg from "../../assets/svg/Titulos/serv/CHATBOT.svg";
import PricingBg from "../../assets/svg/Ecomerce/Desktop/Primera tabla ecommerce_1.svg";

// Pricing card backgrounds
import PricingCardBgDesktop from "../../assets/svg/Ecomerce/Desktop/tarjeta precios ecommerce.svg";
import PricingCardGreenDesktop from "../../assets/svg/Ecomerce/Desktop/Precios.svg";
import PricingCardYellowMobile from "../../assets/svg/Ecomerce/Mobile/tarjeta precio amarillo_mobile.svg";
import PricingCardMobile from "../../assets/svg/Ecomerce/Mobile/tarjeta precio ecommerce mobile.svg";

// ===== Assets (public) =====
const HERO_IMG = "/img/Chat_IA/Principal.webp";

gsap.registerPlugin(ScrollTrigger);

function getHeaderH(): number {
    if (typeof document === "undefined") return 96;
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue("--header-h").trim();
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 96;
}

type PricingPlan = {
    variant: "starter" | "growth" | "custom";
    title: string;
    price?: string;
    badge?: string;
    subtitle?: string;
    bullets: string[];
};

const pricingPlans: PricingPlan[] = [
    {
        variant: "starter",
        title: "STARTER I.A.",
        price: "$ 4,900",
        bullets: [
            "Configuración inicial Chatbot.",
            "Respuestas automatizadas inteligentes.",
            "Integración básica (WhatsApp / Web).",
        ],
    },
    {
        variant: "growth",
        title: "GROWTH I.A.",
        price: "$ 8,900",
        bullets: [
            "Diseño estratégico conversacional.",
            "Flujos de ventas automatizados.",
            "Integraciones CRM / Ecommerce.",
            "Optimización continua.",
        ],
    },
    {
        variant: "custom",
        title: "CUSTOM I.A.",
        badge: "Para Agencias",
        subtitle: "COTIZACIÓN PERSONALIZADA",
        bullets: [
            "Automatización avanzada",
            "Multi-canal",
            "IA entrenada con procesos internos",
            "Sistemas híbridos humano + IA",
        ],
    },
];

type Benefit = {
    id: number;
    image: string;
    title: string;
    copy: string;
    extraList?: string[];
    cta?: string;
};

const benefits: Benefit[] = [
    {
        id: 1,
        image: BenefitCard01,
        title: "ATENCIÓN 24/7",
        copy: "Responde automáticamente y evita perder clientes fuera de horario",
        extraList: [
            "Automatización avanzada.",
            "Multi-canal",
            "IA entrenada con procesos internos",
            "Sistemas híbridos humano + IA",
        ],
        cta: "CONTRATAR",
    },
    {
        id: 2,
        image: BenefitCard02,
        title: "CONVERSIÓN AUTOMATIZADA",
        copy: "Guía al usuario hacia acciones claras que generan resultados reales.",
    },
    {
        id: 3,
        image: BenefitCard03,
        title: "I.A. PERSONALIZADA",
        copy: "Respuestas alineadas con un tono, estilo y objetivos comerciales.",
    },
    {
        id: 4,
        image: BenefitCard04,
        title: "AUTOMATIZACIÓN FLUIDA",
        copy: "Optimiza procesos sin cambiar la forma en que ya trabajas.",
    },
];

export default function App() {
    const asterRef = useRef<HTMLImageElement | null>(null);

    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    // Asegura que al entrar a la página se haga scroll al inicio
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    // Asterisco girando (igual que Branding/Ecomerce)
    useLayoutEffect(() => {
        const el = asterRef.current;
        if (!el) return;

        const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reduce) return;

        const ctx = gsap.context(() => {
            gsap.set(el, { transformOrigin: "50% 50%" });
            gsap.to(el, { rotate: 360, duration: 18, ease: "none", repeat: -1 });
        });

        return () => ctx.revert();
    }, []);

    // Beneficios con pin/slide en desktop
    useLayoutEffect(() => {
        try {
            if (typeof window === "undefined" || typeof document === "undefined") return;

            const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
            if (reduce) return;

            const mm = gsap.matchMedia();

            const ctx = gsap.context(() => {
                mm.add("(min-width: 769px)", () => {
                    const sectionEl = benefitsRef.current;
                    const pinEl = pinRef.current;
                    const viewportEl = pinEl?.querySelector<HTMLElement>(".AppIABenefits__viewport");
                    const trackEl = trackRef.current;

                    if (!sectionEl || !pinEl || !viewportEl || !trackEl) return;

                    const slides = gsap.utils.toArray<HTMLElement>(".AppIABenefits__slide", trackEl);
                    if (slides.length < 2) return;

                    sectionEl.classList.add("is-enhanced");

                    gsap.set(slides, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: (i) => i,
                        autoAlpha: 1,
                        yPercent: 100,
                    });
                    gsap.set(slides[0], { yPercent: 0 });

                    requestAnimationFrame(() => ScrollTrigger.refresh());

                    const tl = gsap.timeline();
                    slides.forEach((_slide, i) => {
                        const label = `s${i}`;
                        tl.addLabel(label, i);
                        if (i < slides.length - 1) {
                            tl.fromTo(
                                slides[i + 1],
                                { yPercent: 100 },
                                { yPercent: 0, duration: 1, ease: "none" },
                                label
                            );
                        }
                    });

                    const headerOffset = Math.round(getHeaderH());
                    const STEP = () =>
                        Math.max(viewportEl.getBoundingClientRect().height || window.innerHeight * 0.75, 1);
                    const getEnd = () => STEP() * (slides.length + 1);

                    const st = ScrollTrigger.create({
                        trigger: sectionEl,
                        start: () => `top top+=${headerOffset}`,
                        end: () => `+=${getEnd()}`,
                        pin: pinEl,
                        pinSpacing: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        animation: tl,
                    });

                    const refresh = () => ScrollTrigger.refresh();
                    const raf = requestAnimationFrame(refresh);

                    let ro: ResizeObserver | null = null;
                    if (typeof ResizeObserver !== "undefined") {
                        ro = new ResizeObserver(() => requestAnimationFrame(refresh));
                        ro.observe(viewportEl);
                        ro.observe(pinEl);
                    }

                    const onLoad = () => refresh();
                    window.addEventListener("load", onLoad, { passive: true });
                    (document as any).fonts?.ready?.then(refresh).catch(() => { });

                    return () => {
                        window.removeEventListener("load", onLoad);
                        cancelAnimationFrame(raf);
                        ro?.disconnect();
                        st.kill();
                        tl.kill();
                        sectionEl.classList.remove("is-enhanced");
                    };
                });
            }, benefitsRef);

            return () => {
                mm.revert();
                ctx.revert();
            };
        } catch (err) {
            console.error("AppIA Benefits ScrollTrigger init failed", err);
        }
    }, []);

    return (
        <>
            <Head />

            <main className="AppIAPage">
                {/* HERO */}
                <section className="AppIAHero">
                    <div className="AppIAWrap">
                        <header className="AppIAHeroTop">
                            <img className="AppIAHeroTitleImg" src={ChatbotTitleSvg} alt="CHATBOT + I.A." />

                            <p className="AppIAHeroLead">
                                Diseñamos sistemas inteligentes de conversación
                                <br />
                                que venden y atienden por ti.
                            </p>

                            <Link className="AppIABtn" to="/contacto">
                                CONVERSEMOS
                            </Link>
                        </header>

                        <div className="AppIAHeroBottom">
                            <div className="AppIAHeroVisual" aria-hidden="true">
                                <img ref={asterRef} className="AppIAHeroAster" src={AsteriscoSvg} alt="" />
                                <img className="AppIAHeroImg" src={HERO_IMG} alt="" />
                            </div>

                            <div className="AppIAHeroCopy">
                                <p className="AppIAHeroCopyLead">
                                    En Quantum desarrollamos{" "}
                                    <span className="AppIATextYellow">sistemas inteligentes de conversación.</span>
                                </p>

                                <p>
                                    que automatizan la atención y convierten mensajes en oportunidades reales. No usamos bots genéricos;
                                    diseñamos experiencias alineadas con tu marca mediante estrategia, diseño de flujos, entrenamiento de
                                    IA e implementación personalizada para una comunicación eficiente y escalable.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section className="AppIAPricing">
                    <div className="AppIAWrap">
                        <h2 className="AppIAPricing__title">AUTOMATIZA Y CRECE SIN LÍMITES</h2>
                        <p className="AppIAPricing__subtitle">
                            <span>Implementación estratégica y personalizada</span> para que tu negocio automatice sin fricciones
                        </p>

                        <div className="AppIAPricing__wrapper">
                            <img src={PricingBg} alt="" className="AppIAPricing__BgFrame" aria-hidden="true" />

                            <div className="AppIAPricing__grid">
                                {pricingPlans.map((plan) => (
                                    <article key={plan.variant} className={`AppIAPricingCard AppIAPricingCard--${plan.variant}`}>
                                        {/* Background responsive por plan */}
                                        <picture className="AppIAPricingCard__bg">
                                            <source
                                                media="(max-width: 768px)"
                                                srcSet={plan.variant === "custom" ? PricingCardYellowMobile : PricingCardMobile}
                                            />
                                            <img
                                                src={plan.variant === "custom" ? PricingCardGreenDesktop : PricingCardBgDesktop}
                                                alt=""
                                                aria-hidden="true"
                                            />
                                        </picture>

                                        <div className="AppIAPricingCard__content">
                                            <div className="AppIAPricingCard__head">
                                                <h3 className="AppIAPricingCard__title">{plan.title}</h3>
                                                {plan.badge ? <span className="AppIAPricingCard__badge">{plan.badge}</span> : null}
                                            </div>

                                            <div className="AppIAPricingCard__mid">
                                                {plan.price ? (
                                                    <div className="AppIAPricingCard__price">
                                                        {plan.price} <small>MXN</small>
                                                    </div>
                                                ) : (
                                                    <div className="AppIAPricingCard__price AppIAPricingCard__price--custom">
                                                        {plan.subtitle}
                                                    </div>
                                                )}
                                            </div>

                                            <ul className="AppIAPricingCard__bullets">
                                                {plan.bullets.map((b) => (
                                                    <li key={b}>{b}</li>
                                                ))}
                                            </ul>

                                            <div className="AppIAPricingCard__action">
                                                <Link to="/contacto" className="AppIAPricingCard__btn">
                                                    CONTRATAR
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFICIOS */}
                <section className="AppIABenefits" ref={benefitsRef}>
                    <div className="AppIAWrap">
                        <div className="AppIABenefits__pin" ref={pinRef}>
                            <div className="AppIABenefits__left" aria-hidden="true">
                                <img className="AppIABenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                            </div>

                            <div className="AppIABenefits__viewport">
                                <div className="AppIABenefits__track" ref={trackRef}>
                                    {benefits.map((b) => (
                                        <div className="AppIABenefits__slide" key={b.id}>
                                            <article className="AppIABenefits__card" aria-label={`Beneficio ${b.id}`}>
                                                <img className="AppIABenefits__bg" src={b.image} alt="" />

                                                <div className={`AppIABenefits__copy ${b.id === 1 ? "is-primary" : ""}`}>
                                                    <h3 className="AppIABenefits__title">{b.title}</h3>
                                                    <p className="AppIABenefits__desc">{b.copy}</p>

                                                    {b.extraList ? (
                                                        <ul className="AppIABenefits__list">
                                                            {b.extraList.map((x) => (
                                                                <li key={x}>{x}</li>
                                                            ))}
                                                        </ul>
                                                    ) : null}

                                                    {b.cta ? (
                                                        <div className="AppIABenefits__cta">
                                                            <Link to="/contacto" className="AppIABenefits__btn">
                                                                {b.cta}
                                                            </Link>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </article>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}
