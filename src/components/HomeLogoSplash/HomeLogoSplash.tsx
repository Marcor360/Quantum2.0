import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import logoMarkup from "../../assets/svg/Logo-Amarillo.svg?raw";
import "./homeLogoSplash.css";

type HomeLogoSplashProps = {
  onDone: () => void;
};

const HOLD_SECONDS = 0.45;
const OVERLAY_FADE_SECONDS = 0.35;

export default function HomeLogoSplash({ onDone }: HomeLogoSplashProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const drawLayerRef = useRef<HTMLDivElement | null>(null);
  const finalLayerRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedRef = useRef(false);
  const completedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (hasPlayedRef.current) return;
    hasPlayedRef.current = true;
    completedRef.current = false;

    const overlay = overlayRef.current;
    const drawLayer = drawLayerRef.current;
    const finalLayer = finalLayerRef.current;

    if (!overlay || !drawLayer || !finalLayer) {
      completedRef.current = true;
      onDone();
      return;
    }

    const finalSvg = finalLayer.querySelector("svg");
    if (!finalSvg) {
      completedRef.current = true;
      onDone();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        completedRef.current = true;
        document.body.style.overflow = previousOverflow;
        onDone();
      },
    });
    tlRef.current = tl;

    gsap.set(finalLayer, { autoAlpha: 1 });
    gsap.set(drawLayer, { autoAlpha: 0 });
    gsap.set(overlay, { autoAlpha: 1 });

    tl.to({}, { duration: HOLD_SECONDS });
    tl.to(overlay, {
      autoAlpha: 0,
      duration: OVERLAY_FADE_SECONDS,
      ease: "power2.out",
    });

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      document.body.style.overflow = previousOverflow;
      if (!completedRef.current) {
        hasPlayedRef.current = false;
      }
    };
  }, [onDone]);

  return (
    <div
      className="home-logo-splash"
      ref={overlayRef}
      aria-hidden="true"
      role="presentation"
    >
      <div className="home-logo-splash__logo">
        <div
          className="home-logo-splash__layer home-logo-splash__draw"
          ref={drawLayerRef}
          dangerouslySetInnerHTML={{ __html: logoMarkup }}
        />
        <div
          className="home-logo-splash__layer home-logo-splash__final"
          ref={finalLayerRef}
          dangerouslySetInnerHTML={{ __html: logoMarkup }}
        />
      </div>
    </div>
  );
}
