import { useEffect, useMemo, useState } from "react";

/**
 * Supported languages
 */
export type Lang = "es" | "en";

/**
 * localStorage key for persisting language
 */
export const LANG_STORAGE_KEY = "lang";

/**
 * Custom event name for language changes
 */
export const LANG_EVENT = "q:lang";

/**
 * Validates if a value is a valid Lang type
 */
function isLang(v: unknown): v is Lang {
    return v === "es" || v === "en";
}

/**
 * Reads the language from localStorage (SSR safe)
 * @returns The stored language or default fallback
 */
export function getStoredLang(): Lang {
    if (typeof window === "undefined") return "es";
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === "en" ? "en" : "es";
}

/**
 * Persiste en localStorage y notifica a la app con un CustomEvent.
 * Esto hace que cualquier pantalla que escuche "q:lang" re-renderice.
 */
export function setStoredLang(next: Lang): void {
    if (typeof window === "undefined") return;

    const safe: Lang = next === "en" ? "en" : "es";

    try {
        window.localStorage.setItem(LANG_STORAGE_KEY, safe);
    } catch {
        // ignore (modo privado / storage bloqueado)
    }

    window.dispatchEvent(new CustomEvent<Lang>(LANG_EVENT, { detail: safe }));
}

/**
 * Toggles between "es" and "en", persists the change, and returns the new value
 * @returns The new language after toggling
 */
export function toggleLang(): Lang {
    const next: Lang = getStoredLang() === "es" ? "en" : "es";
    setStoredLang(next);
    return next;
}

/**
 * Hook sin Provider: estado local + eventos globales.
 * Útil cuando aún no quieres montar un Context global.
 */
export function useLang(): readonly [Lang, (next: Lang) => void] {
    const [lang, setLangState] = useState<Lang>(() => getStoredLang());

    useEffect(() => {
        if (typeof window === "undefined") return;

        const onLangEvent = (e: Event) => {
            const next = (e as CustomEvent<Lang>).detail;
            if (isLang(next)) setLangState(next);
        };

        const onStorage = (e: StorageEvent) => {
            if (e.key !== LANG_STORAGE_KEY) return;
            const v = e.newValue;
            if (isLang(v)) setLangState(v);
        };

        window.addEventListener(LANG_EVENT, onLangEvent as EventListener);
        window.addEventListener("storage", onStorage);

        // sync inicial
        setLangState(getStoredLang());

        return () => {
            window.removeEventListener(LANG_EVENT, onLangEvent as EventListener);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    const setLang = useMemo(() => {
        return (next: Lang) => setStoredLang(next);
    }, []);

    return [lang, setLang] as const;
}
