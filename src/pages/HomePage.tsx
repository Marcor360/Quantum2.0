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
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeLogoSplash from "../components/HomeLogoSplash/HomeLogoSplash";
import LogoText from "../assets/svg/Logo-text.svg";

// ===== Quantum 360 SVGs =====
import Quantum360Fill from "../assets/svg/360/360 solo fill.svg";
import Quantum360Outline from "../assets/svg/360/360 sin relleno.svg";
import Cursor360Svg from "../assets/svg/360/CirculoCursor.svg";
import MundoMitad from "../assets/svg/MundoMitad.svg";
import ResolveCenter from "../assets/svg/360/centrado en el cliente.svg";
import ResolveData from "../assets/svg/360/data driven.svg";
import ResolveChannels from "../assets/svg/360/nuevas canales comerciales.svg";
import ResolveOps from "../assets/svg/360/transformación operativa_1.svg";
import ResolveCenterEn from "../assets/svg/360/Inglish/customer.svg";
import ResolveDataEn from "../assets/svg/360/Inglish/data driven.svg";
import ResolveChannelsEn from "../assets/svg/360/Inglish/new commercial.svg";
import ResolveOpsEn from "../assets/svg/360/Inglish/operation.svg";
import MundoQuantum from "../assets/svg/360/mundo-quantum.svg";
import QuantumTextSvg from "../assets/svg/360/QUANTU TEXTO.svg";

import "../index.css";

const MOBILE_MQ = "(max-width: 768px)";
type Lang = "es" | "en";
const LANG_EVENT = "q:lang";

function getStoredLang(): Lang {
  if (typeof window === "undefined") return "es";
  const v = localStorage.getItem("lang");
  return v === "en" ? "en" : "es";
}

const HOME_COPY: Record<
  Lang,
  {
    heroAria: string;

    servicesAria: string;
    isWord: string;
    lead: string;
    hint: string;
    servicesLabel: string;

    quoteAria: string;
    quoteTitle: string;
    quoteText: string;

    resolveAria: string;
    resolveTitle: string;

    ctaAria: string;
    ctaTitle1: string;
    ctaTitle2: string;
    ctaText: string;
    ctaBtn: string;
  }
> = {
  es: {
    heroAria: "Banner principal",

    servicesAria: "Servicios",
    isWord: "es",
    lead: "Estrategia y tecnología que impulsan tu negocio.",
    hint: "¿Deseas un diagnóstico sin costo de tu modelo actual?",
    servicesLabel: "SERVICIOS",

    quoteAria: "Quantum statement",
    quoteTitle: "¿QUÉ RESOLVEMOS?",
    quoteText:
      "“En Quantum impulsamos la visibilidad y el crecimiento de tu negocio integrando marketing digital, branding estratégico e inteligencia artificial aplicada”.",

    resolveAria: "Cómo lo resolvemos",
    resolveTitle: "¿CÓMO LO RESOLVEMOS?",

    ctaAria: "Diagnóstico sin costo",
    ctaTitle1: "Un camino más eficiente hacia",
    ctaTitle2: "más ventas...",
    ctaText: "¿Deseas un diagnóstico sin costo de tu modelo actual?",
    ctaBtn: "Contáctanos",
  },
  en: {
    heroAria: "Main banner",

    servicesAria: "Services",
    isWord: "is",
    lead: "Strategy and technology that drive your business.",
    hint: "Want a free diagnosis of your current model?",
    servicesLabel: "SERVICES",

    quoteAria: "Quantum statement",
    quoteTitle: "WHAT DO WE SOLVE?",
    quoteText:
      "“At Quantum, we boost the visibility and growth of your business by integrating digital marketing, strategic branding, and applied artificial intelligence.”",

    resolveAria: "How we solve it",
    resolveTitle: "HOW DO WE SOLVE IT?",

    ctaAria: "Free diagnosis",
    ctaTitle1: "A more efficient path to",
    ctaTitle2: "more sales...",
    ctaText: "Want a free diagnosis of your current model?",
    ctaBtn: "Contact us",
  },
};

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

ScrollTrigger.defaults({
  anticipatePin: 1,
  fastScrollEnd: true,
  invalidateOnRefresh: true,
});

function getHeaderHeight(): number {
  if (typeof document === "undefined") return 0;
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

const onPinLeave = (self: ScrollTrigger) => {
  self.animation?.progress(1);
};

const onPinLeaveBack = (self: ScrollTrigger) => {
  self.animation?.progress(0);
};

function getIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MQ).matches;
}

const safeSrc = (p: string) => encodeURI(p);

type SplitResult = {
  spans: HTMLSpanElement[];
  restore: () => void;
};

function splitQuoteIntoWords(el: HTMLParagraphElement): SplitResult {
  const originalHtml = el.innerHTML;
  const text = el.textContent ?? "";
  el.innerHTML = "";

  const frag = document.createDocumentFragment();
  const spans: HTMLSpanElement[] = [];

  const tokens = text.match(/\S+|\s+/g) ?? [];

  tokens.forEach((token) => {
    if (/^\s+$/.test(token)) {
      const nbsp = token.replace(/ /g, "\u00A0");
      frag.appendChild(document.createTextNode(nbsp));
    } else {
      const span = document.createElement("span");
      span.className = "quote-word";
      span.dataset.token = token;
      span.textContent = token;
      frag.appendChild(span);
      spans.push(span);
    }
  });

  el.appendChild(frag);

  const restore = () => {
    el.innerHTML = originalHtml;
  };

  return { spans, restore };
}

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

const SERVICE_TITLES: Record<ServiceCard["key"], Record<Lang, string>> = {
  branding: { es: "Branding", en: "Branding" },
  ecomerce: { es: "E-commerce", en: "E-commerce" },
  "app-ia": { es: "Apps & I.A", en: "Apps & A.I." },
  campañas: { es: "Campañas", en: "Campaigns" },
};

export default function HomePage() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [dismissed, setDismissed] = useState(false);
  const hasSessionFlag = sessionStorage.getItem("homeSplashPlayed") === "1";
  const showSplash = isHome && !hasSessionFlag && !dismissed;

  // ===== Idioma (sin libs): escucha evento del Header =====
  const [lang, setLang] = useState<Lang>(() => getStoredLang());

  useEffect(() => {
    const onLangEvent = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      if (next === "es" || next === "en") setLang(next);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== "lang") return;
      const v = e.newValue;
      if (v === "es" || v === "en") setLang(v);
    };

    window.addEventListener(LANG_EVENT, onLangEvent as EventListener);
    window.addEventListener("storage", onStorage);

    // sync inicial por si cambió antes de montar
    setLang(getStoredLang());

    return () => {
      window.removeEventListener(LANG_EVENT, onLangEvent as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const t = useMemo(() => HOME_COPY[lang], [lang]);

  // ===== Video responsive (carga 1 solo MP4) =====
  const [isMobile, setIsMobile] = useState(getIsMobile);
  const [reduceMotion, setReduceMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const stRefreshRaf = useRef<number | null>(null);

  const requestSTRefresh = useCallback(() => {
    if (stRefreshRaf.current !== null) return;
    stRefreshRaf.current = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      stRefreshRaf.current = null;
    });
  }, []);

  // Servicios scroll horizontal desktop
  const servicesPinRef = useRef<HTMLDivElement | null>(null);
  const servicesTrackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduceMotion(mq.matches);
    update();

    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);

    if (typeof mq.addEventListener === "function") mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const refresh = () => {
      if (isMobile) requestSTRefresh();
      else ScrollTrigger.refresh();
    };
    const fontsReady = (document as Document & { fonts?: FontFaceSet }).fonts?.ready;

    if (fontsReady && typeof fontsReady.then === "function") {
      fontsReady.then(refresh).catch(() => { });
    }

    const tt = window.setTimeout(refresh, 200);
    return () => window.clearTimeout(tt);
  }, [isMobile, requestSTRefresh]);

  useEffect(
    () => () => {
      if (stRefreshRaf.current !== null) {
        cancelAnimationFrame(stRefreshRaf.current);
        stRefreshRaf.current = null;
      }
    },
    []
  );

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

    if (reduceMotion) {
      v.pause();
      return;
    }

    if (isMobile) {
      v.pause();
      return;
    }

    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => { });
  }, [heroVideoSrc, isMobile, reduceMotion]);

  useEffect(() => {
    if (!isMobile) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (reduceMotion) {
          videoEl.pause();
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          const p = videoEl.play();
          if (p && typeof p.catch === "function") p.catch(() => { });
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(videoEl);

    return () => io.disconnect();
  }, [isMobile, reduceMotion]);

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

  // ===== Rotación de palabra =====
  const words = useMemo<string[]>(
    () => (lang === "es" ? ["estrategia", "potencial", "contenido"] : ["strategy", "potential", "content"]),
    [lang]
  );

  const [wordIndex, setWordIndex] = useState(0);
  const [wordSpin, setWordSpin] = useState(false);

  const t1 = useRef<number | null>(null);
  const t2 = useRef<number | null>(null);

  // Reset al cambiar idioma (evita desfase)
  useEffect(() => {
    setWordIndex(0);
    setWordSpin(false);
  }, [lang]);

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
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const mm = gsap.matchMedia();

    if (!showSplash) {
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const pin = servicesPinRef.current;
        const track = servicesTrackRef.current;
        if (!pin || !track) return undefined;

        const distance = track.scrollWidth - pin.clientWidth;
        if (distance <= 1) {
          gsap.set(track, { x: 0 });
          return undefined;
        }

        const tween = gsap.to(track, {
          x: () => {
            const dist = track.scrollWidth - pin.clientWidth;
            return dist > 0 ? -dist : 0;
          },
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: () => `top top+=${getHeaderHeight()}`,
            end: () => {
              const dist = track.scrollWidth - pin.clientWidth;
              return `+=${dist > 0 ? dist : 0}`;
            },
            pin: true,
            scrub: 0.25,
            onLeave: onPinLeave,
            onLeaveBack: onPinLeaveBack,
            invalidateOnRefresh: true,
          },
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());

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

  // ===== Quantum 360 =====
  const q360ArtRef = useRef<HTMLDivElement | null>(null);
  const q360FillRef = useRef<HTMLDivElement | null>(null);
  const q360CursorRef = useRef<HTMLDivElement | null>(null);
  const q360GlobeImgRef = useRef<HTMLImageElement | null>(null);
  const q360SectionRef = useRef<HTMLElement | null>(null);
  const q360WorldScrollRef = useRef<HTMLDivElement | null>(null);
  const q360WorldAnimRef = useRef<HTMLDivElement | null>(null);
  const resolveStackSectionRef = useRef<HTMLElement | null>(null);
  const resolveStackPinRef = useRef<HTMLDivElement | null>(null);
  const resolveStackItemsRef = useRef<HTMLDivElement[]>([]);

  const [q360CursorOk, setQ360CursorOk] = useState(false);
  const [q360Active, setQ360Active] = useState(false);
  const [q360Erasing, setQ360Erasing] = useState(false);

  const q360Target = useRef({ x: 0, y: 0 });
  const q360Current = useRef({ x: 0, y: 0 });
  const q360Raf = useRef<number | null>(null);
  const quoteTextRef = useRef<HTMLParagraphElement | null>(null);
  const questionTextRef = useRef<HTMLHeadingElement | null>(null);
  const q360GlobeTlRef = useRef<gsap.core.Timeline | null>(null);
  const q360GlobeStRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (showSplash) return;
    const art = q360ArtRef.current;
    const globe = q360WorldAnimRef.current;
    const globeImg = q360GlobeImgRef.current;
    if (!art || !globe || !globeImg) return;

    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px) and (prefers-reduced-motion: reduce)", () => {
      gsap.set(globe, { autoAlpha: 1 });
      return () => { };
    });

    mm.add("(max-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
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
          if (self.isActive) fadeIn();
          else fadeOut();
        },
      });

      if (st.isActive) fadeIn();

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

  useEffect(() => {
    const onLoad = () => {
      if (isMobile) requestSTRefresh();
      else ScrollTrigger.refresh();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, [isMobile, requestSTRefresh]);

  useLayoutEffect(() => {
    if (showSplash) return;
    const section = q360SectionRef.current;
    const world = q360WorldScrollRef.current;
    if (!section || !world) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 769px)", () => {
        gsap.set(world, {
          y: 0,
          scale: 0.8,
          transformOrigin: "50% 50%",
          force3D: true,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        tl.to(world, { scale: 1.4, ease: "none" }, 0);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, section);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [showSplash]);

  // Quote split/pin (re-ejecuta al cambiar idioma)
  useLayoutEffect(() => {
    if (showSplash) return;
    const quoteEl = quoteTextRef.current;
    if (!quoteEl) return;

    const mm = gsap.matchMedia();
    let restore: (() => void) | null = null;

    const ctx = gsap.context(() => {
      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const { spans, restore: restoreFn } = splitQuoteIntoWords(quoteEl);
        restore = restoreFn;

        gsap.set(spans, {
          color: "transparent",
          display: "inline-block",
          willChange: "color",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: quoteEl.closest(".quote-section") ?? quoteEl,
            pin: quoteEl.closest(".quote-section__content") ?? quoteEl,
            start: () => `top top+=${getHeaderHeight()}`,
            end: () => `+=${Math.max(900, spans.length * 55)}`,
            scrub: 0.25,
            pinSpacing: true,
            onLeave: onPinLeave,
            onLeaveBack: onPinLeaveBack,
            invalidateOnRefresh: true,
          },
        });

        tl.to(spans, {
          color: "#fff",
          stagger: 0.06,
          ease: "none",
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 768px), (prefers-reduced-motion: reduce)", () => {
        if (restore) {
          restore();
          restore = null;
        }
        gsap.set(quoteEl, { clearProps: "all" });
        return () => { };
      });
    }, quoteEl);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    const doRestore = () => {
      if (restore) {
        restore();
        restore = null;
      }
    };

    return () => {
      ctx.revert();
      mm.revert();
      doRestore();
    };
  }, [showSplash, lang]);

  useLayoutEffect(() => {
    if (showSplash) return;
    const section = resolveStackSectionRef.current;
    const pin = resolveStackPinRef.current ?? resolveStackSectionRef.current;
    const items = resolveStackItemsRef.current;
    if (!section || !pin || items.length === 0) return;

    const clamp = gsap.utils.clamp;
    const TX = () => clamp(140, 320, window.innerWidth * 0.18);
    const TY = () => clamp(120, 260, window.innerHeight * 0.18);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: reduce), (max-width: 768px)", () => {
        gsap.set(items, {
          clearProps: "all",
          autoAlpha: 1,
          filter: "none",
          scale: 1,
          y: 0,
        });
        return () => { };
      });

      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const center = [
          { x: () => -TX(), y: () => -TY() * 0.4 },
          { x: () => TX(), y: () => -TY() * 0.25 },
          { x: () => -TX() * 0.9, y: () => TY() * 0.35 },
          { x: () => TX() * 0.8, y: () => TY() * 0.45 },
        ];
        const exit = [
          { x: center[0].x, y: () => center[0].y() - TY() * 2.5 },
          { x: center[1].x, y: () => center[1].y() - TY() * 2.5 },
          { x: center[2].x, y: () => center[2].y() - TY() * 2.5 },
          { x: center[3].x, y: () => center[3].y() - TY() * 2.5 },
        ];

        gsap.set(items, { autoAlpha: 0, filter: "blur(0px)", scale: 0.9 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            pin: pin,
            start: "center center",
            end: () => `+=${Math.max(2000, items.length * 700)}`,
            scrub: 0.25,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onLeave: onPinLeave,
            onLeaveBack: onPinLeaveBack,
          },
        });

        [0, 1, 2, 3].forEach((idx, i) => {
          const enter = {
            x: center[idx].x,
            y: () => center[idx].y() + TY() * 2.2,
          };
          tl.fromTo(
            items[idx],
            { autoAlpha: 0, scale: 0.9, filter: "blur(0px)", ...enter },
            { autoAlpha: 1, scale: 1, filter: "blur(0px)", ...center[idx], duration: 1.2 },
            i === 0 ? 0 : ">-0.2"
          );
          tl.to({}, { duration: 0.8 }, ">");
          tl.to(
            items[idx],
            { autoAlpha: 0, scale: 0.92, filter: "blur(12px)", ...exit[idx], duration: 1.2 },
            ">"
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [showSplash]);

  useLayoutEffect(() => {
    const questionEl = questionTextRef.current;
    if (!questionEl) return;

    const ctx = gsap.context(() => {
      gsap.set(questionEl, { autoAlpha: 0, y: 18 });

      gsap.to(questionEl, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: questionEl,
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });
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

      const tpos = q360Target.current;
      const cpos = q360Current.current;

      cpos.x += (tpos.x - cpos.x) * 0.22;
      cpos.y += (tpos.y - cpos.y) * 0.22;

      if (cursorEl) {
        cursorEl.style.setProperty("--x", `${cpos.x}px`);
        cursorEl.style.setProperty("--y", `${cpos.y}px`);
      }

      if (fillEl && artEl) {
        const rect = artEl.getBoundingClientRect();
        const lx = cpos.x - rect.left;
        const ly = cpos.y - rect.top;
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

  const onQ360ArtEnter = useCallback(() => {
    if (!q360CursorOk) return;
    setQ360Erasing(true);
  }, [q360CursorOk]);

  const onQ360ArtLeave = useCallback(() => {
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
        <section className="home-hero" aria-label={t.heroAria}>
          <div className="home-hero__media" aria-hidden="true">
            <video
              ref={videoRef}
              className="home-hero__video"
              autoPlay
              muted
              loop
              playsInline
              preload={isMobile ? "none" : "metadata"}
              disablePictureInPicture
              disableRemotePlayback
            >
              <source src={heroVideoSrc} type="video/mp4" />
            </video>
            <div className="home-hero__overlay" />
          </div>
        </section>

        {/* ===== SECCIÓN SERVICIOS ===== */}
        <section id="servicios" className="home-services" aria-label={t.servicesAria}>
          <div className="Conteiner">
            <div className="home-services__intro">
              <div className="home-services__headline">
                <img className="home-services__logo" src={LogoText} alt="Quantum" />

                <h2 className="home-services__title">
                  {t.isWord}{" "}
                  <span className="q-rotateWord" aria-live="polite">
                    <span className={`q-rotateWord__inner ${wordSpin ? "is-animating" : ""}`}>
                      {words[wordIndex]}
                    </span>
                  </span>
                  <span className="home-services__comma">,</span>
                </h2>
              </div>

              <div className="home-services__copy">
                <p className="home-services__lead">{t.lead}</p>
                <p className="home-services__hint">{t.hint}</p>
              </div>
            </div>

            <div className="home-services__content">
              <h3 className="home-services__sectionTitle">{t.servicesLabel}</h3>
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
                        <h3 className="q-svcCard__title">{SERVICE_TITLES[s.key][lang]}</h3>
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
                            <h3 className="q-svcCard__title">{SERVICE_TITLES[s.key][lang]}</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== QUANTUM 360 ===== */}
        <section
          ref={q360SectionRef}
          id="Quantum360"
          className={`q360 q360-section ${q360Active ? "is-active" : ""}`}
          aria-label="Quantum 360"
          onPointerEnter={onQ360Enter}
          onPointerMove={onQ360Move}
          onPointerLeave={onQ360Leave}
        >
          <div ref={q360WorldScrollRef} className="q360-world-scroll" aria-hidden="true">
            <div
              ref={(el) => {
                q360WorldAnimRef.current = el;
              }}
              className="q360__globe q360-world-anim"
              aria-hidden="true"
            >
              <img
                className="Mundo"
                ref={q360GlobeImgRef}
                src={isMobile ? MundoQuantum : MundoMitad}
                alt=""
                draggable={false}
              />
            </div>
          </div>

          <div className="Conteiner q360__inner q360-foreground">
            <div className="q360__labels">
              <span className="q360__meta">METODOLOGÍA</span>
              <img className="q360__brand" src={QuantumTextSvg} alt="Quantum" />
            </div>

            <div
              ref={q360ArtRef}
              className="q360__art"
              onPointerEnter={onQ360ArtEnter}
              onPointerLeave={onQ360ArtLeave}
            >
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
            <div ref={q360CursorRef} className={`q360__cursor ${q360Active ? "is-on" : ""}`} aria-hidden="true">
              <img src={Cursor360Svg} alt="" draggable={false} />
            </div>
          )}
        </section>

        <section className="quote-section" aria-label={t.quoteAria}>
          <div className="quote-section__content">
            <h2 className="quote-section__title">{t.quoteTitle}</h2>
            <p key={lang} ref={quoteTextRef}>
              {t.quoteText}
            </p>
          </div>
        </section>

        {/* ===== RESOLVE STACK ===== */}
        <section ref={resolveStackSectionRef} className="resolve-stack" aria-label={t.resolveAria}>
          <div ref={resolveStackPinRef} className="resolve-stack__pin">
            <h2 className="resolve-stack__title">{t.resolveTitle}</h2>
            <div className="resolve-stack__items">
              {(() => {
                resolveStackItemsRef.current = [];
                return null;
              })()}
              {(lang === "en"
                ? [ResolveDataEn, ResolveCenterEn, ResolveChannelsEn, ResolveOpsEn]
                : [ResolveData, ResolveCenter, ResolveChannels, ResolveOps]
              ).map((img, idx) => (
                <div
                  key={`resolve-${idx}`}
                  className={`resolve-stack__item resolve-stack__item--${idx + 1}`}
                  ref={(el) => {
                    if (el) resolveStackItemsRef.current[idx] = el;
                  }}
                >
                  <img src={img} alt="" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="q-cta" aria-label={t.ctaAria}>
          <div className="Conteiner q-cta__inner">
            <h2>
              {t.ctaTitle1}
              <br />
              {t.ctaTitle2}
            </h2>
            <p>{t.ctaText}</p>
            <a className="q-cta__btn" href="#contacto">
              {t.ctaBtn}
            </a>
          </div>
        </section>

        {/* resto del home */}
        <section id="contacto" className="Conteiner" style={{ padding: "60px 0" }} />
      </main>

      <Footer />
    </>
  );
}
