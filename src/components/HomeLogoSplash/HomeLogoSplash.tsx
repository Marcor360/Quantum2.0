import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import logoMarkup from "../../assets/svg/Logo-Amarillo.svg?raw";
import "./homeLogoSplash.css";

type HomeLogoSplashProps = {
  onDone: () => void;
};

const DRAW_SELECTOR =
  "path, line, polyline, polygon, circle, rect, ellipse";

const TOTAL_DRAW_SECONDS = 5.2;
const HOLD_SECONDS = 0.45;
const FINAL_FADE_SECONDS = 0.18;
const OVERLAY_FADE_SECONDS = 0.35;
const OVERLAP_SECONDS = 0.04;

function isGeometryElement(el: SVGElement): el is SVGGeometryElement {
  return "getTotalLength" in el;
}

function hasVisibleStroke(el: SVGElement) {
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

function orderByDrawOrderAttr<T extends SVGElement>(elements: T[]) {
  return elements
    .map((el, index) => {
      const raw = el.getAttribute("data-draw-order");
      const order = raw ? Number.parseFloat(raw) : Number.NaN;
      return {
        el,
        order: Number.isFinite(order) ? order : null,
        index,
      };
    })
    .sort((a, b) => {
      const aKey = a.order ?? a.index;
      const bKey = b.order ?? b.index;
      return aKey === bKey ? a.index - b.index : aKey - bKey;
    })
    .map((item) => item.el);
}

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

    const drawSvg = drawLayer.querySelector("svg");
    const finalSvg = finalLayer.querySelector("svg");
    if (!drawSvg || !finalSvg) {
      completedRef.current = true;
      onDone();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const baseElements = Array.from(
      finalSvg.querySelectorAll<SVGElement>(DRAW_SELECTOR)
    );
    const hasStrokes = baseElements.some(hasVisibleStroke);
    drawLayer.classList.toggle("is-forced", !hasStrokes);

    const drawCandidates = Array.from(
      drawSvg.querySelectorAll<SVGElement>(DRAW_SELECTOR)
    ).filter(isGeometryElement);

    const drawable = orderByDrawOrderAttr(
      hasStrokes ? drawCandidates.filter(hasVisibleStroke) : drawCandidates
    );

    const lengths = drawable.map((el) => {
      try {
        return Math.max(0, el.getTotalLength());
      } catch {
        return 0;
      }
    });
    const totalLength = lengths.reduce((sum, len) => sum + len, 0);

    const tl = gsap.timeline({
      onComplete: () => {
        completedRef.current = true;
        document.body.style.overflow = previousOverflow;
        onDone();
      },
    });
    tlRef.current = tl;

    gsap.set(finalLayer, { autoAlpha: 0 });
    gsap.set(drawLayer, { autoAlpha: 1 });
    gsap.set(overlay, { autoAlpha: 1 });

    if (drawable.length === 0 || totalLength === 0) {
      tl.to(finalLayer, {
        autoAlpha: 1,
        duration: FINAL_FADE_SECONDS,
        ease: "power2.out",
      });
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
    }

    drawable.forEach((el, index) => {
      const length = lengths[index];
      gsap.set(el, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    drawable.forEach((el, index) => {
      const length = lengths[index];
      const duration =
        totalLength > 0
          ? TOTAL_DRAW_SECONDS * (length / totalLength)
          : TOTAL_DRAW_SECONDS / drawable.length;
      const position = index === 0 ? 0 : `-=${OVERLAP_SECONDS}`;

      tl.to(
        el,
        {
          strokeDashoffset: 0,
          duration: Math.max(0.05, duration),
          ease: "none",
        },
        position
      );
    });

    tl.to(finalLayer, {
      autoAlpha: 1,
      duration: FINAL_FADE_SECONDS,
      ease: "power2.out",
    });
    tl.set(drawLayer, { autoAlpha: 0 });
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
