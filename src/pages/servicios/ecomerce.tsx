import { useLayoutEffect, useMemo, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./ecomerce.css";
import "../../ecomerce-mobile.css";

import { useLang, type Lang } from "../../i18n/lang";
import { formatMoney } from "../../config/currency";

// ===== Assets (src) =====
import AsteriscoSvg from "../../assets/svg/Branding/ASTERISCO.svg";
import BenefitsTitleSvg from "../../assets/svg/Branding/Beneficios y degradado.svg";

import BenefitCard01 from "../../assets/svg/Branding/Tarjeta Beneficio/1.svg";
import BenefitCard02 from "../../assets/svg/Branding/Tarjeta Beneficio/2.svg";
import BenefitCard03 from "../../assets/svg/Branding/Tarjeta Beneficio/3.svg";
import BenefitCard04 from "../../assets/svg/Branding/Tarjeta Beneficio/4.svg";

// ===== Assets (public) =====
const WORLD_WEB = "/img/Ecommerce/web.webp";

// ===== Assets (SVG Components) =====
import PricingBg from "../../assets/svg/Ecomerce/Desktop/Primera tabla ecommerce_1.svg";
import PricingCardBg from "../../assets/svg/Ecomerce/Desktop/tarjeta precios ecommerce.svg";
import EcommerceTitleSvg from "../../assets/svg/Titulos/serv/ECOMMERCE.svg";

// ===== Data =====
const ECOM_COPY: Record<Lang, any> = {
    es: {
        heroTitleAria: "ECOMMERCE",
        heroLead: "Creamos experiencias de venta estratégicas, impulsamos conversiones y escalamos tu negocio digital.",
        heroBtn: "CONVERSEMOS",
        heroCopyLead: "En Quantum no solo creamos tiendas online, ",
        heroCopyHighlight: "construimos experiencias de venta.",
        heroText1: "Diseñamos eCommerce que conectan estrategia, diseño y tecnología para convertir visitas en clientes y marcas en negocios escalables.",
        heroText2: "Nuestro servicio de Ecommerce incluye planificación estratégica, diseño UX/UI, desarrollo funcional, optimización para conversión y una tienda profesional lista para vender desde el primer día.",

        pricingTitle: "LLEVA TU NEGOCIO AL SIGUIENTE NIVEL",
        pricingSubtitle: "Paga de forma sencilla.",
        pricingSubtitleRow: " de contado o en pagos parciales, tú decides.",
        pricingLabelOptimized: "Optimizado",
        pricingLabelCustom: "Personalizado",
        pricingBtn: "CONTRATAR",
        pricingRenewal: (val: string) => `*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: ${val} USD AL AÑO)`,

        projectsTitle: "NUESTROS PROYECTOS",
        projectsAria: "Proyectos recientes",

        plansMonthly: [
            { title: "ESENCIAL / MES", price: 3000 },
            { title: "INDISPENSABLE / MES", price: 3500 },
            { title: "TODO EN UNO / MES", price: 4000 },
            { title: "PROFESIONAL / MES", price: 4500 },
            { title: "OMNIPRESENTE / MES", price: 5000 }
        ],
        plansSecondaryMonthly: [
            { title: "ESENCIAL / MES", price: "1,500" },
            { title: "INDISPENSABLE / MES", price: "2,000" },
            { title: "TODO EN UNO / MES", price: "2,500" },
            { title: "PROFESIONAL / MES", price: "3,000" },
            { title: "OMNIPRESENTE / MES", price: "3,500" }
        ],
        plans: [
            { title: "ESENCIAL | ANUAL", price: 30000 },
            { title: "INDISPENSABLE | ANUAL", price: 35000 },
            { title: "TODO EN UNO | ANUAL", price: 40000 },
            { title: "PROFESIONAL | ANUAL", price: 45000 },
            { title: "OMNIPRESENTE | ANUAL", price: 50000 }
        ],
        plansSecondary: [
            { title: "ESENCIAL | ANUAL", price: "11,250 - 15,000" },
            { title: "INDISPENSABLE | ANUAL", price: "15,000 - 20,000" },
            { title: "TODO EN UNO | ANUAL", price: "18,750 - 25,000" },
            { title: "PROFESIONAL | ANUAL", price: "22,500 - 30,000" },
            { title: "OMNIPRESENTE | ANUAL", price: "26,250 - 35,000" }
        ],
        benefits: [
            { title: "DISEÑO ADAPTABLE", copy: "Tu sitio se ve y funciona perfecto en cualquier dispositivo." },
            { title: "PLATAFORMA ESCALABLE", copy: "Flexible, adaptable y lista para escalar cuando lo necesites." },
            { title: "GESTIÓN SENCILLA", copy: "Edita y actualiza tu contenido sin complicaciones." },
            { title: "SOPORTE CONTINUO", copy: "Ajustes mensuales de contenido con un diseñador asignado." }
        ]
    },
    en: {
        heroTitleAria: "ECOMMERCE",
        heroLead: "We create strategic sales experiences, drive conversions, and scale your digital business.",
        heroBtn: "LET'S TALK",
        heroCopyLead: "At Quantum, we don't just create online stores, ",
        heroCopyHighlight: "we build sales experiences.",
        heroText1: "We design eCommerce that connects strategy, design, and technology to convert visitors into customers and brands into scalable businesses.",
        heroText2: "Our Ecommerce service includes strategic planning, UX/UI design, functional development, conversion optimization, and a professional store ready to sell from day one.",

        pricingTitle: "TAKE YOUR BUSINESS TO THE NEXT LEVEL",
        pricingSubtitle: "Pay easily.",
        pricingSubtitleRow: " upfront or in partial payments, you decide.",
        pricingLabelOptimized: "Optimized",
        pricingLabelCustom: "Custom",
        pricingBtn: "GET STARTED",
        pricingRenewal: (val: string) => `*One-time payment (subsequently you will pay for hosting renewal and maintenance of your site: ${val} USD PER YEAR)`,

        projectsTitle: "OUR PROJECTS",
        projectsAria: "Recent projects",

        plansMonthly: [
            { title: "ESENCIAL / MES", price: 3000 },
            { title: "INDISPENSABLE / MES", price: 3500 },
            { title: "TODO EN UNO / MES", price: 4000 },
            { title: "PROFESIONAL / MES", price: 4500 },
            { title: "OMNIPRESENTE / MES", price: 5000 }
        ],
        plansSecondaryMonthly: [
            { title: "ESENCIAL / MES", price: "1,500" },
            { title: "INDISPENSABLE / MES", price: "2,000" },
            { title: "TODO EN UNO / MES", price: "2,500" },
            { title: "PROFESIONAL / MES", price: "3,000" },
            { title: "OMNIPRESENTE / MES", price: "3,500" }
        ],
        plans: [
            { title: "ESENCIAL | ANUAL", price: 30000 },
            { title: "INDISPENSABLE | ANUAL", price: 35000 },
            { title: "TODO EN UNO | ANUAL", price: 40000 },
            { title: "PROFESIONAL | ANUAL", price: 45000 },
            { title: "OMNIPRESENTE | ANUAL", price: 50000 }
        ],
        plansSecondary: [
            { title: "ESENCIAL | ANUAL", price: "11,250 - 15,000" },
            { title: "INDISPENSABLE | ANUAL", price: "15,000 - 20,000" },
            { title: "TODO EN UNO | ANUAL", price: "18,750 - 25,000" },
            { title: "PROFESIONAL | ANUAL", price: "22,500 - 30,000" },
            { title: "OMNIPRESENTE | ANUAL", price: "26,250 - 35,000" }
        ],
        benefits: [
            { title: "DISEÑO ADAPTABLE", copy: "Tu sitio se ve y funciona perfecto en cualquier dispositivo." },
            { title: "PLATAFORMA ESCALABLE", copy: "Flexible, adaptable y lista para escalar cuando lo necesites." },
            { title: "GESTIÓN SENCILLA", copy: "Edita y actualiza tu contenido sin complicaciones." },
            { title: "SOPORTE CONTINUO", copy: "Ajustes mensuales de contenido con un diseñador asignado." }
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

const projectShots = [
    { src: "/img/ecomerce/Staumodu_Sitio Web.webp", label: "Proyecto Staumodu - sitio web" },
    { src: "/img/ecomerce/Landing Beneficios_editable.webp", label: "Landing Beneficios" },
    { src: "/img/ecomerce/Home_Hotel_quantum.webp", label: "Home Hotel Quantum" }
];

gsap.registerPlugin(ScrollTrigger);


export default function Ecomerce() {
    const [lang] = useLang();
    const t = useMemo(() => ECOM_COPY[lang], [lang]);

    // Estado para controlar si se muestran precios mensuales o anuales
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

    const asterRef = useRef<HTMLImageElement | null>(null);

    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const spacerRef = useRef<HTMLDivElement | null>(null);

    // Scroll al inicio cuando se carga esta página
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    useLayoutEffect(() => {
        const el = asterRef.current;
        if (!el) return;

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
                    const viewportEl = pinEl?.querySelector<HTMLElement>(".EcomBenefits__viewport");
                    const trackEl = trackRef.current;

                    if (!sectionEl || !pinEl || !viewportEl || !trackEl) return;

                    // Spacer manual para evitar rebote de pinSpacing
                    let spacer = spacerRef.current;
                    if (!spacer) {
                        spacer = document.createElement("div");
                        spacer.className = "EcomBenefits__spacer";
                        spacerRef.current = spacer;
                        sectionEl.appendChild(spacer);
                    }

                    const slides = gsap.utils.toArray<HTMLElement>(".EcomBenefits__slide", trackEl);
                    const cards = gsap.utils.toArray<HTMLElement>(".EcomBenefits__card", trackEl);
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
            console.error("EcomBenefits ScrollTrigger init failed", err);
        }
    }, []);

    return (
        <>
            <Head />

            <main className="EcomercePage">
                {/* HERO */}
                <section className="EcomHero">
                    <div className="EcomWrap">
                        {/* top centered */}
                        <header className="EcomHeroTop">
                            <div className="EcomHeroTitleRow">
                                <h1 className="EcomHeroTitle">
                                    <img src={EcommerceTitleSvg} alt={t.heroTitleAria} />
                                </h1>
                            </div>

                            <p className="EcomHeroLead">{t.heroLead}</p>

                            <Link className="EcomBtn" to="/contacto">
                                {t.heroBtn}
                            </Link>
                        </header>

                        {/* bottom row: world left + text right */}
                        <div className="EcomHeroBottom">
                            <div className="EcomHeroVisual" aria-hidden="true">
                                <img ref={asterRef} className="EcomHeroAster" src={AsteriscoSvg} alt="" />
                                <img className="EcomHeroWorld" src={WORLD_WEB} alt="" />
                            </div>

                            <div className="EcomHeroCopy">
                                <p className="EcomHeroCopyLead">
                                    {t.heroCopyLead}
                                    <span className="EcomTextYellow">{t.heroCopyHighlight}</span>
                                </p>

                                <p>{t.heroText1}</p>

                                <p>{t.heroText2}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING (2 filas como el mockup) */}
                <section className="EcomPricing">
                    <div className="EcomWrap">
                        <header className="EcomPricing__head">
                        </header>

                        {/* Pricing Grid */}
                        <div className="EcomPricing__wrapper">
                            {/* Marco decorativo solo para la primera fila */}
                            <img src={PricingBg} alt="" className="EcomPricing__BgFrame" aria-hidden="true" />

                            <h2 className="EcomPricing__title">{t.pricingTitle}</h2>

                            <p className="EcomPricing__subtitle">
                                <span>{t.pricingSubtitle}</span>{t.pricingSubtitleRow}
                            </p>

                            {/* Toggle Mensual/Anual */}
                            <div className="EcomPricing__toggle">
                                <button
                                    className={`EcomPricing__toggleBtn ${billingPeriod === "monthly" ? "active" : ""}`}
                                    onClick={() => setBillingPeriod("monthly")}
                                >
                                    Mensual
                                </button>
                                <button
                                    className={`EcomPricing__toggleBtn ${billingPeriod === "annual" ? "active" : ""}`}
                                    onClick={() => setBillingPeriod("annual")}
                                >
                                    Anual
                                </button>
                            </div>

                            <div className="EcomPricing__grid">
                                {(billingPeriod === "monthly" ? t.plansMonthly : t.plans).map((plan: any, i: number) => {
                                    const { amount, suffix } = formatMoney(plan.price, lang);
                                    return (
                                        <article key={i} className="PricingCard">
                                            {/* Imagen de fondo absoluta para mejor escalado */}
                                            <img src={PricingCardBg} alt="" className="PricingCard__bg" aria-hidden="true" />

                                            <div className="PricingCard__content">
                                                <span className="PricingCard__label">{t.pricingLabelOptimized}</span>
                                                <h3 className="PricingCard__title">{plan.title}</h3>

                                                <hr className="PricingCard__separator" />

                                                <div className="PricingCard__price">
                                                    $ {amount} <small className="PricingCard__currency">{suffix}</small>
                                                </div>

                                                <p className="PricingCard__renewal">{t.pricingRenewal("200")}</p>
                                            </div>
                                            <div className="PricingCard__action">
                                                <Link to="/contacto" className="EcomBtn PricingCard__btn">
                                                    {t.pricingBtn}
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Secondary Pricing Grid (Yellow/Neon) */}
                        <div className="EcomPricing__wrapper EcomPricingSecondary">
                            {/* Toggle Mensual/Anual */}
                            <div className="EcomPricing__toggle">
                                <button
                                    className={`EcomPricing__toggleBtn ${billingPeriod === "monthly" ? "active" : ""}`}
                                    onClick={() => setBillingPeriod("monthly")}
                                >
                                    Mensual
                                </button>
                                <button
                                    className={`EcomPricing__toggleBtn ${billingPeriod === "annual" ? "active" : ""}`}
                                    onClick={() => setBillingPeriod("annual")}
                                >
                                    Anual
                                </button>
                            </div>

                            <div className="EcomPricing__grid">
                                {(billingPeriod === "monthly" ? t.plansSecondaryMonthly : t.plansSecondary).map((plan: any, i: number) => {
                                    let amount;
                                    let suffix = "MX";

                                    if (typeof plan.price === 'number') {
                                        const res = formatMoney(plan.price, lang);
                                        amount = res.amount;
                                        suffix = res.suffix;
                                    } else {
                                        amount = plan.price;
                                    }

                                    return (
                                        <article key={i} className="PricingCardYellow">
                                            {/* Imagen de fondo absoluta */}
                                            <img src={PricingCardBg} alt="" className="PricingCardYellow__bg" aria-hidden="true" />

                                            <div className="PricingCardYellow__content">
                                                <span className="PricingCardYellow__label">{t.pricingLabelCustom}</span>
                                                <h3 className="PricingCardYellow__title">{plan.title}</h3>

                                                <hr className="PricingCardYellow__separator" />

                                                <div className="PricingCardYellow__price" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}>
                                                    $ {amount} <small className="PricingCardYellow__currency">{suffix}</small>
                                                </div>

                                                <p className="PricingCardYellow__renewal">{t.pricingRenewal("200")}</p>
                                            </div>
                                            <div className="PricingCardYellow__action">
                                                <Link to="/contacto" className="PricingCardYellow__btn">
                                                    {t.pricingBtn}
                                                </Link>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFICIOS */}
                <section className="EcomBenefits" ref={benefitsRef}>
                    <div className="EcomWrap">
                        <div className="EcomBenefits__pin" ref={pinRef}>
                            <div className="EcomBenefits__left" aria-hidden="true">
                                <img className="EcomBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                            </div>

                            <div className="EcomBenefits__viewport">
                                <div className="EcomBenefits__track" ref={trackRef}>
                                    {t.benefits.map((benefit: any, idx: number) => {
                                        const benefitImages = [BenefitCard01, BenefitCard02, BenefitCard03, BenefitCard04];
                                        return (
                                            <div className="EcomBenefits__slide" key={idx}>
                                                <article className="EcomBenefits__card" aria-label={`Beneficio ${idx + 1}`}>
                                                    <img className="EcomBenefits__bg" src={benefitImages[idx]} alt="" aria-hidden="true" />

                                                    <div className={`EcomBenefits__copy ${idx === 0 ? "is-primary" : ""}`}>
                                                        <h3 className="EcomBenefits__title">{benefit.title}</h3>
                                                        <p className="EcomBenefits__desc">{benefit.copy}</p>
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

                {/* PROYECTOS */}
                <section className="EcomProjects">
                    <div className="EcomWrap">
                        <h2 className="EcomProjectsTitle">{t.projectsTitle}</h2>

                        <div className="EcomProjectsStack" aria-label={t.projectsAria}>
                            {projectShots.map((shot) => (
                                <div
                                    key={shot.src}
                                    className="EcomProjectCard"
                                    style={{ backgroundImage: `url('${shot.src}')` }}
                                    aria-label={shot.label}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
