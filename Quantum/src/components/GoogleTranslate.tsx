import React, { useEffect, useState } from "react";
import { FiGlobe } from "react-icons/fi";

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
        googleTranslateElement?: unknown;
    }
}

interface GoogleTranslateProps {
    mobile?: boolean;
}

const GoogleTranslate: React.FC<GoogleTranslateProps> = ({ mobile = false }) => {
    const [open, setOpen] = useState(false);
    const [lang, setLang] = useState<"es" | "en">("es");

    // Load Google Translate script and hidden container only once
    useEffect(() => {
        const existingScript = document.getElementById("google-translate-script");
        if (!existingScript) {
            const script = document.createElement("script");
            script.id = "google-translate-script";
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            document.body.appendChild(script);
        }

        window.googleTranslateElementInit = () => {
            if (!window.googleTranslateElement && window.google) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: "es",
                        includedLanguages: "es,en",
                        autoDisplay: false,
                    },
                    "google_translate_container"
                );
            }
        };

        if (!document.getElementById("google_translate_container")) {
            const div = document.createElement("div");
            div.id = "google_translate_container";
            div.style.display = "none";
            document.body.appendChild(div);
        }

        const match = document.cookie.match(/googtrans=\/[^/]+\/(\w{2})/);
        if (match) {
            setLang(match[1] as "es" | "en");
        }
        const removeBanner = () => {
            const frame = document.querySelector(
                "iframe.goog-te-banner-frame"
            );
            if (frame?.parentNode) {
                frame.parentNode.removeChild(frame);
            }
            document.body.style.top = "0px";
        };

        const observer = new MutationObserver(removeBanner);
        observer.observe(document.body, { childList: true, subtree: true });
        removeBanner();

        return () => observer.disconnect();
    }, []);

    const switchLanguage = (target: "es" | "en") => {
        const select = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
        if (select) {
            select.value = target;
            select.dispatchEvent(new Event("change"));
            setLang(target);
        }
        setOpen(false);
    };

    const optionLabel = lang === "es" ? "English" : "Español";
    const optionTarget = lang === "es" ? "en" : "es";

    const baseButtonClass = mobile
        ? "block w-full text-left text-white text-xl py-3 px-4 rounded-lg hover:bg-white/10 hover:text-[#ffff00] transition-all duration-200 border-l-4 border-transparent hover:border-[#ffff00]"
        : "flex items-center text-white hover:text-[#ffff00] transition-colors";

    const dropdownClass = mobile
        ? "absolute left-0 mt-2 bg-black/80 rounded-md shadow-lg"
        : "absolute right-0 mt-2 bg-black/80 rounded-md shadow-lg";

    return (
        <div className={mobile ? "relative" : "relative"}>
            <button
                onClick={() => setOpen((o) => !o)}
                className={baseButtonClass}
                aria-label="Cambiar idioma"
            >
                {!mobile && <FiGlobe className="w-5 h-5" />}
                {mobile && (
                    <span className="flex items-center">
                        <FiGlobe className="w-5 h-5 mr-2" />
                        {optionLabel}
                    </span>
                )}
            </button>
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
