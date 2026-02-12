import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import Logo from "../assets/svg/Logo-Amarillo.svg";
import MenuIcon from "../assets/svg/Menu.svg";
import LenguajeIcon from "../assets/svg/Lenguaje.svg";

import { useLang, type Lang } from "../i18n/lang";

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
    const [lang, setLang] = useLang(); // Hook que sincroniza con eventos globales
    const [open, setOpen] = useState(false);

    const pillRef = useRef<HTMLDivElement | null>(null);

    const t = useMemo(() => copy[lang], [lang]);
    const services = useMemo(
        () =>
            lang === "en"
                ? [
                    { label: "Chatbot + A.I.", to: "/servicios/app-e-ia" },
                    { label: "Branding", to: "/servicios/branding" },
                    { label: "Social Media", to: "/servicios/campanas" },
                    { label: "E-commerce", to: "/servicios/ecomerce" },
                ]
                : [
                    { label: "CHATBOT + I.A.", to: "/servicios/app-e-ia" },
                    { label: "Branding", to: "/servicios/branding" },
                    { label: "Campañas", to: "/servicios/campanas" },
                    { label: "Ecommerce", to: "/servicios/ecomerce" },
                ],
        [lang],
    );

    // Actualizar el atributo lang del documento cuando cambia el idioma
    useEffect(() => {
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

    const toggleLang = () => setLang(lang === "es" ? "en" : "es");
    const toggleOpen = () => setOpen((p) => !p);
    const close = () => setOpen(false);

    return (
        <header className={`q-header ${open ? "is-open" : ""}`}>
            <div className="q-header__bar">
                {/* LOGO fuera del contorno */}
                <Link className="q-header__logo" to="/" aria-label="Home" onClick={close}>
                    <img src={Logo} alt="Quantum" />
                </Link>

                {/* PILL (contorno) */}
                <div className="q-header__pill" ref={pillRef}>
                    {/* Desktop: el nav se despliega aquí (inline) */}
                    <nav className="q-header__navDesktop" aria-label="Primary">
                        <div className="q-header__dropdown">
                            <Link className="q-header__link" to="/servicios" onClick={close}>
                                {t.services}
                            </Link>
                            <div className="q-header__dropdownMenu" aria-label={t.services}>
                                {services.map((item) => (
                                    <Link
                                        key={item.to}
                                        className="q-header__submenuLink"
                                        to={item.to}
                                        onClick={close}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <a className="q-header__link" href="#quantum" onClick={close}>{t.quantum}</a>
                        <a className="q-header__link" href="#proyectos" onClick={close}>{t.projects}</a>
                        <Link className="q-header__link" to="/contacto" onClick={close}>{t.contact}</Link>

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
                    <Link className="q-drawer__logo" to="/" onClick={close} aria-label="Home">
                        <img src={Logo} alt="Quantum" />
                    </Link>

                    <button type="button" className="q-drawer__close" onClick={close} aria-label={t.closeMenu}>
                        ×
                    </button>
                </div>

                <nav className="q-drawer__nav" aria-label="Mobile Menu">
                    <div className="q-drawer__group">
                        <Link className="q-drawer__link" to="/servicios" onClick={close}>{t.services}</Link>
                        <div className="q-drawer__subLinks" aria-label={t.services}>
                            {services.map((item) => (
                                <Link
                                    key={item.to}
                                    className="q-drawer__subLink"
                                    to={item.to}
                                    onClick={close}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <a className="q-drawer__link" href="#quantum" onClick={close}>{t.quantum}</a>
                    <a className="q-drawer__link" href="#proyectos" onClick={close}>{t.projects}</a>
                    <Link className="q-drawer__link" to="/contacto" onClick={close}>{t.contact}</Link>

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
