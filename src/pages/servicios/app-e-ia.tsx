import { useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./app-ia.css";
import "../../app-ia-mobile.css";

import { useLang, type Lang } from "../../i18n/lang";
import { formatMoney } from "../../config/currency";


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
import PricingGreenDesktop from "../../assets/svg/Ecomerce/Desktop/Precios.svg";
import PricingCardYellowMobile from "../../assets/svg/Ecomerce/Mobile/tarjeta precio amarillo_mobile.svg";
import PricingCardMobile from "../../assets/svg/Ecomerce/Mobile/tarjeta precio ecommerce mobile.svg";

// ===== Assets (public) =====
const CHATBOT_IA_HERO_IMAGE_UNIQUE = "/img/Chat_IA/Principal.webp";

gsap.registerPlugin(ScrollTrigger);

const APP_IA_COPY: Record<Lang, any> = {
    es: {
        heroLead: <>Diseñamos sistemas inteligentes de conversación<br />que venden y atienden por ti.</>,
        heroBtn: "CONVERSEMOS",
        heroCopyLead: "En Quantum desarrollamos ",
        heroCopyHighlight: "sistemas inteligentes de conversación.",
        heroText: "que automatizan la atención y convierten mensajes en oportunidades reales. No usamos bots genéricos; diseñamos experiencias alineadas con tu marca mediante estrategia, diseño de flujos, entrenamiento de IA e implementación personalizada para una comunicación eficiente y escalable.",

        pricingTitle: "AUTOMATIZA Y CRECE SIN LÍMITES",
        pricingSubtitle: "Implementación estratégica y personalizada",
        pricingSubtitleRow: " para que tu negocio automatice sin fricciones",
        pricingBtn: "CONTRATAR",
        pricingBadgeAgencies: "Para Agencias",
        pricingCustomSubtitle: "COTIZACIÓN PERSONALIZADA",

        plans: [
            {
                variant: "starter",
                title: "STARTER I.A.",
                price: 4900,
                bullets: [
                    "Configuración inicial Chatbot.",
                    "Respuestas automatizadas inteligentes.",
                    "Integración básica (WhatsApp / Web).",
                ],
            },
            {
                variant: "growth",
                title: "GROWTH I.A.",
                price: 8900,
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
                bullets: [
                    "Automatización avanzada",
                    "Multi-canal",
                    "IA entrenada con procesos internos",
                    "Sistemas híbridos humano + IA",
                ],
            },
        ],
        benefits: [
            {
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
                title: "CONVERSIÓN AUTOMATIZADA",
                copy: "Guía al usuario hacia acciones claras que generan resultados reales.",
            },
            {
                title: "I.A. PERSONALIZADA",
                copy: "Respuestas alineadas con un tono, estilo y objetivos comerciales.",
            },
            {
                title: "AUTOMATIZACIÓN FLUIDA",
                copy: "Optimiza procesos sin cambiar la forma en que ya trabajas.",
            },
        ]
    },
    en: {
        heroLead: <>We design intelligent conversation systems<br />that sell and serve for you.</>,
        heroBtn: "LET'S TALK",
        heroCopyLead: "At Quantum, we develop ",
        heroCopyHighlight: "intelligent conversation systems.",
        heroText: "that automate service and convert messages into real opportunities. We don't use generic bots; we design experiences aligned with your brand through strategy, flow design, AI training, and custom implementation for efficient and scalable communication.",

        pricingTitle: "AUTOMATE AND GROW WITHOUT LIMITS",
        pricingSubtitle: "Strategic and personalized implementation",
        pricingSubtitleRow: " so your business automates without friction",
        pricingBtn: "GET STARTED",
        pricingBadgeAgencies: "For Agencies",
        pricingCustomSubtitle: "PERSONALIZED QUOTE",

        plans: [
            {
                variant: "starter",
                title: "STARTER A.I.",
                price: 4900,
                bullets: [
                    "Initial Chatbot configuration.",
                    "Intelligent automated responses.",
                    "Basic integration (WhatsApp / Web).",
                ],
            },
            {
                variant: "growth",
                title: "GROWTH A.I.",
                price: 8900,
                bullets: [
                    "Strategic conversational design.",
                    "Automated sales flows.",
                    "CRM / Ecommerce integrations.",
                    "Continuous optimization.",
                ],
            },
            {
                variant: "custom",
                title: "CUSTOM A.I.",
                bullets: [
                    "Advanced automation",
                    "Multi-channel",
                    "AI trained with internal processes",
                    "Hybrid human + AI systems",
                ],
            },
        ],
        benefits: [
            {
                title: "24/7 ATTENTION",
                copy: "Respond automatically and avoid losing customers after hours",
                extraList: [
                    "Advanced automation.",
                    "Multi-channel",
                    "AI trained with internal processes",
                    "Hybrid human + AI systems",
                ],
                cta: "GET STARTED",
            },
            {
                title: "AUTOMATED CONVERSION",
                copy: "Guide the user towards clear actions that generate real results.",
            },
            {
                title: "PERSONALIZED A.I.",
                copy: "Responses aligned with a tone, style, and commercial objectives.",
            },
            {
                title: "FLUID AUTOMATION",
                copy: "Optimize processes without changing the way you already work.",
            },
        ]
    }
};

function getHeaderH(): number {
    if (typeof document === "undefined") return 96;
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue("--header-h").trim();
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 96;
}


export default function App() {
    const [lang] = useLang();
    const t = useMemo(() => APP_IA_COPY[lang], [lang]);

    const asterRef = useRef<HTMLImageElement | null>(null);

    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const spacerRef = useRef<HTMLDivElement | null>(null);

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

                    // Spacer manual para evitar rebote de pinSpacing
                    let spacer = spacerRef.current;
                    if (!spacer) {
                        spacer = document.createElement("div");
                        spacer.className = "AppIABenefits__spacer";
                        spacerRef.current = spacer;
                        sectionEl.appendChild(spacer);
                    }

                    const slides = gsap.utils.toArray<HTMLElement>(".AppIABenefits__slide", trackEl);
                    const cards = gsap.utils.toArray<HTMLElement>(".AppIABenefits__card", trackEl);
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
                            tl.fromTo(slides[i + 1], { yPercent: 100 }, { yPercent: 0, duration: 1, ease: "none" }, label);
                        }
                    });

                    let activeIdx = -1;

                    const setActive = (idx: number) => {
                        if (idx === activeIdx) return;
                        activeIdx = idx;

                        slides.forEach((s, i) => {
                            const isOn = i === idx;
                            const card = cards[i];
                            s.classList.toggle("is-active", isOn);
                            s.style.pointerEvents = isOn ? "auto" : "none";
                            if (card) card.classList.toggle("is-active", isOn);
                        });
                    };

                    setActive(0);

                    const headerOffset = Math.round(getHeaderH());

                    // Scroll distance por slide
                    const STEP = () => Math.max(viewportEl.getBoundingClientRect().height || window.innerHeight * 0.75, 1);

                    gsap.set(slides, { zIndex: (i) => i, position: "absolute", left: 0, top: 0, width: "100%", height: "100%" });

                    const getEnd = () => STEP() * (slides.length + 1);

                    const updateSpacer = () => {
                        if (!spacer) return;
                        spacer.style.height = `${getEnd()}px`;
                    };
                    updateSpacer();

                    const st = ScrollTrigger.create({
                        trigger: sectionEl,
                        start: () => `top top+=${headerOffset - 10}`,
                        end: () => `+=${getEnd()}`,
                        pin: pinEl,
                        pinSpacing: false,
                        scrub: 0.45,
                        anticipatePin: 0,
                        invalidateOnRefresh: true,
                        animation: tl,

                        onUpdate: (self) => {
                            const idx = Math.round(self.progress * (slides.length - 1));
                            const clamped = Math.min(slides.length - 1, Math.max(0, idx));
                            setActive(clamped);
                        },
                    });

                    const refresh = () => {
                        updateSpacer();
                        ScrollTrigger.refresh();
                    };
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
                        if (spacer && spacer.parentElement === sectionEl) {
                            sectionEl.removeChild(spacer);
                            spacerRef.current = null;
                        }
                    };
                });
            }, benefitsRef);

            return () => {
                mm.revert();
                ctx.revert();
            };
        } catch (err) {
            console.error("AppIABenefits ScrollTrigger init failed", err);
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

                            <p className="AppIAHeroLead">{t.heroLead}</p>

                            <Link className="AppIABtn" to="/contacto">
                                {t.heroBtn}
                            </Link>
                        </header>

                        <div className="AppIAHeroBottom">
                            <div className="AppIAHeroVisual" aria-hidden="true">
                                <img ref={asterRef} className="AppIAHeroAster" src={AsteriscoSvg} alt="" />
                                <img className="AppIAHeroImg" src={CHATBOT_IA_HERO_IMAGE_UNIQUE} alt="" />
                            </div>

                            <div className="AppIAHeroCopy">
                                <p className="AppIAHeroCopyLead">
                                    {t.heroCopyLead}
                                    <span className="AppIATextYellow">{t.heroCopyHighlight}</span>
                                </p>

                                <p>{t.heroText}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section className="AppIAPricing">
                    <div className="AppIAWrap">
                        <h2 className="AppIAPricing__title">{t.pricingTitle}</h2>
                        <p className="AppIAPricing__subtitle">
                            <span>{t.pricingSubtitle}</span>{t.pricingSubtitleRow}
                        </p>

                        <div className="AppIAPricing__wrapper">
                            <img src={PricingBg} alt="" className="AppIAPricing__BgFrame" aria-hidden="true" />

                            <div className="AppIAPricing__grid">
                                {t.plans.map((plan: any) => {
                                    const { amount, suffix } = plan.price ? formatMoney(plan.price, lang) : { amount: "", suffix: "" };
                                    return (
                                        <article key={plan.variant} className={`AppIAPricingCard AppIAPricingCard--${plan.variant}`}>
                                            {/* Background responsive por plan */}
                                            <picture className="AppIAPricingCard__bg">
                                                <source
                                                    media="(max-width: 768px)"
                                                    srcSet={plan.variant === "custom" ? PricingCardYellowMobile : PricingCardMobile}
                                                />
                                                <img
                                                    src={plan.variant === "custom" ? PricingGreenDesktop : PricingCardBgDesktop}
                                                    alt=""
                                                    aria-hidden="true"
                                                />
                                            </picture>

                                            <div className="AppIAPricingCard__content">
                                                <div className="AppIAPricingCard__head">
                                                    <h3 className="AppIAPricingCard__title">{plan.title}</h3>
                                                    {plan.variant === "custom" ? <span className="AppIAPricingCard__badge">{t.pricingBadgeAgencies}</span> : null}
                                                </div>

                                                <div className="AppIAPricingCard__mid">
                                                    {plan.price ? (
                                                        <div className="AppIAPricingCard__price">
                                                            $ {amount} <small>{suffix}</small>
                                                        </div>
                                                    ) : (
                                                        <div className="AppIAPricingCard__price AppIAPricingCard__price--custom">
                                                            {t.pricingCustomSubtitle}
                                                        </div>
                                                    )}
                                                </div>

                                                <ul className="AppIAPricingCard__bullets">
                                                    {plan.bullets.map((b: string) => (
                                                        <li key={b}>{b}</li>
                                                    ))}
                                                </ul>

                                                <div className="AppIAPricingCard__action">
                                                    <Link to="/contacto" className="AppIAPricingCard__btn">
                                                        {t.pricingBtn}
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
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
                                    {t.benefits.map((benefit: any, idx: number) => {
                                        const benefitImages = [BenefitCard01, BenefitCard02, BenefitCard03, BenefitCard04];
                                        return (
                                            <div className="AppIABenefits__slide" key={idx}>
                                                <article className="AppIABenefits__card" aria-label={`Beneficio ${idx + 1}`}>
                                                    <img className="AppIABenefits__bg" src={benefitImages[idx]} alt="" aria-hidden="true" />

                                                    <div className={`AppIABenefits__copy ${idx === 0 ? "is-primary" : ""}`}>
                                                        <h3 className="AppIABenefits__title">{benefit.title}</h3>
                                                        <p className="AppIABenefits__desc">{benefit.copy}</p>

                                                        {benefit.extraList && (
                                                            <ul className="AppIAPricingCard__bullets" style={{ marginTop: "10px", opacity: 0.9 }}>
                                                                {benefit.extraList.map((item: string) => (
                                                                    <li key={item}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </article>
                                            </div>
                                        );
                                    })}
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
