import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./branding.css";

gsap.registerPlugin(ScrollTrigger);

// ===== Assets Branding =====
import AsteriscoBg from "../../assets/svg/Branding/ASTERISCO.svg";
import PriceCardBg from "../../assets/svg/Branding/tarejta precio branding.svg";
import BenefitsTitleSvg from "../../assets/svg/Branding/Beneficios y degradado.svg";
import BenefitsCard01 from "../../assets/svg/Branding/Tarjeta Beneficio/1.svg";
import BenefitsCard02 from "../../assets/svg/Branding/Tarjeta Beneficio/2.svg";
import BenefitsCard03 from "../../assets/svg/Branding/Tarjeta Beneficio/3.svg";
import BenefitsCard04 from "../../assets/svg/Branding/Tarjeta Beneficio/4.svg";

// ===== Imagen principal (public) =====
const HERO_IMG = "/img/Branding/IMG_branding_principal_calidad.webp";

// ===== Logos Marcas =====
import CasaFlor from "../../assets/svg/Marcas/Casa Flor de Café.svg";
import CasaSanAngel from "../../assets/svg/Marcas/Casa San Ángel.svg";
import Casino from "../../assets/svg/Marcas/Casino.svg";
import Etze from "../../assets/svg/Marcas/Etzé.svg";
import GIE from "../../assets/svg/Marcas/GIE.svg";
import Kareltssa from "../../assets/svg/Marcas/Kareltsa.svg";
import Payrolling from "../../assets/svg/Marcas/Payrolling.svg";
import Stautek from "../../assets/svg/Marcas/stautek.svg";
import Summit from "../../assets/svg/Marcas/Summit.svg";

type BrandLogo = { src: string; alt: string };

const BRAND_LOGOS: BrandLogo[] = [
    { src: Summit, alt: "Summit League" },
    { src: GIE, alt: "GIE" },
    { src: CasaFlor, alt: "Casa Flor de Café" },
    { src: Payrolling, alt: "Payrolling" },
    { src: Casino, alt: "Casino" },
    { src: Kareltssa, alt: "Kareltssa" },
    { src: Stautek, alt: "Stautek" },
    { src: Etze, alt: "Etzé" },
    { src: CasaSanAngel, alt: "Casa San Ángel" },
];

export default function Branding() {
    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        let mm: gsap.MatchMedia | null = null;

        const ctx = gsap.context(() => {
            mm = gsap.matchMedia();
            mm.add("(min-width: 769px)", () => {
                const trackEl = trackRef.current;
                const sectionEl = benefitsRef.current;
                const pinEl = pinRef.current;


                if (!trackEl || !sectionEl || !pinEl) return;


                const slides = gsap.utils.toArray<HTMLElement>(".BrandingBenefits__slide", trackEl);
                if (slides.length < 2) return;


                const getHeaderH = () =>
                    parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 96;


                const viewportEl = pinEl.querySelector<HTMLElement>(".BrandingBenefits__viewport");


                const getViewportH = () => viewportEl?.getBoundingClientRect().height || window.innerHeight;


                // Medición robusta del "paso" real entre tarjetas (incluye overlap por CSS)
                const getStepPx = () => {
                    // Calculamos la distancia real entre el top del slide 1 al slide 2
                    // Esto devuelve la altura VISIBLE + el espacio negativo, o sea el "step" real
                    if (slides.length >= 2) {
                        const step = slides[1].offsetTop - slides[0].offsetTop;
                        // Validación simple para asegurar que no sea 0 o negativo
                        if (Number.isFinite(step) && step > 0) {
                            return step;
                        }
                    }
                    return getViewportH();
                };

                const getTravelPx = () => Math.round(getStepPx() * (slides.length - 1));
                const getEndPx = () => Math.round(getStepPx() * slides.length);


                // Importante: el layout del deck NO debe usar slides absolute.
                // Z-index para que la de arriba quede encima visualmente
                slides.forEach((s, i) => {
                    gsap.set(s, { position: "relative", zIndex: slides.length - i });
                });


                gsap.set(trackEl, { y: 0, yPercent: 0 });


                const tween = gsap.to(trackEl, {
                    y: () => -getTravelPx(),
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: () => `top top+=${Math.round(getHeaderH())}`,
                        end: () => `+=${getEndPx()}`,
                        pin: pinEl,
                        pinSpacing: true,
                        scrub: 1.1,
                        anticipatePin: 2,
                        invalidateOnRefresh: true,

                        snap: {
                            snapTo: (value) => {
                                const n = slides.length - 1;
                                return Math.round(value * n) / n;
                            },
                            duration: { min: 0.15, max: 0.35 },
                            ease: "power1.inOut",
                        },
                    },
                });


                // Refresh cuando el layout ya asentó
                const refresh = () => ScrollTrigger.refresh();
                const raf = requestAnimationFrame(refresh);


                // Recalcular si cambia altura del viewport (media queries / responsive)
                const ro = new ResizeObserver(refresh);
                if (viewportEl) ro.observe(viewportEl);


                // Si hay imágenes/fonts que cambian medidas, esto ayuda
                window.addEventListener("load", refresh, { passive: true });


                return () => {
                    window.removeEventListener("load", refresh);
                    cancelAnimationFrame(raf);
                    ro.disconnect();
                    tween.scrollTrigger?.kill();
                    tween.kill();
                };
            });
        }, benefitsRef);


        return () => {
            if (mm) mm.revert();
            ctx.revert();
        };
    }, []);

    return (
        <>
            <Head />

            <main className="BrandingPage">
                {/* =========================
            HERO
        ========================= */}
                <section className="BrandingHero" id="branding">
                    <div className="BrandingWrap BrandingVignette">
                        <div className="BrandingHero__top">
                            <div className="BrandingHero__titleWrap">
                                <span className="BrandingHero__services" aria-hidden="true">
                                    SERVICIOS
                                </span>

                                <h1 className="BrandingHero__title">BRANDING</h1>
                            </div>

                            <p className="BrandingHero__subtitle">
                                Creamos ADN estratégico para tu marca, elevamos reconocimiento y fidelizamos audiencias.
                            </p>

                            <a className="BrandingBtn BrandingBtn--outline" href="/contacto">
                                CONVERSEMOS
                            </a>
                        </div>

                        <div className="BrandingHero__bottom">
                            <div className="BrandingHero__art" aria-hidden="true">
                                <img className="BrandingHero__asterisco" src={AsteriscoBg} alt="" />
                                <img className="BrandingHero__img" src={HERO_IMG} alt="" loading="eager" />
                            </div>

                            <div className="BrandingHero__copy">
                                <p className="BrandingHero__lead">
                                    En Quantum no diseñamos logotipos,{" "}
                                    <span className="BrandingText--yellow">diseñamos marcas.</span>
                                </p>

                                <p className="BrandingHero__text">
                                    Creamos sistemas de identidad que conectan estrategia, estética y significado, dando forma a marcas
                                    sólidas, memorables y consistentes.
                                </p>

                                <p className="BrandingHero__text">
                                    Nuestro servicio de Branding incluye conceptualización, diseño visual, lineamientos claros y un brand
                                    book profesional.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================
            PRECIO
        ========================= */}
                <section className="BrandingPrice" id="precio">
                    <div className="BrandingWrap BrandingVignette">
                        <div className="BrandingPrice__grid">
                            <div className="BrandingPrice__left">
                                <h2 className="BrandingPrice__title">PRECIO</h2>
                                <p className="BrandingPrice__kicker">CONSULTA NUESTROS PLANES</p>
                            </div>

                            <div className="BrandingPrice__right">
                                <div className="BrandingPrice__card" role="group" aria-label="Precio de Diseño de Marca">
                                    <img className="BrandingPrice__cardBg" src={PriceCardBg} alt="" aria-hidden="true" />

                                    <div className="BrandingPrice__cardContent">
                                        <p className="BrandingPrice__cardTitle">DISEÑO DE MARCA</p>

                                        <div className="BrandingPrice__divider" aria-hidden="true" />

                                        <div className="BrandingPrice__amount">
                                            <span className="BrandingPrice__currency">$</span>
                                            <span className="BrandingPrice__number">3,900</span>
                                            <span className="BrandingPrice__mxn">MXN</span>
                                        </div>

                                        <div className="BrandingPrice__divider" aria-hidden="true" />

                                        <a className="BrandingBtn BrandingBtn--solid" href="/contacto">
                                            CONTRATAR
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================
            BENEFICIOS
        ========================= */}
                <section className="BrandingBenefits" id="beneficios" ref={benefitsRef}>
                    <div className="BrandingWrap BrandingVignette">
                        <div className="BrandingBenefits__pin" ref={pinRef}>
                            <div className="BrandingBenefits__left BrandingBenefits__left--pinned" aria-hidden="true">
                                <img className="BrandingBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                            </div>

                            <div className="BrandingBenefits__viewport">
                                <div className="BrandingBenefits__track" ref={trackRef}>
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 1: Marca Única">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard01} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "24%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">MARCA ÚNICA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Identidad original que te diferencia y evita verse genérico.
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 2: Claridad Estratégica">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard02} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "58%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">CLARIDAD ESTRATÉGICA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Concepto, personalidad y estilo bien definidos desde el inicio.
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 3: Gestión Sencilla">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard03} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "78%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">GESTIÓN SENCILLA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Edita y actualiza tu contenido sin complicaciones.
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 4: Soporte Continuo">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard04} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "100%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">SOPORTE CONTINUO</h3>
                                                <p className="BrandingBenefits__p">
                                                    Ajustes mensuales de contenido con un diseñador asignado.
                                                </p>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================
            PROYECTOS (MARQUEE infinito)
        ========================= */}
                <section className="BrandingProjects" id="proyectos">
                    <div className="BrandingWrap BrandingVignette">
                        <h2 className="BrandingProjects__title">ALGUNOS DE NUESTROS PROYECTOS</h2>

                        <div className="BrandingProjects__pill" role="region" aria-label="Marcas con las que trabajamos">
                            <div className="BrandingMarquee" aria-hidden="false">
                                {/* Duplicamos la lista para loop perfecto */}
                                <div className="BrandingMarquee__inner">
                                    {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                                        <div className="BrandingMarquee__item" key={`${logo.alt}-${i}`}>
                                            <img className="BrandingMarquee__img" src={logo.src} alt={logo.alt} loading="lazy" />
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
