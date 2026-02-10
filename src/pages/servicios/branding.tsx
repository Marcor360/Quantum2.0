import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./branding.css";

import { useLang } from "../../i18n/lang";
import { formatMoney } from "../../config/currency";

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
    const [lang] = useLang();
    const { amount, suffix } = formatMoney(3900, lang);

    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

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
                    const viewportEl = pinEl?.querySelector<HTMLElement>(".BrandingBenefits__viewport");
                    const trackEl = trackRef.current;

                    if (!sectionEl || !pinEl || !viewportEl || !trackEl) return;

                    const slides = gsap.utils.toArray<HTMLElement>(".BrandingBenefits__slide", trackEl);
                    const cards = gsap.utils.toArray<HTMLElement>(".BrandingBenefits__card", trackEl);
                    if (slides.length < 2) return;

                    sectionEl.classList.add("is-enhanced");

                    // FORZAR ESTILOS CRÍTICOS para producción
                    // Esto asegura que aunque el CSS falle o tarde, el JS controle el layout
                    gsap.set(slides, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: (i) => i,
                        autoAlpha: 1, // Asegurar visibilidad
                        yPercent: 110 // Estado inicial: abajo
                    });

                    // El primero visible
                    gsap.set(slides[0], { yPercent: 0 });

                    // Refrescar ScrollTrigger después de un tick para asegurar que el DOM esté listo
                    requestAnimationFrame(() => ScrollTrigger.refresh());

                    const tl = gsap.timeline();

                    slides.forEach((slide, i) => {
                        const label = `s${i}`;
                        tl.addLabel(label, i);

                        if (i < slides.length - 1) {
                            tl.to(slide, { yPercent: -110, duration: 1, ease: "none" }, label).fromTo(
                                slides[i + 1],
                                { yPercent: 110 },
                                { yPercent: 0, duration: 1, ease: "none" },
                                label
                            );
                        }
                    });

                    // hold final para que el último permanezca visible


                    let activeIdx = -1;

                    const setActive = (idx: number) => {
                        if (idx === activeIdx) return;
                        activeIdx = idx;

                        slides.forEach((s, i) => {
                            const isOn = i === idx;
                            s.classList.toggle("is-active", isOn);
                            s.style.pointerEvents = isOn ? "auto" : "none";

                            // asegura que el activo quede arriba (por si algún stacking raro lo tapa)
                            s.style.zIndex = isOn ? String(slides.length + 5) : String(i);
                        });

                        cards.forEach((c, i) => c.classList.toggle("is-active", i === idx));
                    };

                    setActive(0);

                    const headerOffset = Math.round(getHeaderH());

                    // IMPORTANTE: no hagas el end exageradamente largo, dificulta cruzar al último con wheel.
                    const STEP = () =>
                        Math.max(viewportEl.getBoundingClientRect().height || window.innerHeight * 0.7, window.innerWidth * 0.5, 1) * 1.05;

                    // Init z-index explicitly
                    gsap.set(slides, { zIndex: (i) => i, position: "absolute", left: 0, top: 0, width: "100%", height: "100%" });

                    const getEnd = () => STEP() * (slides.length + 1);

                    // ===== SNAP DIRECCIONAL POR PASOS (sin romper el scrub/efecto)


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
                            delay: 0.18, // más tiempo para acumular wheel antes de “asentar”
                            ease: "power1.inOut",
                        },

                        onUpdate: (self) => {
                            const idx = Math.round(self.progress * (slides.length - 1));
                            const clamped = Math.min(slides.length - 1, Math.max(0, idx));
                            setActive(clamped);
                        },

                        onRefresh: () => {
                            // refresh cuando cambia el tamaño
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            console.error("Branding ScrollTrigger init failed", err);
        }
    }, []);

    return (
        <>
            <Head />

            <main className="BrandingPage">
                {/* ========================= HERO ========================= */}
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
                                    Creamos sistemas de identidad que conectan estrategia, estética y significado, dando forma a marcas sólidas,
                                    memorables y consistentes.
                                </p>

                                <p className="BrandingHero__text">
                                    Nuestro servicio de Branding incluye conceptualización, diseño visual, lineamientos claros y un brand book
                                    profesional.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================= PRECIO ========================= */}
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
                                            <span className="BrandingPrice__number">{amount}</span>
                                            <span className="BrandingPrice__mxn">{suffix}</span>
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

                {/* ========================= BENEFICIOS ========================= */}
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
                                                <h3 className="BrandingBenefits__h3">MARCA ÚNICA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Identidad original que te diferencia
                                                    <br />y evita verse genérico
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 2: Claridad Estratégica">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard02} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">CLARIDAD ESTRATÉGICA</h3>
                                                <p className="BrandingBenefits__p">
                                                    Concepto, personalidad y estilo
                                                    <br />
                                                    bien definidos desde el inicio.
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 3: Gestión Sencilla">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard03} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">GESTIÓN SENCILLA</h3>
                                                <p className="BrandingBenefits__p">Edita y actualiza tu contenido sin complicaciones</p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 4: Soporte Continuo">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard04} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">SOPORTE CONTINUO</h3>
                                                <p className="BrandingBenefits__p">Ajustes mensuales de contenido con un diseñador asignado</p>
                                            </div>
                                        </article>
                                    </div>
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label="Beneficio 3: Gestión Sencilla">
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard03} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">GESTIÓN SENCILLA</h3>
                                                <p className="BrandingBenefits__p">Edita y actualiza tu contenido sin complicaciones</p>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================= PROYECTOS ========================= */}
                <section className="BrandingProjects" id="proyectos">
                    <div className="BrandingWrap BrandingVignette">
                        <h2 className="BrandingProjects__title">ALGUNOS DE NUESTROS PROYECTOS</h2>

                        <div className="BrandingProjects__pill" role="region" aria-label="Marcas con las que_toggle">
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