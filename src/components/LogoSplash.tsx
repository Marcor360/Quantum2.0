import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "../assets/svg/Logo-Amarillo.svg?react";
import "./logoSplash.css";

type LogoSplashProps = {
  onDone: () => void;
  force?: boolean;
};

type DrawSVGTweenVars = gsap.TweenVars & { drawSVG?: string | number };

const DRAW_ELEMENTS =
  "path, line, polyline, polygon, circle, rect, ellipse";

function hasStroke(el: SVGElement) {
  const strokeAttr = el.getAttribute("stroke");
  const strokeWidthAttr = el.getAttribute("stroke-width");
  const computed = window.getComputedStyle(el);
  const computedStroke = computed.stroke;
  const computedWidth = parseFloat(computed.strokeWidth);
  const attrWidth = strokeWidthAttr ? parseFloat(strokeWidthAttr) : NaN;
  const width = Number.isFinite(attrWidth) ? attrWidth : computedWidth;
  const hasStrokeColor =
    (strokeAttr && strokeAttr !== "none") ||
    (computedStroke && computedStroke !== "none");

  return hasStrokeColor && width > 0;
}

export default function LogoSplash({ onDone, force = false }: LogoSplashProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const logoWrapRef = useRef<HTMLDivElement | null>(null);
  const hasPlayed = useRef(false);
  const completedRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (hasPlayed.current && !force) return;
    hasPlayed.current = true;
    completedRef.current = false;

    const overlay = overlayRef.current;
    const logoWrap = logoWrapRef.current;

    if (!overlay || !logoWrap) {
      completedRef.current = true;
      onDone();
      return;
    }

    const svg = logoWrap.querySelector("svg");
    if (!svg) {
      completedRef.current = true;
      onDone();
      return;
    }

    const gsapAny = gsap as unknown as {
      plugins?: Record<string, unknown>;
    };
    const windowAny = window as unknown as {
      DrawSVGPlugin?: unknown;
    };

    if (!gsapAny.plugins?.drawSVG && windowAny.DrawSVGPlugin) {
      gsap.registerPlugin(windowAny.DrawSVGPlugin);
    }

    const hasDrawSVG =
      !!gsapAny.plugins?.drawSVG || !!gsapAny.plugins?.DrawSVGPlugin;

    const strokeEls = Array.from(
      svg.querySelectorAll<SVGElement>(DRAW_ELEMENTS)
    ).filter(hasStroke);

    const tl = gsap.timeline({
      onComplete: () => {
        completedRef.current = true;
        onDone();
      },
    });
    tlRef.current = tl;

    gsap.set(svg, { clearProps: "opacity,visibility,transform" });

    if (hasDrawSVG && strokeEls.length > 0) {
      gsap.set(strokeEls, { drawSVG: 0 } as DrawSVGTweenVars);
      tl.to(
        strokeEls,
        {
          drawSVG: "0 100%",
          duration: 1.2,
          stagger: 0.03,
          ease: "none",
        } as DrawSVGTweenVars
      );
      tl.set(strokeEls, {
        clearProps: "strokeDasharray,strokeDashoffset",
      });
      tl.to({}, { duration: 0.4 });
      tl.to(overlay, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      return () => {
        tlRef.current?.kill();
        tlRef.current = null;
        if (!completedRef.current) {
          hasPlayed.current = false;
        }
      };
    }

    gsap.set(svg, { autoAlpha: 0, scale: 0.9, transformOrigin: "50% 50%" });
    tl.to(svg, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    tl.to({}, { duration: 0.3 });
    tl.to(overlay, {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
    });

    return () => {
      tlRef.current?.kill();
      tlRef.current = null;
      if (!completedRef.current) {
        hasPlayed.current = false;
      }
    };
  }, [onDone, force]);

  return (
    <div className="logo-splash" ref={overlayRef}>
      <div className="logo-splash__logo" ref={logoWrapRef}>
        <Logo aria-hidden="true" focusable="false" />
      </div>
    </div>
  );
}
