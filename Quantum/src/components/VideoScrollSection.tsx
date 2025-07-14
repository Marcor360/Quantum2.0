import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ruta del vídeo preparado para scrubbing (GOP=1)
import CompVid from "/src/assets/video/Comp.mp4";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sección que ancla el vídeo al viewport y avanza frame‑a‑frame
 * mediante el scroll del usuario.
 */
const VideoScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef   = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video   = videoRef.current;
    if (!section || !video) return;

    /**
     * Cuando haya metadatos de duración disponibles, creamos el tween.
     */
    const onLoaded = () => {
      const dur = video.duration || 1;

      const tween = gsap.to(video, {
        currentTime: dur,
        ease: "none",
        scrollTrigger: {
          trigger: section,          // sección completa (no solo el <video>)
          start: "top top",
          end: `+=${dur * 1000}`,   // 1 000 px de scroll ≈ 1 s de vídeo
          scrub: true,
          pin: true,
          pinSpacing: true,
          // zIndex removed: set via CSS instead
          onEnter: () => video.pause(),
          onLeaveBack: () => video.pause(),
        },
      });

      // Limpieza individual de este ScrollTrigger
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    };

    video.addEventListener("loadedmetadata", onLoaded);

    // Limpieza global al desmontar
    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="bienvenida"
      className="w-screen h-screen overflow-hidden relative"
      style={{ zIndex: 50 }}
    >
      <video
        ref={videoRef}
        src={CompVid}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
};

export default VideoScrollSection;
