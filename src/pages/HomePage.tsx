import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeLogoSplash from "../components/HomeLogoSplash/HomeLogoSplash";
import LogoText from "../assets/svg/Logo-text.svg";
import "../index.css";

const MOBILE_MQ = "(max-width: 768px)";

function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}

const safeSrc = (p: string) => encodeURI(p);

type ServiceCard = {
  key: "branding" | "ecomerce" | "app-ia" | "campañas";
  title: string;
  desc: string;
  to: string;
  imgDesktop: string;
  imgMobile: string;
  badge: string;
};

const SERVICES: ServiceCard[] = [
  {
    key: "branding",
    title: "Branding",
    desc: "Creamos ADN estratégico para tu marca, elevamos reconocimiento y fidelizamos audiencias.",
    to: "/servicios/branding",
    imgDesktop: "/img/branding.webp",
    imgMobile: "/img/branding-mobile.webp",
    badge: "BRANDING",
  },
  {
    key: "ecomerce",
    title: "E-commerce",
    desc: "Tiendas rápidas y optimizadas para convertir: catálogo, pagos, analítica y escalabilidad.",
    to: "/servicios/ecomerce",
    imgDesktop: "/img/e-commerce.webp",
    imgMobile: "/img/e-commerce-mobile.webp",
    badge: "E-COMMERCE",
  },
  {
    key: "app-ia",
    title: "Apps & I.A",
    desc: "Automatización, agentes y sistemas a medida para mejorar procesos, foco y productividad.",
    to: "/servicios/app-e-ia",
    imgDesktop: "/img/appsIA.webp",
    imgMobile: "/img/appsIA-mobile.webp",
    badge: "APPS & I.A",
  },
  {
    key: "campañas",
    title: "Campañas",
    desc: "Estrategia creativa + pauta para generar demanda, leads y ventas con medición real.",
    to: "/servicios/campañas",
    imgDesktop: "/img/campañas.webp",
    imgMobile: "/img/campañas-mobiles.webp",
    badge: "CAMPAÑAS",
  },
];

export default function HomePage() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [dismissed, setDismissed] = useState(false);
  const hasSessionFlag = sessionStorage.getItem("homeSplashPlayed") === "1";
  const showSplash = isHome && !hasSessionFlag && !dismissed;

  // ===== Video responsive (carga 1 solo MP4) =====
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    setIsMobile(mq.matches);

    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  const heroVideoSrc = useMemo(
    () => (isMobile ? "/video/Banner-Video-mobile.mp4" : "/video/Banner-Video-Web.mp4"),
    [isMobile]
  );

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => { });
  }, [heroVideoSrc]);

  // ===== Splash =====
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("homeSplashPlayed");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleSplashDone = useCallback(() => {
    sessionStorage.setItem("homeSplashPlayed", "1");
    setDismissed(true);
  }, []);

  // ===== Rotación de palabra: estrategia / potencial / contenido =====
  const words = useMemo(() => ["estrategia", "potencial", "contenido"] as const, []);
  const [wordIndex, setWordIndex] = useState(0);
  const [wordSpin, setWordSpin] = useState(false);

  const t1 = useRef<number | null>(null);
  const t2 = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordSpin(true);

      if (t1.current) window.clearTimeout(t1.current);
      if (t2.current) window.clearTimeout(t2.current);

      // Cambiamos la palabra a mitad del giro
      t1.current = window.setTimeout(() => {
        setWordIndex((i) => (i + 1) % words.length);
      }, 320);

      // Quitamos clase para reiniciar la animación en el siguiente tick
      t2.current = window.setTimeout(() => {
        setWordSpin(false);
      }, 680);
    }, 2600);

    return () => {
      window.clearInterval(interval);
      if (t1.current) window.clearTimeout(t1.current);
      if (t2.current) window.clearTimeout(t2.current);
    };
  }, [words.length]);

  if (showSplash) {
    return <HomeLogoSplash onDone={handleSplashDone} />;
  }

  return (
    <>
      <Header />

      <main>
        {/* ===== HERO VIDEO ===== */}
        <section className="home-hero" aria-label="Banner principal">
          <div className="home-hero__media" aria-hidden="true">
            <video
              ref={videoRef}
              className="home-hero__video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              disablePictureInPicture
              disableRemotePlayback
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="home-hero__overlay" />
          </div>
        </section>

        {/* ===== SECCIÓN SERVICIOS (como tu imagen) ===== */}
        <section id="servicios" className="home-services" aria-label="Servicios">
          <div className="Conteiner">
            <div className="home-services__headline">
              <img className="home-services__logo" src={LogoText} alt="Quantum" />

              <h2 className="home-services__title">
                es{" "}
                <span className="q-rotateWord" aria-live="polite">
                  <span className={`q-rotateWord__inner ${wordSpin ? "is-animating" : ""}`}>
                    {words[wordIndex]}
                  </span>
                </span>
                <span className="home-services__comma">,</span>
              </h2>
            </div>

            <div className="home-services__grid">
              {SERVICES.map((s) => (
                <Link key={s.key} to={s.to} className={`q-svcCard q-svcCard--${s.key}`}>
                  <picture className="q-svcCard__media" aria-hidden="true">
                    <source media={MOBILE_MQ} srcSet={safeSrc(s.imgMobile)} />
                    <img src={safeSrc(s.imgDesktop)} alt="" loading="lazy" decoding="async" />
                  </picture>

                  <div className="q-svcCard__shade" aria-hidden="true" />

                  <div className="q-svcCard__overlay">
                    <div className="q-svcCard__content">
                      <div className="q-svcCard__top">
                        <h3 className="q-svcCard__title">{s.title}</h3>
                        <span className="q-svcCard__badge">{s.badge}</span>
                      </div>

                      <p className="q-svcCard__desc">{s.desc}</p>

                      <span className="q-svcCard__cta">
                        Ver más <span className="q-svcCard__arrow" aria-hidden="true">›</span>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* resto del home (si quieres) */}
        <section id="contacto" className="Conteiner" style={{ padding: "60px 0" }} />
      </main>

      <Footer />
    </>
  );
}
