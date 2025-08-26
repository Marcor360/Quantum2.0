/**
 * Componente: GoogleTranslate
 * - Carga el widget de Google Translate una sola vez.
 * - Muestra un botón (de escritorio o móvil) para alternar entre ES/EN.
 * - Elimina la barra/baner/iframes de Google Translate que aparecen al traducir.
 */

import React, { useEffect, useState } from "react";
import { FiGlobe } from "react-icons/fi";

/**
 * Extendemos el tipo global `window` para:
 * - Declarar el callback `googleTranslateElementInit` que Google invocará
 *   cuando cargue su script.
 * - Tipar el namespace `window.google.translate.TranslateElement`.
 */
declare global {
    interface Window {
        googleTranslateElementInit: () => void;
        google?: {
            translate: {
                TranslateElement: new (
                    options: Record<string, unknown>,
                    id: string
                ) => unknown;
            };
        };
        // Presencia del elemento de Google (no lo usamos directamente, pero lo dejamos por claridad)
        googleTranslateElement?: unknown;
    }
}

interface GoogleTranslateProps {
    /** Si `true`, usa estilos/markup pensados para menú móvil */
    mobile?: boolean;
}

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({ mobile = false }) => {
    // Controla la visibilidad del dropdown (opción de idioma)
    const [open, setOpen] = useState(false);
    // Idioma actual inferido de la cookie de Google o por defecto "es"
    const [lang, setLang] = useState<"es" | "en">("es");

    /**
     * Efecto: carga el script de Google Translate y prepara el contenedor oculto
     * sólo una vez. También monta un MutationObserver para eliminar
     * la barra/iframes que Google inserta.
     */
    useEffect(() => {
        // 1) Cargar script de Google sólo si aún no existe
        const existingScript = document.getElementById("google-translate-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            // Google llamará a window.googleTranslateElementInit cuando termine de cargar
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(script);
        }

        // 2) Callback global que inicializa el widget en un contenedor oculto
        window.googleTranslateElementInit = () => {
            if (!window.googleTranslateElement && window.google) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "es",        // Idioma original de la página
                        includedLanguages: "es,en", // Idiomas disponibles en el switch
                        autoDisplay: false,         // No mostrar el popup automático
                    },
                    "google_translate_container"   // ID del contenedor (oculto)
                );
            }
        };

        // 3) Crear contenedor oculto para montar el widget (si no existe)
        if (!document.getElementById("google_translate_container")) {
            const div = document.createElement("div");
            div.id = "google_translate_container";
            div.style.display = "none"; // Lo mantenemos oculto (usaremos el select interno por JS)
            document.body.appendChild(div);
        }

        // 4) Si ya existe la cookie de Google (googtrans), inferimos el idioma actual
        const match = document.cookie.match(/googtrans=\/[^/]+\/(\w{2})/);
        if (match) {
            setLang(match[1] as "es" | "en");
        }

        // 5) Función para eliminar la barra superior y otros iframes/overlays de Google
        const removeBanner = () => {
            [
                "iframe.goog-te-banner-frame", // iframe del banner
                ".goog-te-banner-frame",       // contenedor del banner
                "#goog-gt-tt",                 // tooltip flotante
                "iframe.goog-te-menu-frame",   // iframe del menú de idiomas
            ].forEach((selector) => {
                const el = document.querySelector(selector);
                if (el?.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
            // Google a veces empuja el <body> hacia abajo; lo reseteamos
            document.body.style.top = "0px";
        };

        // 6) Observador del DOM: si Google vuelve a insertar el banner, lo quitamos
        const observer = new MutationObserver(removeBanner);
        observer.observe(document.body, { childList: true, subtree: true });
        // Llamada inicial para limpiar si ya está presente
        removeBanner();

        // 7) Limpieza al desmontar el componente
        return () => observer.disconnect();
    }, []);

    /**
     * Cambia de idioma programáticamente disparando el <select.goog-te-combo>
     * que Google inyecta dentro del contenedor oculto.
     */
    const switchLanguage = (target: "es" | "en") => {
        const select = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
        if (select) {
            select.value = target;                 // Seleccionamos el idioma
            select.dispatchEvent(new Event("change")); // Disparamos el cambio para que Google traduzca
            setLang(target);                       // Actualizamos estado local
        }
        setOpen(false); // Cerramos el dropdown
    };

    // Texto mostrado en el botón según el idioma actual
    const optionLabel = lang === "es" ? "English" : "Español";
    // Destino al que cambiaremos al hacer clic
    const optionTarget = lang === "es" ? "en" : "es";

    // Clases base para el botón, diferentes si es móvil o escritorio
    const baseButtonClass = mobile
        ? "block w-full text-left text-white text-xl py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[#ffff00] transition-all duration-200 border-l-4 border-transparent hover:border-[#ffff00]"
        : "flex items-center text-white hover:text-[#ffff00] transition-colors";

    // Clases del dropdown según contexto (alineación)
    const dropdownClass = mobile
        ? "absolute left-0 mt-2 bg-black/80 rounded-md shadow-lg"
        : "absolute right-0 mt-2 bg-black/80 rounded-md shadow-lg";

    return (
        // El ternario aquí es redundante (ambos casos son "relative"), pero lo mantenemos.
        <div className={mobile ? "relative" : "relative"}>
            {/* Botón que abre/cierra el menú de idioma */}
            <button
                onClick={() => setOpen((o) => !o)}
                className={baseButtonClass}
                aria-label="Cambiar idioma"
            >
                {/* En escritorio, sólo el ícono; en móvil, ícono + texto */}
                {!mobile && <FiGlobe className="w-5 h-5" />}
                {mobile && (
                    <span className="flex items-center">
                        <FiGlobe className="w-5 h-5 mr-2" />
                        {optionLabel}
                    </span>
                )}
            </button>

            {/* Dropdown con la opción de alternar idioma */}
            {open && (
                <div className={dropdownClass}>
                    <button
                        onClick={() => switchLanguage(optionTarget)}
                        className="block px-4 py-2 text-white hover:bg-white/10"
                    >
                        {optionLabel}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GoogleTranslate;
