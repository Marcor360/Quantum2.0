import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./branding.css";

// ===== Assets Branding =====
import AsteriscoBg from "../../assets/svg/Branding/ASTERISCO.svg";
import PriceCardBg from "../../assets/svg/Branding/tarejta precio branding.svg";
import BenefitsTitleSvg from "../../assets/svg/Branding/Beneficios y degradado.svg";
import BenefitsCardBg from "../../assets/svg/Branding/tarjetas beneficios.svg";

// ===== Imagen principal (public) =====
const HERO_IMG = "/img/Branding/IMG_branding_principal_calidad.png";
const TRAZOS_IMG = "/img/Branding/quantum trazos.png";

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
                            <span className="BrandingHero__services" aria-hidden="true">
                                SERVICIOS
                            </span>

                            <h1 className="BrandingHero__title">BRANDING</h1>

                            <p className="BrandingHero__subtitle">
                                Creamos ADN estratégico para tu marca, elevamos reconocimiento y fidelizamos audiencias.
                            </p>

                            <a className="BrandingBtn BrandingBtn--outline" href="/#contacto">
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
                                    <img className="BrandingPrice__deco BrandingPrice__deco--squiggle" src={TRAZOS_IMG} alt="" aria-hidden="true" />
                                    <img className="BrandingPrice__deco BrandingPrice__deco--star" src={AsteriscoBg} alt="" aria-hidden="true" />
                                    <img className="BrandingPrice__cardBg" src={PriceCardBg} alt="" aria-hidden="true" />

                                    <div className="BrandingPrice__cardContent">
                                        <p className="BrandingPrice__cardTitle">DISEÑO DE MARCA</p>

                                        <div className="BrandingPrice__divider" aria-hidden="true" />

                                        <div className="BrandingPrice__amount">
                                            <span className="BrandingPrice__currency">$</span>
                                            <span className="BrandingPrice__number">5,999</span>
                                            <span className="BrandingPrice__mxn">MXN</span>
                                        </div>

                                        <div className="BrandingPrice__divider" aria-hidden="true" />

                                        <a className="BrandingBtn BrandingBtn--solid" href="/#contacto">
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
                <section className="BrandingBenefits" id="beneficios">
                    <div className="BrandingWrap BrandingVignette">
                        <div className="BrandingBenefits__stack">
                            {/* Beneficio 1 */}
                            <div className="BrandingBenefits__row">
                                <div className="BrandingBenefits__left" aria-hidden="true">
                                    <img className="BrandingBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                                </div>

                                <article className="BrandingBenefits__card" aria-label="Beneficio 1: Marca Única">
                                    <img className="BrandingBenefits__deco" src={TRAZOS_IMG} alt="" aria-hidden="true" />
                                    <img className="BrandingBenefits__cardBg" src={BenefitsCardBg} alt="" aria-hidden="true" />

                                    <div className="BrandingBenefits__content">
                                        <div className="BrandingBenefits__progress" aria-hidden="true">
                                            <span className="BrandingBenefits__progressFill" style={{ width: "24%" }} />
                                        </div>

                                        <h3 className="BrandingBenefits__h3">MARCA ÚNICA</h3>
                                        <p className="BrandingBenefits__p">Identidad original que te diferencia y evita verse genérico.</p>

                                        <span className="BrandingBenefits__num" aria-hidden="true">
                                            1
                                        </span>
                                    </div>
                                </article>
                            </div>

                            {/* Beneficio 2 (con overlap en desktop) */}
                            <div className="BrandingBenefits__row BrandingBenefits__row--overlap">
                                <div className="BrandingBenefits__left" aria-hidden="true">
                                    <img className="BrandingBenefits__titleSvg" src={BenefitsTitleSvg} alt="" />
                                </div>

                                <article className="BrandingBenefits__card" aria-label="Beneficio 2: Claridad Estratégica">
                                    <img className="BrandingBenefits__deco" src={TRAZOS_IMG} alt="" aria-hidden="true" />
                                    <img className="BrandingBenefits__cardBg" src={BenefitsCardBg} alt="" aria-hidden="true" />

                                    <div className="BrandingBenefits__content">
                                        <div className="BrandingBenefits__progress" aria-hidden="true">
                                            <span className="BrandingBenefits__progressFill" style={{ width: "58%" }} />
                                        </div>

                                        <h3 className="BrandingBenefits__h3">CLARIDAD ESTRATÉGICA</h3>
                                        <p className="BrandingBenefits__p">
                                            Concepto, personalidad y estilo bien definidos desde el inicio.
                                        </p>

                                        <span className="BrandingBenefits__num" aria-hidden="true">
                                            2
                                        </span>
                                    </div>
                                </article>
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
