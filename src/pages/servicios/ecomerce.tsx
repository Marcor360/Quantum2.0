import { useLayoutEffect, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./ecomerce.css";

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
import PricingCardYellow from "../../assets/svg/Ecomerce/Desktop/Precios.svg";
import EcommerceTitleSvg from "../../assets/svg/Titulos/serv/ECOMMERCE.svg";

// ===== Data =====
const pricingPlans = [
    {
        title: "LANDING PAGE",
        price: "$ 5,980",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    },
    {
        title: "SITIO INFORMATIVO",
        price: "$ 7,980",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    },
    {
        title: "ECOMMERCE A WHATSAPP",
        price: "$ 9,600",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    },
    {
        title: "E-COMMERCE CON PASARELA DE PAGO",
        price: "$ 11,600",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    }
];

const pricingPlansSecondary = [
    {
        title: "LANDING PAGE",
        price: "$ 7,980",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    },
    {
        title: "SITIO INFORMATIVO",
        price: "$ 9,980",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    },
    {
        title: "ECOMMERCE A WHATSAPP",
        price: "$ 11,600",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    },
    {
        title: "E-COMMERCE CON PASARELA DE PAGO",
        price: "$ 13,600",
        renewal: "*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)"
    }
];

const benefits = [
    {
        id: 1,
        image: BenefitCard01,
        title: "DISEÑO ADAPTABLE",
        copy: "Tu sitio se ve y funciona perfecto en cualquier dispositivo."
    },
    {
        id: 2,
        image: BenefitCard02,
        title: "PLATAFORMA ESCALABLE",
        copy: "Flexible, adaptable y lista para escalar cuando lo necesites."
    },
    {
        id: 3,
        image: BenefitCard03,
        title: "GESTIÓN SENCILLA",
        copy: "Edita y actualiza tu contenido sin complicaciones."
    },
    {
        id: 4,
        image: BenefitCard04,
        title: "SOPORTE CONTINUO",
        copy: "Ajustes mensuales de contenido con un diseñador asignado."
    }
];

const projectShots = [
    { src: "/img/ecomerce/Staumodu_Sitio Web.webp", label: "Proyecto Staumodu - sitio web" },
    { src: "/img/ecomerce/Landing Beneficios_editable.webp", label: "Landing Beneficios" },
    { src: "/img/ecomerce/Home_Hotel_quantum.webp", label: "Home Hotel Quantum" }
];

gsap.registerPlugin(ScrollTrigger);

function getHeaderH(): number {
    if (typeof document === "undefined") return 96;
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue("--header-h").trim();
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 96;
}

export default function Ecomerce() {
    const asterRef = useRef<HTMLImageElement | null>(null);
    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    // Scroll al inicio cuando se carga esta página
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, []);

    useLayoutEffect(() => {
        console.log("Quantum 2.0 - Ecomerce Page Updated v6 (Edge-to-Edge Forced)");
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
                            s.classList.toggle("is-active", isOn);
                            s.style.pointerEvents = isOn ? "auto" : "none";
                        });

                        cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
                    };

                    setActive(0);

                    const headerOffset = Math.round(getHeaderH());

                    // Distancia por slide con menor multiplicador para un scroll más controlable
                    const STEP = () => Math.max(viewportEl.getBoundingClientRect().height || window.innerHeight * 0.75, 1);

                    gsap.set(slides, { zIndex: (i) => i, position: "absolute", left: 0, top: 0, width: "100%", height: "100%" });

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
                        onUpdate: (self) => {
                            const idx = Math.round(self.progress * (slides.length - 1));
                            const clamped = Math.min(slides.length - 1, Math.max(0, idx));
                            setActive(clamped);
                        },
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
            console.error("Ecomerce Benefits ScrollTrigger init failed", err);
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
                                    <img src={EcommerceTitleSvg} alt="ECOMMERCE" />
                                </h1>
                            </div>

                            <p className="EcomHeroLead">
                                Creamos experiencias de venta estratégicas, impulsamos conversiones y escalamos tu
                                negocio digital.
                            </p>

                            <Link className="EcomBtn" to="/contacto">
                                CONVERSEMOS
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
                                    En Quantum no solo creamos tiendas online,{" "}
                                    <span className="EcomTextYellow">construimos experiencias de venta.</span>
                                </p>

                                <p>
                                    Diseñamos eCommerce que conectan estrategia, diseño y tecnología para convertir
                                    visitas en clientes y marcas en negocios escalables.
                                </p>

                                <p>
                                    Nuestro servicio de Ecommerce incluye planificación estratégica, diseño UX/UI,
                                    desarrollo funcional, optimización para conversión y una tienda profesional lista
                                    para vender desde el primer día.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING (2 filas como el mockup) */}
                <section className="EcomPricing">
                    {/* Marco decorativo "detrás" - Movido fuera de EcomWrap para alcance total */}
                    <img src={PricingBg} alt="" className="EcomPricing__BgFrame" aria-hidden="true" />

                    <div className="EcomWrap">
                        <header className="EcomPricing__head">
                        </header>

                        {/* Pricing Grid */}
                        <div className="EcomPricing__wrapper">
                            <h2 className="EcomPricing__title">LLEVA TU NEGOCIO AL SIGUIENTE NIVEL</h2>

                            <p className="EcomPricing__subtitle">
                                <span>Paga de forma sencilla.</span> de contado o en pagos parciales, tú decides.
                            </p>

                            <div className="EcomPricing__grid">
                                {pricingPlans.map((plan, i) => (
                                    <article key={i} className="PricingCard">
                                        {/* Imagen de fondo absoluta para mejor escalado */}
                                        <img src={PricingCardBg} alt="" className="PricingCard__bg" aria-hidden="true" />

                                        <div className="PricingCard__content">
                                            <span className="PricingCard__label">Optimizado</span>
                                            <h3 className="PricingCard__title">{plan.title}</h3>

                                            <hr className="PricingCard__separator" />

                                            <div className="PricingCard__price">
                                                {plan.price} <small className="PricingCard__currency">MXN</small>
                                            </div>

                                            <p className="PricingCard__renewal">{plan.renewal}</p>
                                        </div>
                                        <div className="PricingCard__action">
                                            <Link to="/contacto" className="EcomBtn PricingCard__btn">
                                                CONTRATAR
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Secondary Pricing Grid (Yellow/Neon) */}
                        <div className="EcomPricing__wrapper EcomPricingSecondary">
                            <div className="EcomPricing__grid">
                                {pricingPlansSecondary.map((plan, i) => (
                                    <article key={i} className="PricingCardYellow">
                                        {/* Imagen de fondo absoluta */}
                                        <img src={PricingCardYellow} alt="" className="PricingCardYellow__bg" aria-hidden="true" />

                                        <div className="PricingCardYellow__content">
                                            <span className="PricingCardYellow__label">Personalizado</span>
                                            <h3 className="PricingCardYellow__title">{plan.title}</h3>

                                            <hr className="PricingCardYellow__separator" />

                                            <div className="PricingCardYellow__price">
                                                {plan.price} <small className="PricingCardYellow__currency">MXN</small>
                                            </div>

                                            <p className="PricingCardYellow__renewal">{plan.renewal}</p>
                                        </div>
                                        <div className="PricingCardYellow__action">
                                            <Link to="/contacto" className="PricingCardYellow__btn">
                                                CONTRATAR
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BENEFICIOS con animación ScrollTrigger (igual que branding) */}
                <section className="EcomBenefits" ref={benefitsRef}>
                    <div className="EcomWrap">
                        <div className="EcomBenefits__pin" ref={pinRef}>
                            <div className="EcomBenefits__left EcomBenefits__left--pinned" aria-hidden="true">
                                <img className="EcomBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                            </div>

                            <div className="EcomBenefits__viewport">
                                <div className="EcomBenefits__track" ref={trackRef}>
                                    {benefits.map((benefit) => (
                                        <div className="EcomBenefits__slide" key={benefit.id}>
                                            <article className="EcomBenefits__card" aria-label={`Beneficio ${benefit.id}`}>
                                                <img className="EcomBenefits__bg" src={benefit.image} alt="" />

                                                <div className="EcomBenefits__copy">
                                                    <h3 className="EcomBenefits__title">{benefit.title}</h3>
                                                    <p className="EcomBenefits__desc">{benefit.copy}</p>
                                                </div>
                                            </article>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROYECTOS */}
                <section className="EcomProjects">
                    <div className="EcomWrap">
                        <h2 className="EcomProjectsTitle">NUESTROS PROYECTOS</h2>

                        <div className="EcomProjectsStack" aria-label="Proyectos recientes">
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
