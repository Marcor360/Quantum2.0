import "./footer.css";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LinesFooter from "../assets/svg/360/LineasFooter.svg?react";
import LettersFooter from "../assets/svg/360/Letras Quantum Footer.svg";
import FacebookIcon from "../assets/svg/redes/facebook.svg";
import InstagramIcon from "../assets/svg/redes/instagram.svg";
import WhatsappIcon from "../assets/svg/redes/whatsapp.svg";
import MailIcon from "../assets/svg/redes/mail.svg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const linesRef = useRef<SVGSVGElement>(null);
    const contentTopRef = useRef<HTMLDivElement>(null);
    const wordmarkRef = useRef<HTMLDivElement>(null);
    const contentBottomRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const footer = footerRef.current;
        const lines = linesRef.current;
        const contentTop = contentTopRef.current;
        const wordmark = wordmarkRef.current;
        const contentBottom = contentBottomRef.current;

        if (!footer || !lines || !contentTop || !wordmark || !contentBottom) return;

        // Create a timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 80%", // Start when footer is 80% from top of viewport
                end: "top 20%",
                toggleActions: "play none none none", // Only play once
            }
        });

        // Animate SVG lines with stroke-dashoffset
        const paths = lines.querySelectorAll("path");
        paths.forEach((path, index) => {
            const length = 2200; // Match the CSS value
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                fillOpacity: 0,
                strokeOpacity: 1
            });

            tl.to(path, {
                strokeDashoffset: 0,
                duration: 2.8,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to(path, {
                        fillOpacity: 1,
                        strokeOpacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut"
                    });
                }
            }, index * 0.25); // Stagger each path
        });

        // Animate content sections
        tl.fromTo(contentTop,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "+=1.4" // Start after lines animation
        );

        tl.fromTo(wordmark,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "-=0.5" // Overlap slightly with previous animation
        );

        tl.fromTo(contentBottom,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            "-=0.7" // Overlap slightly with previous animation
        );

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === footer) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <footer ref={footerRef} className="q-footer">
            <div className="q-footer__bg" aria-hidden="true">
                <LinesFooter ref={linesRef} className="q-footer__lines" />
            </div>

            <div className="q-footer__content Conteiner">
                <div ref={contentTopRef} className="q-footer__top">
                    <div className="q-footer__cta">
                        <h3>¡Impulsemos<br />tus ideas!</h3>
                        <a className="q-footer__btn" href="#contacto">Vamos a hablar</a>
                    </div>
                </div>

                <div ref={wordmarkRef} className="q-footer__wordmark" aria-hidden="true">
                    <img src={LettersFooter} alt="" />
                </div>

                <div ref={contentBottomRef} className="q-footer__bottom">
                    <span>© 2025 Quantum Marketing & Sales</span>
                    <div className="q-footer__social">
                        <a href="#" aria-label="Facebook">
                            <img src={FacebookIcon} alt="" />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <img src={InstagramIcon} alt="" />
                        </a>
                        <a href="#" aria-label="WhatsApp">
                            <img src={WhatsappIcon} alt="" />
                        </a>
                        <a href="#" aria-label="Email">
                            <img src={MailIcon} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
