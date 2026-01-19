import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeLogoSplash from "../components/HomeLogoSplash/HomeLogoSplash";
const MOBILE_MQ = "(max-width: 768px)";

function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}

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

    // Compatibilidad Safari viejo
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    // Asegura estado correcto al montar
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
    // Fuerza recarga del video al cambiar src por resize/orientación
    const v = videoRef.current;
    if (!v) return;
    v.load();

    // Intento de autoplay (si falla por políticas, no revienta)
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
        {/* Secciones siguientes (placeholders) */}
        <section id="servicios" className="Conteiner" style={{ padding: "60px 0" }}></section>

        <section className="Conteiner" style={{ padding: "60px 0" }}></section>
      </main>
      <Footer />
    </>
  );
}
