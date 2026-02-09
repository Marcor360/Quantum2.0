// src/components/Footer.tsx
import "./footer.css";
import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useLang, type Lang } from "../i18n/lang";

import LinesFooter from "../assets/svg/360/LineasFooter.svg?react";
import LettersFooter from "../assets/svg/360/Letras Quantum Footer.svg";
import FacebookIcon from "../assets/svg/redes/facebook.svg";
import InstagramIcon from "../assets/svg/redes/instagram.svg";
import WhatsappIcon from "../assets/svg/redes/whatsapp.svg";
import MailIcon from "../assets/svg/redes/mail.svg";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_COPY: Record<
    Lang,
    {
        ctaLine1: string;
        ctaLine2: string;
        ctaBtn: string;
        copyright: string;
        facebook: string;
        instagram: string;
        whatsapp: string;
        email: string;
    }
> = {
    es: {
        ctaLine1: "¡Impulsemos",
        ctaLine2: "tus ideas!",
        ctaBtn: "Vamos a hablar",
        copyright: "© 2025 Quantum Marketing & Sales",
        facebook: "Facebook",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        email: "Email",
    },
    en: {
        ctaLine1: "Let’s boost",
        ctaLine2: "your ideas!",
        ctaBtn: "Let’s talk",
        copyright: "© 2025 Quantum Marketing & Sales",
        facebook: "Facebook",
        instagram: "Instagram",
        whatsapp: "WhatsApp",
        email: "Email",
    },
};

export default function Footer() {
    const [lang] = useLang();
    const t = useMemo(() => FOOTER_COPY[lang], [lang]);

    const footerRef = useRef<HTMLElement>(null);

    // En vez de depender de ref directo al SVG (puede fallar según svgr),
    // referenciamos el wrapper y buscamos el <svg> dentro.
    const linesWrapRef = useRef<HTMLDivElement>(null);

    const contentTopRef = useRef<HTMLDivElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);
    const contentBottomRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const footer = footerRef.current;
        const wrap = linesWrapRef.current;
        const contentTop = contentTopRef.current;
        const wordmark = wordmarkRef.current;
        const contentBottom = contentBottomRef.current;

        if (!footer || !wrap || !contentTop || !wordmark || !contentBottom) return;

        const svg = wrap.querySelector("svg") as SVGSVGElement | null;
        if (!svg) return;

        const ctx = gsap.context(() => {
            // Timeline con ScrollTrigger (solo una vez)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footer,
                    start: "top 80%",
                    end: "top 20%",
                    toggleActions: "play none none none",
                },
            });

            // Líneas SVG
            const paths = svg.querySelectorAll<SVGPathElement>("path");

            paths.forEach((path, index) => {
                const length = Math.ceil(path.getTotalLength?.() ?? 2200);

                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fillOpacity: 0,
                    strokeOpacity: 1,
                });

                // Dibuja
                tl.to(
                    path,
                    {
                        strokeDashoffset: 0,
                        duration: 2.8,
                        ease: "power2.inOut",
                    },
                    index * 0.25
                );

                // Luego “rellena” y apaga stroke
                tl.to(
                    path,
                    {
                        fillOpacity: 1,
                        strokeOpacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    index * 0.25 + 2.05
                );
            });

            // Animación contenido (después de líneas)
            const contentStart = tl.duration() + 1.4;

            tl.fromTo(
                contentTop,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                contentStart
            );

            tl.fromTo(
                wordmark,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
                contentStart + 0.3
            );

            tl.fromTo(
                contentBottom,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                contentStart + 0.5
            );
        }, footer);

        return () => {
            ctx.revert(); // mata SOLO lo que creamos dentro de este footer
        };
    }, []);

    return (
        <footer ref={footerRef} className="q-footer">
            <div className="q-footer__bg" aria-hidden="true">
                <div ref={linesWrapRef}>
                    <LinesFooter className="q-footer__lines" />
                </div>
            </div>

            <div className="q-footer__content Conteiner">
                <div ref={contentTopRef} className="q-footer__top">
                    <div className="q-footer__cta">
                        <h3>
                            {t.ctaLine1}
                            <br />
                            {t.ctaLine2}
                        </h3>

                        {/* OJO: tu ancla actual es #contacto (déjala igual) */}
                        <a className="q-footer__btn" href="#contacto">
                            {t.ctaBtn}
                        </a>
                    </div>
                </div>

                <div ref={wordmarkRef} className="q-footer__wordmark" aria-hidden="true">
                    <img src={LettersFooter} alt="" />
                </div>

                <div ref={contentBottomRef} className="q-footer__bottom">
                    <span>{t.copyright}</span>

                    <div className="q-footer__social">
                        <a href="#" aria-label={t.facebook}>
                            <img src={FacebookIcon} alt="" />
                        </a>
                        <a href="#" aria-label={t.instagram}>
                            <img src={InstagramIcon} alt="" />
                        </a>
                        <a href="#" aria-label={t.whatsapp}>
                            <img src={WhatsappIcon} alt="" />
                        </a>
                        <a href="#" aria-label={t.email}>
                            <img src={MailIcon} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}