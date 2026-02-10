import { useLayoutEffect, useRef } from "react";
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

import PreciosDesktop from "../../assets/svg/Ecomerce/Desktop/Precios.svg";
import PreciosMobileEcom from "../../assets/svg/Ecomerce/Mobile/tarjeta precio ecommerce mobile.svg";
import PreciosMobileYellow from "../../assets/svg/Ecomerce/Mobile/tarjeta precio amarillo_mobile.svg";

// ===== Assets (public) =====
const PRICING_TOP = "/img/Ecommerce/Desktop/tarjeta%20precios%20ecommerce.svg";
const WORLD_WEB = "/img/Ecommerce/web.webp";

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

                    const STEP = () =>
                        Math.max(viewportEl.getBoundingClientRect().height || window.innerHeight * 0.7, window.innerWidth * 0.5, 1) * 1.05;

                    gsap.set(slides, { zIndex: (i) => i, position: "absolute", left: 0, top: 0, width: "100%", height: "100%" });

                    const getEnd = () => STEP() * (slides.length + 1);

                    const st = ScrollTrigger.create({
                        trigger: sectionEl,
                        start: () => `top top+=${headerOffset}`,
                        end: () => `+=${getEnd()}`,
                        pin: pinEl,
                        pinSpacing: true,
                        scrub: 1.6,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        animation: tl,
                        snap: {
                            snapTo: "labels",
                            duration: { min: 0.14, max: 0.32 },
                            delay: 0.18,
                            ease: "power1.inOut",
                        },
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
                    (document as any).fonts?.ready?.then(refresh).catch(() => {});

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
                                <span className="EcomHeroServicios">SERVICIOS</span>
                                <h1 className="EcomHeroTitle">ECOMMERCE</h1>
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
                    <div className="EcomWrap">
                        <header className="EcomPricing__head">
                            <h2 className="EcomPricing__title">LLEVA TU NEGOCIO AL SIGUIENTE NIVEL</h2>
                            <p className="EcomPricing__subtitle">
                                <span>Paga de forma sencilla.</span> de contado o en pagos parciales, tú decides.
                            </p>
                        </header>

                        {/* Fila superior */}
                        <div className="EcomMedia EcomMedia--pricingTop">
                            <picture>
                                <source media="(max-width: 768px)" srcSet={PreciosMobileEcom} />
                                <img className="EcomMediaImg" src={PRICING_TOP} alt="Planes Ecommerce fila 1" />
                            </picture>
                        </div>

                        {/* Fila inferior */}
                        <div className="EcomMedia EcomMedia--pricingBottom">
                            <picture>
                                <source media="(max-width: 768px)" srcSet={PreciosMobileYellow} />
                                <img className="EcomMediaImg" src={PreciosDesktop} alt="Precios Personalizado" />
                            </picture>
                        </div>
                    </div>
                </section>

                {/* BENEFICIOS con animación ScrollTrigger (igual que branding) */}
                <section className="EcomBenefits" ref={benefitsRef}>
                    <div className="EcomWrap">
                        <div className="EcomBenefits__pin" ref={pinRef}>
                            <div className="EcomBenefits__left" aria-hidden="true">
                                <img className="EcomBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                            </div>

                            <div className="EcomBenefits__viewport">
                                <div className="EcomBenefits__track" ref={trackRef}>
                                    <div className="EcomBenefits__slide">
                                        <article className="EcomBenefits__card" aria-label="Beneficio 1">
                                            <img className="EcomBenefits__bg" src={BenefitCard01} alt="" />
                                        </article>
                                    </div>

                                    <div className="EcomBenefits__slide">
                                        <article className="EcomBenefits__card" aria-label="Beneficio 2">
                                            <img className="EcomBenefits__bg" src={BenefitCard02} alt="" />
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROYECTOS (solo placeholder como pediste) */}
                <section className="EcomProjects">
                    <div className="EcomWrap">
                        <h2 className="EcomProjectsTitle">NUESTROS PROYECTOS</h2>

                        <div className="EcomProjectsStack" aria-label="Proyectos (placeholder)">
                            <div className="EcomProjectPh" />
                            <div className="EcomProjectPh" />
                            <div className="EcomProjectPh" />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
