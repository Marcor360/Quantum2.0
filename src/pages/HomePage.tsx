// src/pages/HomePage.tsx
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeLogoSplash from "../components/HomeLogoSplash/HomeLogoSplash";
import LogoText from "../assets/svg/Logo-text.svg";

// ===== Quantum 360 SVGs =====
import Quantum360Fill from "../assets/svg/360/360 solo fill.svg";
import Quantum360Outline from "../assets/svg/360/360 sin relleno.svg";
import Cursor360Svg from "../assets/svg/360/CirculoCursor.svg";
import ResolveCenter from "../assets/svg/360/centrado en el cliente.svg";
import ResolveData from "../assets/svg/360/data driven.svg";
import ResolveChannels from "../assets/svg/360/nuevas canales comerciales.svg";
import ResolveOps from "../assets/svg/360/transformación operativa_1.svg";
import ResolvePink from "../assets/svg/360/circulo rosa_que resolvemos.svg";
import MundoQuantum from "../assets/svg/360/mundo-quantum.svg";

import "../index.css";

const MOBILE_MQ = "(max-width: 768px)";

gsap.registerPlugin(ScrollTrigger);

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

  // Servicios scroll horizontal desktop
  const servicesPinRef = useRef<HTMLDivElement | null>(null);
  const servicesTrackRef = useRef<HTMLDivElement | null>(null);

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

  // ===== Servicios: ScrollTrigger horizontal solo en desktop =====
  useEffect(() => {
    if (typeof window === "undefined") return;

    const getHeaderHeight = () => {
      const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
      const parsed = Number.parseFloat(raw);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    const mm = gsap.matchMedia();

    if (!showSplash) {
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = servicesPinRef.current;
        const track = servicesTrackRef.current;
        if (!pin || !track) return undefined;

        const panels = track.querySelectorAll<HTMLElement>(".home-services__panel");
        const snapValue = panels.length > 1 ? 1 / (panels.length - 1) : 1;

        const tween = gsap.to(track, {
          x: () => {
            const distance = track.scrollWidth - pin.clientWidth;
            return distance > 0 ? -distance : 0;
          },
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: () => `top top+=${getHeaderHeight()}`,
            end: () => {
              const distance = track.scrollWidth - pin.clientWidth;
              return `+=${distance > 0 ? distance : 0}`;
            },
            pin: true,
            scrub: 0.9,
            snap: snapValue,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }

    return () => {
      mm.revert();
    };
  }, [showSplash]);

  // ===== Quantum 360: cursor custom + “borrado” por mask =====
  const q360ArtRef = useRef<HTMLDivElement | null>(null);
  const q360FillRef = useRef<HTMLDivElement | null>(null);
  const q360CursorRef = useRef<HTMLDivElement | null>(null);
  const q360GlobeRef = useRef<HTMLDivElement | null>(null);
  const q360GlobeImgRef = useRef<HTMLImageElement | null>(null);

  const [q360CursorOk, setQ360CursorOk] = useState(false);
  const [q360Active, setQ360Active] = useState(false); // cursor visible / cursor:none
  const [q360Erasing, setQ360Erasing] = useState(false); // activa el mask

  const q360Target = useRef({ x: 0, y: 0 });
  const q360Current = useRef({ x: 0, y: 0 });
  const q360Raf = useRef<number | null>(null);

  const resolveSlides = useMemo(
    () => [
      { src: ResolveData, alt: "Data Driven" },
      { src: ResolveCenter, alt: "Centrado en el cliente" },
      { src: ResolveChannels, alt: "Nuevos canales comerciales" },
      { src: ResolveOps, alt: "Transformación operativa" },
    ],
    []
  );
  const [resolveIndex, setResolveIndex] = useState(0);
  const resolveIndexRef = useRef(0);
  const resolveStageRef = useRef<HTMLDivElement | null>(null);
  const resolveBubbleRef = useRef<HTMLImageElement | null>(null);
  const resolvePinkRef = useRef<HTMLImageElement | null>(null);
  const resolveTlRef = useRef<gsap.core.Timeline | null>(null);
  const resolveAnimatingRef = useRef(false);
  const quoteTextRef = useRef<HTMLParagraphElement | null>(null);
  const questionTextRef = useRef<HTMLHeadingElement | null>(null);
  const q360GlobeTlRef = useRef<gsap.core.Timeline | null>(null);
  const q360GlobeStRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (showSplash) return;
    const stage = resolveStageRef.current;
    const bubble = resolveBubbleRef.current;
    const pink = resolvePinkRef.current;
    if (!stage || !bubble || !pink) return;

    const ctx = gsap.context(() => {
      gsap.set(stage, { x: 0, scale: 1 });
      gsap.set(bubble, { autoAlpha: 1, y: 0 });
      gsap.set(pink, { autoAlpha: 0 });

      const getOffset = () => {
        const container = stage.parentElement ?? stage;
        const base = container.clientWidth * 0.32;
        return Math.max(160, Math.min(320, Math.round(base)));
      };

      const run = (nextIndex: number) => {
        if (resolveAnimatingRef.current) return;
        resolveAnimatingRef.current = true;
        resolveTlRef.current?.kill();
        gsap.killTweensOf([stage, bubble, pink]);

        const offset = getOffset();
        const tl = gsap.timeline({
          onComplete: () => {
            resolveAnimatingRef.current = false;
            const next = (nextIndex + 1) % resolveSlides.length;
            gsap.delayedCall(1.2, () => run(next));
          },
        });
        resolveTlRef.current = tl;

        tl.to(bubble, { autoAlpha: 0, y: -10, duration: 0.35, ease: "power1.inOut" })
          .set(bubble, { y: 10 })
          .to(pink, { autoAlpha: 1, duration: 0.35, ease: "power1.out" }, "<")
          .to(stage, { x: -offset, scale: 0.82, duration: 0.9, ease: "power1.inOut" }, "<")
          .to(stage, { autoAlpha: 0, duration: 0.15 }, "-=0.1")
          .set(stage, { x: offset, scale: 0.82, autoAlpha: 0 })
          .add(() => {
            resolveIndexRef.current = nextIndex;
            setResolveIndex(nextIndex);
          })
          .to(stage, { autoAlpha: 1, duration: 0.2 })
          .to(stage, { x: 0, scale: 1, duration: 0.9, ease: "power2.out" })
          .to(pink, { autoAlpha: 0, duration: 0.25 }, "<")
          .to(bubble, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "<")
          .to({}, { duration: 0.9 });
      };

      run((resolveIndexRef.current + 1) % resolveSlides.length);
    }, stage);

    return () => {
      resolveTlRef.current?.kill();
      resolveTlRef.current = null;
      resolveAnimatingRef.current = false;
      ctx.revert();
    };
  }, [resolveSlides.length, showSplash]);

  useLayoutEffect(() => {
    if (showSplash) return;
    const art = q360ArtRef.current;
    const globe = q360GlobeRef.current;
    const globeImg = q360GlobeImgRef.current;
    if (!art || !globe || !globeImg) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(globe, { autoAlpha: 1 });
      return () => {};
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const AMP_Y = 18;
      gsap.set(globe, { autoAlpha: 1 });
      gsap.set(globeImg, {
        transformPerspective: 900,
        transformOrigin: "50% 50%",
        force3D: true,
        rotateY: -AMP_Y,
        rotateX: 0,
        rotateZ: 0,
      });

      const setScaleX = gsap.quickSetter(globeImg, "scaleX");

      const applyScale = () => {
        const current = (gsap.getProperty(globeImg, "rotateY") as number) * (Math.PI / 180);
        const cos = Math.cos(current);
        const scaleX = Math.abs(cos) < 0.01 ? 1 : 1 / cos;
        setScaleX(scaleX);
      };

      applyScale();

      const tl = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true,
        defaults: { duration: 1, ease: "sine.inOut" },
      });

      tl.to(globeImg, {
        rotateY: AMP_Y,
        rotateX: 5,
        rotateZ: 1.2,
      });

      tl.eventCallback("onUpdate", applyScale);
      tl.pause(0);
      q360GlobeTlRef.current = tl;

      const fadeIn = () => {
        gsap.to(globe, { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
        tl.play();
      };

      const fadeOut = () => {
        gsap.to(globe, { autoAlpha: 0, duration: 0.35, ease: "power2.inOut" });
        tl.pause();
      };

      const st = ScrollTrigger.create({
        trigger: art,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: fadeIn,
        onEnterBack: fadeIn,
        onLeave: fadeOut,
        onLeaveBack: fadeOut,
        onRefresh: (self) => {
          if (self.isActive) {
            fadeIn();
          } else {
            fadeOut();
          }
        },
      });

      if (st.isActive) {
        fadeIn();
      }

      q360GlobeStRef.current = st;

      return () => {
        st.kill();
        tl.kill();
        q360GlobeStRef.current = null;
        q360GlobeTlRef.current = null;
      };
    });

    return () => {
      mm.revert();
      q360GlobeStRef.current?.kill();
      q360GlobeTlRef.current?.kill();
      q360GlobeStRef.current = null;
      q360GlobeTlRef.current = null;
    };
  }, [showSplash]);

  useLayoutEffect(() => {
    const quoteEl = quoteTextRef.current;
    const questionEl = questionTextRef.current;
    if (!quoteEl || !questionEl) return;

    const ctx = gsap.context(() => {
      gsap.set([quoteEl, questionEl], { autoAlpha: 0, y: 18 });

      const animateIn = (el: Element) =>
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

      animateIn(quoteEl);
      animateIn(questionEl);
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mqFine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setQ360CursorOk(mqFine.matches && !mqReduce.matches);
    update();

    const onChange = () => update();

    if (typeof mqFine.addEventListener === "function") {
      mqFine.addEventListener("change", onChange);
      mqReduce.addEventListener("change", onChange);
    } else {
      mqFine.addListener(onChange);
      mqReduce.addListener(onChange);
    }

    return () => {
      if (typeof mqFine.removeEventListener === "function") {
        mqFine.removeEventListener("change", onChange);
        mqReduce.removeEventListener("change", onChange);
      } else {
        mqFine.removeListener(onChange);
        mqReduce.removeListener(onChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!q360CursorOk || !q360Active) {
      if (q360Raf.current) cancelAnimationFrame(q360Raf.current);
      q360Raf.current = null;
      return;
    }

    const tick = () => {
      const cursorEl = q360CursorRef.current;
      const fillEl = q360FillRef.current;
      const artEl = q360ArtRef.current;

      const t = q360Target.current;
      const c = q360Current.current;

      // smoothing
      c.x += (t.x - c.x) * 0.22;
      c.y += (t.y - c.y) * 0.22;

      if (cursorEl) {
        cursorEl.style.setProperty("--x", `${c.x}px`);
        cursorEl.style.setProperty("--y", `${c.y}px`);
      }

      // coordenadas locales para la máscara
      if (fillEl && artEl) {
        const rect = artEl.getBoundingClientRect();
        const lx = c.x - rect.left;
        const ly = c.y - rect.top;
        fillEl.style.setProperty("--cx", `${lx}px`);
        fillEl.style.setProperty("--cy", `${ly}px`);
      }

      q360Raf.current = requestAnimationFrame(tick);
    };

    q360Raf.current = requestAnimationFrame(tick);

    return () => {
      if (q360Raf.current) cancelAnimationFrame(q360Raf.current);
      q360Raf.current = null;
    };
  }, [q360Active, q360CursorOk]);

  const onQ360Enter = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!q360CursorOk) return;
      q360Current.current.x = e.clientX;
      q360Current.current.y = e.clientY;
      q360Target.current.x = e.clientX;
      q360Target.current.y = e.clientY;
      setQ360Active(true);
    },
    [q360CursorOk]
  );

  const onQ360Move = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (!q360CursorOk) return;
      q360Target.current.x = e.clientX;
      q360Target.current.y = e.clientY;
      if (!q360Active) setQ360Active(true);
    },
    [q360CursorOk, q360Active]
  );

  const onQ360Leave = useCallback(() => {
    setQ360Active(false);
    setQ360Erasing(false);
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

        {/* ===== SECCIÓN SERVICIOS ===== */}
        <section id="servicios" className="home-services" aria-label="Servicios">
          <div className="Conteiner">
            <div className="home-services__eyebrow">SERVICIOS</div>
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
                            <h3 className="q-svcCard__title">{s.title}</h3>
                        </div>
                    </div>
                </Link>
              ))}
            </div>

            {/* ===== DESKTOP: scroll horizontal con ScrollTrigger ===== */}
            <div ref={servicesPinRef} className="home-services__scroller">
              <div ref={servicesTrackRef} className="home-services__track">
                {SERVICES.map((s) => (
                  <div key={`${s.key}-panel`} className="home-services__panel">
                    <Link to={s.to} className={`q-svcCard q-svcCard--${s.key} q-svcCard--panel`}>
                      <picture className="q-svcCard__media" aria-hidden="true">
                        <source media={MOBILE_MQ} srcSet={safeSrc(s.imgMobile)} />
                        <img src={safeSrc(s.imgDesktop)} alt="" loading="lazy" decoding="async" />
                      </picture>

                      <div className="q-svcCard__shade" aria-hidden="true" />

                    <div className="q-svcCard__overlay">
                        <div className="q-svcCard__content">
                            <h3 className="q-svcCard__title">{s.title}</h3>
                        </div>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== QUANTUM 360 ===== */}
        <section
          id="Quantum360"
          className={`q360 ${q360Active ? "is-active" : ""}`}
          aria-label="Quantum 360"
          onPointerEnter={onQ360Enter}
          onPointerMove={onQ360Move}
          onPointerLeave={onQ360Leave}
        >
          <div className="Conteiner q360__inner">
            <div className="q360__kicker">QUANTUM</div>

            <div
              ref={q360ArtRef}
              className="q360__art"
              onPointerEnter={() => setQ360Erasing(true)}
              onPointerLeave={() => setQ360Erasing(false)}
            >
              <div ref={q360GlobeRef} className="q360__globe" aria-hidden="true">
                <img ref={q360GlobeImgRef} src={MundoQuantum} alt="" draggable={false} />
              </div>

              {/* Contorno siempre visible */}
              <div className="q360__outline" aria-hidden="true">
                <img src={Quantum360Outline} alt="" draggable={false} />
              </div>

              {/* Relleno que “se borra” con máscara radial */}
              <div ref={q360FillRef} className={`q360__fill ${q360Erasing ? "is-erasing" : ""}`}>
                <img src={Quantum360Fill} alt="360" draggable={false} />
              </div>
            </div>
          </div>

          {/* Cursor custom (solo desktop fine pointer) */}
          {q360CursorOk && (
            <div
              ref={q360CursorRef}
              className={`q360__cursor ${q360Active ? "is-on" : ""}`}
              aria-hidden="true"
            >
              <img src={Cursor360Svg} alt="" draggable={false} />
            </div>
          )}
        </section>

        <section className="quote-section" aria-label="Quantum statement">
          <div className="quote-section__content">
            <p>
              “En Quantum impulsamos la visibilidad y el crecimiento de tu negocio integrando marketing
              digital, branding estratégico e inteligencia artificial aplicada”.
            </p>
          </div>
        </section>

        <section className="question-section" aria-label="Qué resolvemos">
          <div className="question-section__content">
            <h2>¿QUÉ RESOLVEMOS?</h2>
          </div>
        </section>

        <section className="q-resolve" aria-label="Orbitas qué resolvemos">
          <div className="Conteiner q-resolve__inner">
            <div className="q-resolve__stage">
              <img className="q-resolve__pink q-resolve__pink--left" src={ResolvePink} alt="" aria-hidden="true" />
              <img className="q-resolve__pink q-resolve__pink--right" src={ResolvePink} alt="" aria-hidden="true" />

              <div className="q-resolve__orbit" aria-live="polite">
                <div ref={resolveStageRef} className="q-resolve__item">
                  <img
                    ref={resolveBubbleRef}
                    className="q-resolve__item-img"
                    src={resolveSlides[resolveIndex].src}
                    alt={resolveSlides[resolveIndex].alt}
                  />
                  <img
                    ref={resolvePinkRef}
                    className="q-resolve__item-pink"
                    src={ResolvePink}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="q-cta" aria-label="Diagnóstico sin costo">
          <div className="Conteiner q-cta__inner">
            <h2>Un camino más eficiente hacia<br />más ventas...</h2>
            <p>¿Deseas un diagnóstico sin costo de tu modelo actual?</p>
            <a className="q-cta__btn" href="#contacto">Contáctanos</a>
          </div>
        </section>

        {/* resto del home */}
        <section id="contacto" className="Conteiner" style={{ padding: "60px 0" }} />
      </main>

      <Footer />
    </>
  );
}
