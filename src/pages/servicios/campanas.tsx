import { useMemo, useState, useEffect } from "react";
import Head from "../../components/Header";
import Footer from "../../components/Footer";
import "./campanas.css";
import "../../campanas-mobile.css";

import { useLang, type Lang } from "../../i18n/lang";
import { formatMoney } from "../../config/currency";

import AsteriscoSvg from "../../assets/svg/Branding/ASTERISCO.svg";
import SocialMediaMainImg from "/img/Socialmedia/imgprin.webp";
import SocialMediaTitle from "../../assets/svg/Titulos/serv/SOCIAL_MEDIA.svg";
import RedesCardFrame from "../../assets/svg/Ecomerce/Desktop/Primera tabla ecommerce_1.svg";




// Redes (public)
const REDES_BASE = "/img/Socialmedia/redes";
const redesIcon = {
    facebook: `${REDES_BASE}/Facebook.webp`,
    instagram: `${REDES_BASE}/Instagram.webp`,
    tiktok: `${REDES_BASE}/TikTok.webp`,
    x: `${REDES_BASE}/twitterX.webp`,
    linkedin: `${REDES_BASE}/Linkedin.webp`,
    pinterest: `${REDES_BASE}/Pinterest.webp`,
};

// Carrusel (public)
const PROJECTS = [
    { key: "hotel", src: "/img/Socialmedia/carucel/Hotel.webp", alt: "Hotel" },
    { key: "payrolling", src: "/img/Socialmedia/carucel/Payrolling.webp", alt: "Payrolling" },
    { key: "psm", src: "/img/Socialmedia/carucel/PSM.webp", alt: "PSM" },
    { key: "quantum", src: "/img/Socialmedia/carucel/Quantum.webp", alt: "Quantum" },
    { key: "stautek", src: "/img/Socialmedia/carucel/stautek.webp", alt: "Stautek" },
];

type NetworkKey = "facebook" | "instagram" | "tiktok" | "x" | "linkedin" | "pinterest";

const CAMPAIGN_COPY: Record<Lang, any> = {
    es: {
        heroSide: "SERVICIOS",
        heroTitle: "SOCIAL MEDIA",
        heroSubtitle: "Creamos presencia digital estratégica, conectamos con audiencias y generamos engagement constante.",
        heroBtn: "CONVERSEMOS",
        heroCopyLead: "En Quantum no solo publicamos contenido, ",
        heroCopyHighlight: "construimos presencia digital.",
        heroCopyText1: "Creamos estrategias de social media que conectan marca, mensaje y audiencia, dando forma a perfiles consistentes, relevantes y con impacto real.",
        heroCopyText2: "Nuestro servicio de Social Media incluye estrategia de contenido, dirección creativa, diseño visual y lineamientos claros para una comunicación continua y alineada a la marca.",

        networksTitle: "REDES SOCIALES PARA TU MARCA",
        networksSub: "Gestionamos las redes clave de tu marca para generar impacto y crecimiento.",
        networksIncludes: "¿QUÉ INCLUYE?",

        commercialTitle: "PRECIOS",
        commercialTitleYellow: "COMERCIALES",
        commercialSub: "Estos precios son para la compra de nuestros planes sin tener alguna de nuestras membresías de dueño de agencia.",

        agencyTitle: "PRECIOS",
        agencyTitleWhite: "PARA",
        agencyTitleYellow: "AGENCIAS",
        agencySub: "Estos precios son exclusivos para personas con membresía de agencia. Sobre este precio adicional tendrán un descuento extra del 10%, 15% o 25% de acuerdo a su tipo de membresía.",
        agencyCTA: "Sé dueño de tu agencia",

        billingMensual: "Mensual",
        billingAnual: "Anual",
        btnContract: "CONTRATAR",

        benefitsTitle: "Beneficios",
        benefitsWord: "BENEFICIOS",

        projectsTitle: "ALGUNOS DE NUESTROS PROYECTOS",
        prev: "Anterior",
        next: "Siguiente",

        networks: [
            {
                key: "facebook",
                label: "Facebook",
                includes: [
                    "12 diseños en el mes.",
                    "Parrilla de contenido con textos (copies) de cada una de las publicaciones.",
                    "Respuesta a mensajes y comentarios de la publicación, de lunes a viernes de 9:00 a 17:00 hrs (Hora centro de CDMX).",
                    "2 Propuestas para campañas pagadas.",
                    "Reporte mensual de crecimiento.",
                    "Un community manager asignado a tu negocio.",
                    "Un especialista en campañas asignado a tu negocio.",
                    "Configuración de Agente IA 24/7 para responder mensajes a tus clientes GRATIS* (Nota: se requiere plataforma High Lead para instalar).",
                ],
            },
            {
                key: "instagram",
                label: "Instagram",
                includes: [
                    "15 diseños en el mes.",
                    "Parrilla de contenido con textos (copies) de cada una de las publicaciones.",
                    "Respuesta a mensajes y comentarios de la publicación, de lunes a viernes de 9:00 a 17:00 hrs (Hora centro de CDMX).",
                    "2 Propuestas para campañas pagadas.",
                    "Reporte mensual de crecimiento.",
                    "Un community manager asignado a tu negocio.",
                    "Un especialista en campañas asignado a tu negocio.",
                ],
            },
            {
                key: "tiktok",
                label: "TikTok",
                includes: [
                    "1 community manager.",
                    "8 videos de TikTok en the month (editamos y publicamos tus TikToks en tu cuenta).",
                    "1 especialista en campañas.",
                    "Reporte mensual de crecimiento.",
                ],
            },
            {
                key: "x",
                label: "Twitter (X)",
                includes: [
                    "15 diseños en the month.",
                    "Parrilla de contenido con textos (copies) de cada una de las publicaciones.",
                    "Respuesta a mensajes y comentarios de the publicación, de lunes a viernes de 9:00 a 17:00 hrs (Hora centro de CDMX).",
                    "2 Propuestas para campañas pagadas.",
                    "Reporte mensual de crecimiento.",
                    "Un community manager asignado a tu negocio.",
                    "Un especialista en campañas asignado a tu negocio.",
                ],
            },
            {
                key: "linkedin",
                label: "LinkedIn",
                includes: [
                    "15 diseños en the month.",
                    "Parrilla de contenido con textos (copies) de cada una de las publicaciones.",
                    "Respuesta a mensajes y comentarios de the publicación, de lunes a viernes de 9:00 a 17:00 hrs (Hora centro de CDMX).",
                    "2 Propuestas para campañas pagadas.",
                    "Reporte mensual de crecimiento.",
                    "Un community manager asignado a tu negocio.",
                    "Un especialista en campañas asignado a tu negocio.",
                ],
            },
            {
                key: "pinterest",
                label: "Pinterest",
                includes: [
                    "Configuración de Pinterest Business.",
                    "15 pines al mes.",
                    "Diseño de fotografías y videos.",
                    "Creación de tableros específicos.",
                    "Vinculación al sitio web.",
                    "Propuesta de campaña pagada.",
                ],
            },
        ],
        plans: [
            { name: "ESENCIAL / MES", price: 3000, desc: "Una red social" },
            { name: "INDISPENSABLE / MES", price: 3500, desc: "Dos redes sociales" },
            { name: "TODO EN UNO / MES", price: 4000, desc: "Tres redes sociales" },
            { name: "PROFESIONAL / MES", price: 4500, desc: "Cuatro redes sociales" },
            { name: "OMNIPRESENTE / MES", price: 5000, desc: "Seis redes sociales" },
        ],
        agencyPlans: [
            { name: "ESENCIAL / MES", price: 1500, desc: "Una red social" },
            { name: "INDISPENSABLE / MES", price: 2000, desc: "Dos redes sociales" },
            { name: "TODO EN UNO / MES", price: 2500, desc: "Tres redes sociales" },
            { name: "PROFESIONAL / MES", price: 3000, desc: "Cuatro redes sociales" },
            { name: "OMNIPRESENTE / MES", price: 3500, desc: "Seis redes sociales" },
        ],
        benefits: [
            {
                title: "PRESENCIA CONSISTENTE",
                desc: "Comunicación alineada a tu marca en todas las plataformas.",
                alt: "Beneficio: Presencia consistente",
            },
            {
                title: "CONTENIDO ESTRATÉGICO",
                desc: "Comunicación alineada a tu marca en todas las plataformas.",
                alt: "Beneficio: Contenido estratégico",
            },
            {
                title: "MAYOR INTERACCIÓN",
                desc: "Contenido que genera engagement real con tu audiencia.",
                alt: "Beneficio: Mayor interacción",
            },
            {
                title: "CRECIMIENTO ORGÁNICO",
                desc: "Visibilidad constante que fortalece tu comunidad digital.",
                alt: "Beneficio: Crecimiento orgánico",
            },
        ]
    },
    en: {
        heroSide: "SERVICES",
        heroTitle: "SOCIAL MEDIA",
        heroSubtitle: "We create strategic digital presence, connect with audiences, and generate constant engagement.",
        heroBtn: "LET'S TALK",
        heroCopyLead: "At Quantum we don't just publish content, ",
        heroCopyHighlight: "we build a digital presence.",
        heroCopyText1: "We create social media strategies that connect brand, message, and audience, forming consistent, relevant profiles with real impact.",
        heroCopyText2: "Our Social Media service includes content strategy, creative direction, visual design, and clear guidelines for continuous and brand-aligned communication.",

        networksTitle: "SOCIAL NETWORKS FOR YOUR BRAND",
        networksSub: "We manage your brand's key networks to generate impact and growth.",
        networksIncludes: "WHAT'S INCLUDED?",

        commercialTitle: "COMMERCIAL",
        commercialTitleYellow: "PRICES",
        commercialSub: "These prices are for the purchase of our plans without having any of our agency owner memberships.",

        agencyTitle: "PRICES",
        agencyTitleWhite: "FOR",
        agencyTitleYellow: "AGENCIES",
        agencySub: "These prices are exclusive for people with an agency membership. On top of this price, they will have an extra discount of 10%, 15%, or 25% according to their type of membership.",
        agencyCTA: "Be your own agency owner",

        billingMensual: "Monthly",
        billingAnual: "Yearly",
        btnContract: "GET STARTED",

        benefitsTitle: "Benefits",
        benefitsWord: "BENEFITS",

        projectsTitle: "SOME OF OUR PROJECTS",
        prev: "Previous",
        next: "Next",

        networks: [
            {
                key: "facebook",
                label: "Facebook",
                includes: [
                    "12 designs per month.",
                    "Content grid with texts (copies) for each publication.",
                    "Response to messages and comments, Monday to Friday from 9:00 to 17:00 (CDMX Central Time).",
                    "2 Proposals for paid campaigns.",
                    "Monthly growth report.",
                    "A community manager assigned to your business.",
                    "A campaign specialist assigned to your business.",
                    "24/7 AI Agent configuration to answer customer messages for FREE* (Note: High Lead platform required to install).",
                ],
            },
            {
                key: "instagram",
                label: "Instagram",
                includes: [
                    "15 designs per month.",
                    "Content grid with texts (copies) for each publication.",
                    "Response to messages and comments, Monday to Friday from 9:00 to 17:00 (CDMX Central Time).",
                    "2 Proposals for paid campaigns.",
                    "Monthly growth report.",
                    "A community manager assigned to your business.",
                    "A campaign specialist assigned to your business.",
                ],
            },
            {
                key: "tiktok",
                label: "TikTok",
                includes: [
                    "1 community manager.",
                    "8 TikTok videos per month (we edit and publish your TikToks on your account).",
                    "1 campaign specialist.",
                    "Monthly growth report.",
                ],
            },
            {
                key: "x",
                label: "Twitter (X)",
                includes: [
                    "15 designs per month.",
                    "Content grid with texts (copies) for each publication.",
                    "Response to messages and comments, Monday to Friday from 9:00 to 17:00 (CDMX Central Time).",
                    "2 Proposals for paid campaigns.",
                    "Monthly growth report.",
                    "A community manager assigned to your business.",
                    "A campaign specialist assigned to your business.",
                ],
            },
            {
                key: "linkedin",
                label: "LinkedIn",
                includes: [
                    "15 designs per month.",
                    "Content grid with texts (copies) for each publication.",
                    "Response to messages and comments, Monday to Friday from 9:00 to 17:00 (CDMX Central Time).",
                    "2 Proposals for paid campaigns.",
                    "Monthly growth report.",
                    "A community manager assigned to your business.",
                    "A campaign specialist assigned to your business.",
                ],
            },
            {
                key: "pinterest",
                label: "Pinterest",
                includes: [
                    "Pinterest Business configuration.",
                    "15 pins per month.",
                    "Photo and video design.",
                    "Creation of specific boards.",
                    "Linking to website.",
                    "Paid campaign proposal.",
                ],
            },
        ],
        plans: [
            { name: "ESSENTIAL / MONTH", price: 3000, desc: "One social network" },
            { name: "INDISPENSABLE / MONTH", price: 3500, desc: "Two social networks" },
            { name: "ALL IN ONE / MONTH", price: 4000, desc: "Three social networks" },
            { name: "PROFESSIONAL / MONTH", price: 4500, desc: "Four social networks" },
            { name: "OMNIPRESENT / MONTH", price: 5000, desc: "Six social networks" },
        ],
        agencyPlans: [
            { name: "ESSENTIAL / MONTH", price: 1500, desc: "One social network" },
            { name: "INDISPENSABLE / MONTH", price: 2000, desc: "Two social networks" },
            { name: "ALL IN ONE / MONTH", price: 2500, desc: "Three social networks" },
            { name: "PROFESSIONAL / MONTH", price: 3000, desc: "Four social networks" },
            { name: "OMNIPRESENT / MONTH", price: 3500, desc: "Six social networks" },
        ],
        benefits: [
            {
                title: "CONSISTENT PRESENCE",
                desc: "Brand-aligned communication across every platform.",
                alt: "Benefit: Consistent presence",
            },
            {
                title: "STRATEGIC CONTENT",
                desc: "Brand-aligned communication across every platform.",
                alt: "Benefit: Strategic content",
            },
            {
                title: "MORE ENGAGEMENT",
                desc: "Content that drives real engagement with your audience.",
                alt: "Benefit: More engagement",
            },
            {
                title: "ORGANIC GROWTH",
                desc: "Constant visibility that strengthens your digital community.",
                alt: "Benefit: Organic growth",
            },
        ]
    }
};

export default function Campañas() {
    const [lang] = useLang();
    const t = useMemo(() => CAMPAIGN_COPY[lang], [lang]);

    const [activeNetwork, setActiveNetwork] = useState<NetworkKey>("facebook");
    const [billing, setBilling] = useState<"mensual" | "anual">("mensual");
    const [activeProject, setActiveProject] = useState<number>(2);

    // Touch logic
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            goNext();
        } else if (isRightSwipe) {
            goPrev();
        }
    };


    const active = useMemo(() => {
        const found = t.networks.find((n: any) => n.key === activeNetwork);
        return { ...found, icon: (redesIcon as any)[activeNetwork] };
    }, [t, activeNetwork]);

    const goPrev = () => setActiveProject((i) => (i - 1 + PROJECTS.length) % PROJECTS.length);
    const goNext = () => setActiveProject((i) => (i + 1) % PROJECTS.length);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Head />

            <main className="CampanasPage">
                {/* HERO */}
                <section className="SMHero">
                    <div className="SMWrap">
                        <div className="SMHeroTop" />

                        <h1 className="SMHeroTitle">
                            <img src={SocialMediaTitle} alt="SOCIAL MEDIA" />
                        </h1>

                        <p className="SMHeroSubtitle">{t.heroSubtitle}</p>

                        <a className="SMBtn" href="#contacto">
                            {t.heroBtn}
                        </a>

                        <div className="SMHeroGrid">
                            <div className="SMHeroArt">
                                <div className="SMHeroAsteriskWrap" aria-hidden="true">
                                    <img className="SMHeroAsterisk" src={AsteriscoSvg} alt="" />
                                    <img className="SMHeroObjFront" src={SocialMediaMainImg} alt="" />
                                </div>
                            </div>

                            <div className="SMHeroCopy">
                                <p className="SMCopyLead">
                                    {t.heroCopyLead}
                                    <span className="SMY">{t.heroCopyHighlight}</span>
                                </p>
                                <p className="SMCopyText">{t.heroCopyText1}</p>
                                <p className="SMCopyText">{t.heroCopyText2}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* REDES */}
                <section className="SMSection SMNetworks">
                    <div className="SMWrap">
                        <div className="SMPanel">
                            <h2 className="SMH2 SMH2--pink">{t.networksTitle}</h2>
                            <p className="SMSub">{t.networksSub}</p>

                            <div className="SMTabs" role="tablist" aria-label="Redes sociales">
                                {t.networks.map((n: any) => (
                                    <button
                                        key={n.key}
                                        className={`SMTab ${activeNetwork === n.key ? "is-active" : ""}`}
                                        onClick={() => setActiveNetwork(n.key)}
                                        type="button"
                                        role="tab"
                                        aria-selected={activeNetwork === n.key}
                                    >
                                        {n.label}
                                    </button>
                                ))}
                            </div>

                            <div className="SMNetworksCard">
                                <img className="SMNetworksFrame" src={RedesCardFrame} alt="" aria-hidden="true" />

                                <div className="SMNetworksInner">
                                    <div className="SMNetworksIcon">
                                        <img src={active.icon} alt={active.label} />
                                    </div>

                                    <div className="SMNetworksInfo">
                                        <h3 className="SMH3">{t.networksIncludes}</h3>
                                        <div className="SMHr" />
                                        <ul className="SMList">
                                            {active.includes.map((incl: string, idx: number) => (
                                                <li key={`${active.key}-${idx}`}>{incl}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <img className="SMAsterisco SMAsterisco--net" src={AsteriscoSvg} alt="" aria-hidden="true" />
                        </div>
                    </div>
                </section>

                {/* PRECIOS COMERCIALES */}
                <section className="SMSection">
                    <div className="SMWrap">
                        <div className="SMPanel">
                            <h2 className="SMH2">
                                <span className="SMH2--pink">{t.commercialTitle}</span>{" "}
                                <span className="SMH2--yellow">{t.commercialTitleYellow}</span>
                            </h2>

                            <p className="SMSub">{t.commercialSub}</p>

                            <div className="SMBilling">
                                <button
                                    type="button"
                                    className={`SMBillingBtn ${billing === "mensual" ? "is-active" : ""}`}
                                    onClick={() => setBilling("mensual")}
                                >
                                    {t.billingMensual}
                                </button>
                                <button
                                    type="button"
                                    className={`SMBillingBtn ${billing === "anual" ? "is-active" : ""}`}
                                    onClick={() => setBilling("anual")}
                                >
                                    {t.billingAnual}
                                </button>
                            </div>

                            <div className="SMPriceGrid">
                                {t.plans.map((p: any) => {
                                    const { amount, suffix } = formatMoney(p.price, lang);
                                    return (
                                        <article className="SMPriceCard" key={p.name}>
                                            <div className="SMPriceName">{p.name}</div>
                                            <div className="SMPriceValue">
                                                <span className="SMPriceDollar">$</span>
                                                <span className="SMPriceNum">{amount}</span>
                                                <span className="SMPriceCcy">{suffix}</span>
                                            </div>
                                            <div className="SMPriceDesc">{p.desc}</div>
                                            <a className="SMPriceBtn" href="#contacto">
                                                {t.btnContract}
                                            </a>
                                        </article>
                                    );
                                })}
                            </div>

                            <img className="SMAsterisco SMAsterisco--prices1" src={AsteriscoSvg} alt="" aria-hidden="true" />
                        </div>
                    </div>
                </section>

                {/* PRECIOS PARA AGENCIAS */}
                <section className="SMSection">
                    <div className="SMWrap">
                        <div className="SMPanel">
                            <h2 className="SMH2">
                                <span className="SMH2--pink">{t.agencyTitle}</span>{" "}
                                <span className="SMH2--white">{t.agencyTitleWhite}</span>{" "}
                                <span className="SMH2--yellow">{t.agencyTitleYellow}</span>
                            </h2>

                            <p className="SMSub">{t.agencySub}</p>

                            <div className="SMBilling">
                                <button
                                    type="button"
                                    className={`SMBillingBtn ${billing === "mensual" ? "is-active" : ""}`}
                                    onClick={() => setBilling("mensual")}
                                >
                                    {t.billingMensual}
                                </button>
                                <button
                                    type="button"
                                    className={`SMBillingBtn ${billing === "anual" ? "is-active" : ""}`}
                                    onClick={() => setBilling("anual")}
                                >
                                    {t.billingAnual}
                                </button>
                            </div>

                            <div className="SMPriceGrid">
                                {t.agencyPlans.map((p: any) => {
                                    const { amount, suffix } = formatMoney(p.price, lang);
                                    return (
                                        <article className="SMPriceCard" key={p.name}>
                                            <div className="SMPriceName">{p.name}</div>
                                            <div className="SMPriceValue">
                                                <span className="SMPriceDollar">$</span>
                                                <span className="SMPriceNum">{amount}</span>
                                                <span className="SMPriceCcy">{suffix}</span>
                                            </div>
                                            <div className="SMPriceDesc">{p.desc}</div>
                                            <a className="SMPriceBtn" href="#contacto">
                                                {t.btnContract}
                                            </a>
                                        </article>
                                    );
                                })}
                            </div>

                            <div className="SMAgencyCTA">
                                <a className="SMBtn SMBtn--ghost" href="#contacto">
                                    {t.agencyCTA}
                                </a>
                            </div>

                            <img className="SMAsterisco SMAsterisco--prices2" src={AsteriscoSvg} alt="" aria-hidden="true" />
                        </div>
                    </div>
                </section>

                {/* PROYECTOS */}
                <section className="SMSection SMProjects">
                    <div className="SMWrap">
                        <h2 className="SMH2 SMH2--center SMH2--yellow">{t.projectsTitle}</h2>

                        <div className="SMCarousel">
                            <button className="SMCarouselNav SMCarouselNav--left" onClick={goPrev} type="button" aria-label={t.prev}>
                                ‹
                            </button>

                            <div
                                className="SMCarouselStage"
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                            >
                                {PROJECTS.map((p, idx) => {
                                    // distancia circular (para efecto coverflow)
                                    const raw = idx - activeProject;
                                    const half = Math.floor(PROJECTS.length / 2);
                                    let dist = raw;

                                    if (dist > half) dist -= PROJECTS.length;
                                    else if (dist < -half) dist += PROJECTS.length;

                                    let cls = "off";
                                    if (dist === 0) cls = "pos0";
                                    else if (dist === 1) cls = "pos1";
                                    else if (dist === 2) cls = "pos2";
                                    else if (dist === -1) cls = "neg1";
                                    else if (dist === -2) cls = "neg2";

                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            className={`SMCarouselItem ${cls}`}
                                            onClick={() => setActiveProject(idx)}
                                            aria-label={`Ver proyecto ${p.alt}`}
                                            aria-hidden={cls === "off"}
                                            tabIndex={cls === "off" ? -1 : 0}
                                        >
                                            <img src={p.src} alt={p.alt} />
                                        </button>
                                    );
                                })}
                            </div>

                            <button className="SMCarouselNav SMCarouselNav--right" onClick={goNext} type="button" aria-label={t.next}>
                                ›
                            </button>
                        </div>
                    </div>
                </section>
            </main >

            <Footer />
        </>
    );
}
