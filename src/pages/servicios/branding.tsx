import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./branding.css";

import { useLang, type Lang } from "../../i18n/lang";
// Si no exportas Lang, usa esto y cambia el import a: import { useLang } from "../../i18n/lang";
// type Lang = "es" | "en";

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
import BrandingTitleSvg from "../../assets/svg/Titulos/serv/BRANDING.svg";

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

const BRANDING_COPY: Record<
    Lang,
    {
        heroServices: string;
        heroTitle: string;
        heroSubtitle: string;
        heroBtn: string;

        leadA: string;
        leadHighlight: string;

        text1: string;
        text2: string;

        priceTitle: string;
        priceKicker: string;
        priceCardAria: string;
        priceCardTitle: string;
        priceBtn: string;

        benefits: Array<{
            aria: string;
            h: string;
            p: string;
        }>;

        projectsTitle: string;
        marqueeAria: string;
    }
> = {
    es: {
        heroServices: "SERVICIOS",
        heroTitle: "BRANDING",
        heroSubtitle: "Creamos ADN estratégico para tu marca, elevamos reconocimiento y fidelizamos audiencias.",
        heroBtn: "CONVERSEMOS",

        leadA: "En Quantum no diseñamos logotipos,",
        leadHighlight: "diseñamos marcas.",

        text1:
            "Creamos sistemas de identidad que conectan estrategia, estética y significado, dando forma a marcas sólidas, memorables y consistentes.",
        text2:
            "Nuestro servicio de Branding incluye conceptualización, diseño visual, lineamientos claros y un brand book profesional.",

        priceTitle: "PRECIO",
        priceKicker: "CONSULTA NUESTROS PLANES",
        priceCardAria: "Precio de Diseño de Marca",
        priceCardTitle: "DISEÑO DE MARCA",
        priceBtn: "CONTRATAR",

        benefits: [
            {
                aria: "Beneficio 1: Marca Única",
                h: "MARCA ÚNICA",
                p: "Identidad original que te diferencia\ny evita verse genérico",
            },
            {
                aria: "Beneficio 2: Claridad Estratégica",
                h: "CLARIDAD ESTRATÉGICA",
                p: "Concepto, personalidad y estilo\nbien definidos desde el inicio.",
            },
            {
                aria: "Beneficio 3: Gestión Sencilla",
                h: "GESTIÓN SENCILLA",
                p: "Edita y actualiza tu contenido sin complicaciones",
            },
            {
                aria: "Beneficio 4: Soporte Continuo",
                h: "SOPORTE CONTINUO",
                p: "Ajustes mensuales de contenido con un diseñador asignado",
            },
        ],

        projectsTitle: "ALGUNOS DE NUESTROS PROYECTOS",
        marqueeAria: "Marcas con las que trabajamos",
    },

    en: {
        heroServices: "SERVICES",
        heroTitle: "BRANDING",
        heroSubtitle: "We build strategic DNA for your brand, increase awareness, and build audience loyalty.",
        heroBtn: "LET’S TALK",

        leadA: "At Quantum, we don’t design logos,",
        leadHighlight: "we design brands.",

        text1:
            "We create identity systems that connect strategy, aesthetics, and meaning—shaping strong, memorable, consistent brands.",
        text2:
            "Our Branding service includes concept development, visual design, clear guidelines, and a professional brand book.",

        priceTitle: "PRICE",
        priceKicker: "CHECK OUR PLANS",
        priceCardAria: "Brand Design Price",
        priceCardTitle: "BRAND DESIGN",
        priceBtn: "GET STARTED",

        benefits: [
            {
                aria: "Benefit 1: Unique Brand",
                h: "UNIQUE BRAND",
                p: "An original identity that sets you apart\nand avoids looking generic",
            },
            {
                aria: "Benefit 2: Strategic Clarity",
                h: "STRATEGIC CLARITY",
                p: "Concept, personality, and style\nclearly defined from the start.",
            },
            {
                aria: "Benefit 3: Easy Management",
                h: "EASY MANAGEMENT",
                p: "Edit and update your content without complications",
            },
            {
                aria: "Benefit 4: Ongoing Support",
                h: "ONGOING SUPPORT",
                p: "Monthly content adjustments with an assigned designer",
            },
        ],

        projectsTitle: "SOME OF OUR PROJECTS",
        marqueeAria: "Brands we’ve worked with",
    },
};

export default function Branding() {
    const [lang] = useLang();
    const t = useMemo(() => BRANDING_COPY[lang], [lang]);

    const { amount, suffix } = formatMoney(3900, lang);

    const benefitsRef = useRef<HTMLElement | null>(null);
    const pinRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const spacerRef = useRef<HTMLDivElement | null>(null);

    // Siempre iniciar arriba al cargar la página
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
                    const viewportEl = pinEl?.querySelector<HTMLElement>(".BrandingBenefits__viewport");
                    const trackEl = trackRef.current;

                    if (!sectionEl || !pinEl || !viewportEl || !trackEl) return;

                    // Spacer manual para evitar rebote de pinSpacing
                    let spacer = spacerRef.current;
                    if (!spacer) {
                        spacer = document.createElement("div");
                        spacer.className = "BrandingBenefits__spacer";
                        spacerRef.current = spacer;
                        sectionEl.appendChild(spacer);
                    }

                    const slides = gsap.utils.toArray<HTMLElement>(".BrandingBenefits__slide", trackEl);
                    const cards = gsap.utils.toArray<HTMLElement>(".BrandingBenefits__card", trackEl);
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

                    // Scroll distance por slide; menos multiplicador para dar más control al usuario
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
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                                <h1 className="BrandingHero__title">
                                    <img src={BrandingTitleSvg} alt="BRANDING" />
                                </h1>
                            </div>

                            <p className="BrandingHero__subtitle">{t.heroSubtitle}</p>

                            <a className="BrandingBtn BrandingBtn--outline" href="/contacto">
                                {t.heroBtn}
                            </a>
                        </div>

                        <div className="BrandingHero__bottom">
                            <div className="BrandingHero__art" aria-hidden="true">
                                <img className="BrandingHero__asterisco" src={AsteriscoBg} alt="" />
                                <img className="BrandingHero__img" src={HERO_IMG} alt="" loading="eager" />
                            </div>

                            <div className="BrandingHero__copy">
                                <p className="BrandingHero__lead">
                                    {t.leadA} <span className="BrandingText--yellow">{t.leadHighlight}</span>
                                </p>

                                <p className="BrandingHero__text">{t.text1}</p>

                                <p className="BrandingHero__text">{t.text2}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================= PRECIO ========================= */}
                < section className="BrandingPrice" id="precio" >
                    <div className="BrandingWrap BrandingVignette">
                        <div className="BrandingPrice__grid">
                            <div className="BrandingPrice__left">
                                <h2 className="BrandingPrice__title">{t.priceTitle}</h2>
                                <p className="BrandingPrice__kicker">{t.priceKicker}</p>
                            </div>

                            <div className="BrandingPrice__right">
                                <div className="BrandingPrice__card" role="group" aria-label={t.priceCardAria}>
                                    <img className="BrandingPrice__cardBg" src={PriceCardBg} alt="" aria-hidden="true" />

                                    <div className="BrandingPrice__cardContent">
                                        <p className="BrandingPrice__cardTitle">{t.priceCardTitle}</p>

                                        <div className="BrandingPrice__divider" aria-hidden="true" />

                                        <div className="BrandingPrice__amount">
                                            <span className="BrandingPrice__currency">$</span>
                                            <span className="BrandingPrice__number">{amount}</span>
                                            <span className="BrandingPrice__mxn">{suffix}</span>
                                        </div>

                                        <div className="BrandingPrice__divider" aria-hidden="true" />

                                        <a className="BrandingBtn BrandingBtn--solid" href="/contacto">
                                            {t.priceBtn}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* ========================= BENEFICIOS ========================= */}
                < section className="BrandingBenefits" id="beneficios" ref={benefitsRef} >
                    <div className="BrandingWrap BrandingVignette">
                        <div className="BrandingBenefits__pin" ref={pinRef}>
                            <div className="BrandingBenefits__left BrandingBenefits__left--pinned" aria-hidden="true">
                                <img className="BrandingBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                            </div>

                            <div className="BrandingBenefits__viewport">
                                <div className="BrandingBenefits__track" ref={trackRef}>
                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label={t.benefits[0].aria}>
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard01} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">{t.benefits[0].h}</h3>
                                                <p className="BrandingBenefits__p">
                                                    {t.benefits[0].p.split("\n").map((line, idx) => (
                                                        <span key={idx}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label={t.benefits[1].aria}>
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard02} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">{t.benefits[1].h}</h3>
                                                <p className="BrandingBenefits__p">
                                                    {t.benefits[1].p.split("\n").map((line, idx) => (
                                                        <span key={idx}>
                                                            {line}
                                                            <br />
                                                        </span>
                                                    ))}
                                                </p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label={t.benefits[2].aria}>
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard03} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">{t.benefits[2].h}</h3>
                                                <p className="BrandingBenefits__p">{t.benefits[2].p}</p>
                                            </div>
                                        </article>
                                    </div>

                                    <div className="BrandingBenefits__slide">
                                        <article className="BrandingBenefits__card" aria-label={t.benefits[3].aria}>
                                            <img className="BrandingBenefits__cardBg" src={BenefitsCard04} alt="" aria-hidden="true" />
                                            <div className="BrandingBenefits__content">
                                                <h3 className="BrandingBenefits__h3">{t.benefits[3].h}</h3>
                                                <p className="BrandingBenefits__p">{t.benefits[3].p}</p>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* ========================= PROYECTOS ========================= */}
                < section className="BrandingProjects" id="proyectos" >
                    <div className="BrandingWrap BrandingVignette">
                        <h2 className="BrandingProjects__title">{t.projectsTitle}</h2>

                        <div className="BrandingProjects__pill" role="region" aria-label={t.marqueeAria}>
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
                </section >
            </main >

            <Footer />
        </>
    );
}
import { useEffect } from "react";
