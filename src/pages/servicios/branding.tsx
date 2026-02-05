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

function getHeaderH(): number {
    if (typeof document === "undefined") return 96;
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue("--header-h").trim();
    const n = parseFloat(val);
    return Number.isFinite(n) ? n : 96;
}

export default function Branding() {
    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            mm.add("(min-width: 769px)", () => {
                const sectionEl = benefitsRef.current;
                const pinEl = pinRef.current;
                const trackEl = trackRef.current;

                if (!sectionEl || !pinEl || !trackEl) return;

                const slides = gsap.utils.toArray<HTMLElement>(".BrandingBenefits__slide", trackEl);
                if (slides.length < 2) return;

                const viewportEl = pinEl.querySelector<HTMLElement>(".BrandingBenefits__viewport");
                if (!viewportEl) return;

                const clamp = (min: number, max: number, v: number) => Math.min(max, Math.max(min, v));
                const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

                // ===== Deck tuning
                // Más “premium”: transición continua + scroll más largo por tarjeta
                const basePeek = 40; // asomo de la siguiente (baja para que asome más)
                const gapPeek = 10;

                const yForSlot = (slot: number) => (slot <= 0 ? 0 : basePeek + (slot - 1) * gapPeek);
                const scaleForSlot = (slot: number) => Math.max(0.94, 1 - slot * 0.016);

                const setY = slides.map((el) => gsap.quickSetter(el, "yPercent"));
                const setS = slides.map((el) => gsap.quickSetter(el, "scale"));
                const setA = slides.map((el) => gsap.quickSetter(el, "autoAlpha"));
                const setZ = slides.map((el) => gsap.quickSetter(el, "zIndex"));

                let activeIdx = 0;
                const setActiveClass = (idx: number) => {
                    if (idx === activeIdx) return;
                    activeIdx = idx;
                    slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
                };
                slides.forEach((s, i) => s.classList.toggle("is-active", i === 0));

                const render = (p: number) => {
                    const n = slides.length;
                    const idx = clamp(0, n - 1, Math.round(p));
                    setActiveClass(idx);

                    for (let i = 0; i < n; i++) {
                        const r = i - p; // relativo a la activa

                        let y = 0;
                        let sc = 1;
                        let a = 1;
                        let z = 0;

                        if (r < -1.25) {
                            // ya salió completamente
                            y = -62;
                            sc = 0.99;
                            a = 0;
                            z = 0;
                        } else if (r < 0) {
                            // activa saliendo: NO se apaga a mitad, fade al final
                            const t = clamp(0, 1, -r); // 0..1
                            y = lerp(0, -62, t);
                            sc = lerp(1, 0.992, t);

                            const fadeT = clamp(0, 1, (t - 0.82) / 0.18);
                            a = lerp(1, 0, fadeT);

                            z = 2000;
                        } else {
                            // stack detrás
                            const rr = clamp(0, 3.6, r);
                            const slot = Math.min(3, rr);
                            const k = Math.floor(slot);
                            const f = slot - k;

                            const y0 = yForSlot(k);
                            const y1 = yForSlot(k + 1);
                            y = lerp(y0, y1, f);

                            const s0 = scaleForSlot(k);
                            const s1 = scaleForSlot(k + 1);
                            sc = lerp(s0, s1, f);

                            const fadeBack = clamp(0, 1, (r - 3.15) / 0.45);
                            a = lerp(1, 0, fadeBack);

                            z = 1500 - Math.round(r * 100);
                        }

                        setY[i](y);
                        setS[i](sc);
                        setA[i](a);
                        setZ[i](z);

                        slides[i].style.pointerEvents = i === idx ? "auto" : "none";
                    }
                };

                slides.forEach((s) => gsap.set(s, { willChange: "transform, opacity" }));
                render(0);

                const getEndPx = () => {
                    const vh = viewportEl.getBoundingClientRect().height || window.innerHeight;
                    const perCard = Math.max(900, vh * 1.2); // más recorrido = más fluido
                    return Math.round(perCard * (slides.length - 1));
                };

                const proxy = { p: 0 };

                const tween = gsap.to(proxy, {
                    p: slides.length - 1,
                    ease: "none",
                    immediateRender: false,
                    onUpdate: () => render(proxy.p),
                    scrollTrigger: {
                        trigger: sectionEl,
                        start: () => `top top+=${Math.round(getHeaderH())}`,
                        end: () => `+=${getEndPx()}`,
                        pin: pinEl,
                        pinSpacing: true,
                        scrub: 1.05,
                        anticipatePin: 2,
                        invalidateOnRefresh: true,
                        snap: {
                            snapTo: (value) => {
                                const steps = slides.length - 1;
                                return Math.round(value * steps) / steps;
                            },
                            duration: { min: 0.28, max: 0.7 },
                            ease: "power2.out",
                        },
                    },
                });

                const refresh = () => ScrollTrigger.refresh();
                const raf = requestAnimationFrame(refresh);

                const ro = new ResizeObserver(refresh);
                ro.observe(viewportEl);

                const onLoad = () => refresh();
                window.addEventListener("load", onLoad, { passive: true });

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (document as any).fonts?.ready?.then(refresh).catch(() => { });

                return () => {
                    window.removeEventListener("load", onLoad);
                    cancelAnimationFrame(raf);
                    ro.disconnect();
                    tween.scrollTrigger?.kill();
                    tween.kill();
                };
            });
        }, benefitsRef);

        return () => {
            mm.revert();
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
                                    SERVICIO
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
                                    {/* ====== SLIDE 1 ====== */}
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 1: Marca Única">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard01} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "25%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">MARCA ÚNICA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Identidad original que te diferencia
                                                    <br />
                                                    y evita verse genérico
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    {/* ====== SLIDE 2 ====== */}
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 2: Claridad Estratégica">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard02} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "50%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">CLARIDAD ESTRATÉGICA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Concepto, personalidad y estilo
                                                    <br />
                                                    bien definidos desde el inicio.
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    {/* ====== SLIDE 3 ====== */}
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 3: Gestión Sencilla">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard03} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "75%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">GESTIÓN SENCILLA</h3>
                                                <p className="BrandingBenefits__p">Edita y actualiza tu contenido sin complicaciones</p>
                                            </div>
                                        </article>
                                    </div>

                                    {/* ====== SLIDE 4 ====== */}
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 4: Soporte Continuo">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard04} alt="" aria-hidden="true" />

                                            <div className="BrandingBenefits__content">
                                                <div className="BrandingBenefits__progress" aria-hidden="true">
                                                    <span className="BrandingBenefits__progressFill" style={{ width: "100%" }} />
                                                </div>

                                                <h3 className="BrandingBenefits__h3">SOPORTE CONTINUO</h3>
                                                <p className="BrandingBenefits__p">
                                                    Ajustes mensuales de contenido con un diseñador asignado
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
            PROYECTOS (MARQUEE)
        ========================= */}
                <section className="BrandingProjects" id="proyectos">
                    <div className="BrandingWrap BrandingVignette">
                        <h2 className="BrandingProjects__title">ALGUNOS DE NUESTROS PROYECTOS</h2>

                        <div className="BrandingProjects__pill" role="region" aria-label="Marcas con las que trabajamos">
                            <div className="BrandingMarquee" aria-hidden="false">
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