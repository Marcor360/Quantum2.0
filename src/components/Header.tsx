import { useEffect, useMemo, useRef, useState } from "react";
import "./header.css";

import Logo from "../assets/svg/Logo-Amarillo.svg";
import MenuIcon from "../assets/svg/Menu.svg";
import LenguajeIcon from "../assets/svg/Lenguaje.svg";

type Lang = "es" | "en";

const copy: Record<
    Lang,
    {
        services: string;
        projects: string;
        quantum: string;
        contact: string;
        language: string;
        openMenu: string;
        closeMenu: string;
        switchTo: string;
    }
> = {
    es: {
        services: "Servicios",
        projects: "Proyectos",
        quantum: "Quantum 360º",
        contact: "Contáctanos",
        language: "Lenguaje",
        openMenu: "Abrir menú",
        closeMenu: "Cerrar menú",
        switchTo: "Cambiar a inglés",
    },
    en: {
        services: "Services",
        projects: "Projects",
        quantum: "Quantum 360º",
        contact: "Contact",
        language: "Language",
        openMenu: "Open menu",
        closeMenu: "Close menu",
        switchTo: "Switch to Spanish",
    },
};

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = () => setMatches(mql.matches);
        onChange();
        mql.addEventListener("change", onChange);
        return () => mql.removeEventListener("change", onChange);
    }, [query]);

    return matches;
}

export default function Header() {
    const isDesktop = useMediaQuery("(min-width: 901px)");
    const [lang, setLang] = useState<Lang>("es");
    const [open, setOpen] = useState(false);

    const pillRef = useRef<HTMLDivElement | null>(null);

    const t = useMemo(() => copy[lang], [lang]);

    // Persistir idioma
    useEffect(() => {
        const saved = (localStorage.getItem("lang") as Lang | null) ?? "es";
        setLang(saved);
        document.documentElement.lang = saved;
    }, []);

    useEffect(() => {
        localStorage.setItem("lang", lang);
        document.documentElement.lang = lang;
    }, [lang]);

    // Cerrar menú si cambia el breakpoint (evita estados raros)
    useEffect(() => {
        setOpen(false);
    }, [isDesktop]);

    // Cerrar con ESC
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        if (open) window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    // Bloquear scroll SOLO en mobile (porque ahí sí hay drawer)
    useEffect(() => {
        if (!open) return;
        if (isDesktop) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open, isDesktop]);

    // Click fuera para cerrar SOLO en desktop (menú inline)
    useEffect(() => {
        if (!open || !isDesktop) return;

        const onDown = (e: MouseEvent) => {
            const el = pillRef.current;
            if (!el) return;
            if (el.contains(e.target as Node)) return;
            setOpen(false);
        };

        window.addEventListener("mousedown", onDown);
        return () => window.removeEventListener("mousedown", onDown);
    }, [open, isDesktop]);

    const toggleLang = () => setLang((p) => (p === "es" ? "en" : "es"));
    const toggleOpen = () => setOpen((p) => !p);
    const close = () => setOpen(false);

    return (
        <header className={`q-header ${open ? "is-open" : ""}`}>
            <div className="q-header__bar">
                {/* LOGO fuera del contorno */}
                <a className="q-header__logo" href="/" aria-label="Home">
                    <img src={Logo} alt="Quantum" />
                </a>

                {/* PILL (contorno) */}
                <div className="q-header__pill" ref={pillRef}>
                    {/* Desktop: el nav se despliega aquí (inline) */}
                    <nav className="q-header__navDesktop" aria-label="Primary">
                        <a className="q-header__link" href="/servicios" onClick={close}>{t.services}</a>
                        <a className="q-header__link" href="#quantum" onClick={close}>{t.quantum}</a>
                        <a className="q-header__link" href="#proyectos" onClick={close}>{t.projects}</a>
                        <a className="q-header__link" href="#contacto" onClick={close}>{t.contact}</a>

                        <button type="button" className="q-header__lang" onClick={toggleLang}>
                            <img className="q-icon" src={LenguajeIcon} alt="" />
                            <span>{t.language}</span>
                            <span className="sr-only">{t.switchTo}</span>
                        </button>
                    </nav>

                    {/* Menú (siempre visible): en desktop abre inline, en mobile abre drawer */}
                    <button
                        type="button"
                        className="q-header__burger"
                        aria-label={open ? t.closeMenu : t.openMenu}
                        aria-controls="q-mobile-drawer"
                        aria-expanded={open}
                        onClick={toggleOpen}
                    >
                        <img className="q-icon q-icon--menu" src={MenuIcon} alt="" />
                    </button>
                </div>
            </div>

            {/* Mobile: overlay */}
            <button
                type="button"
                className={`q-drawerOverlay ${open ? "is-open" : ""}`}
                aria-label="Close"
                onClick={close}
            />

            {/* Mobile: drawer */}
            <aside
                id="q-mobile-drawer"
                className={`q-drawer ${open ? "is-open" : ""}`}
                aria-hidden={!open}
            >
                <div className="q-drawer__top">
                    <a className="q-drawer__logo" href="/" onClick={close} aria-label="Home">
                        <img src={Logo} alt="Quantum" />
                    </a>

                    <button type="button" className="q-drawer__close" onClick={close} aria-label={t.closeMenu}>
                        ×
                    </button>
                </div>

                <nav className="q-drawer__nav" aria-label="Mobile Menu">
                    <a className="q-drawer__link" href="/servicios" onClick={close}>{t.services}</a>
                    <a className="q-drawer__link" href="#quantum" onClick={close}>{t.quantum}</a>
                    <a className="q-drawer__link" href="#proyectos" onClick={close}>{t.projects}</a>
                    <a className="q-drawer__link" href="#contacto" onClick={close}>{t.contact}</a>

                    <button type="button" className="q-drawer__lang" onClick={toggleLang}>
                        <img className="q-icon" src={LenguajeIcon} alt="" />
                        <span>{t.language}</span>
                        <span className="q-drawer__langHint">{lang === "es" ? "ES → EN" : "EN → ES"}</span>
                    </button>
                </nav>
            </aside>
        </header>
    );
}
