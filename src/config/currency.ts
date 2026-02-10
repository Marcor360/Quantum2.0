// src/config/currency.ts
import type { Lang } from "../i18n/lang";

/**
 * Tasa de conversión: cuántos MXN equivalen a 1 USD
 */
export const USD_RATE = 17.2;

/**
 * Formatea un precio en MXN a la moneda y formato correcto según el idioma
 * @param value - Precio en MXN
 * @param lang - Idioma actual ("es" o "en")
 * @returns Objeto con el monto formateado y el sufijo de moneda
 */
export function formatMoney(
    value: number,
    lang: Lang
): { amount: string; suffix: "MX" | "US" } {
    if (lang === "en") {
        // Convertir a USD
        const valueUSD = value / USD_RATE;
        const formatter = new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return {
            amount: formatter.format(valueUSD),
            suffix: "US",
        };
    } else {
        // Mantener en MXN
        const formatter = new Intl.NumberFormat("es-MX", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return {
            amount: formatter.format(value),
            suffix: "MX",
        };
    }
}
