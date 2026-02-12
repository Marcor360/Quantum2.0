import { useMemo, useEffect } from "react";
import Head from "../components/Header";
import Footer from "../components/Footer";
import "./contacto.css";
import type { FormEvent } from "react";
import { useLang, type Lang } from "../i18n/lang";

const CONTACT_COPY: Record<Lang, any> = {
    es: {
        heroSide: "Contacto",
        heroTitle: "Hablemos de tu proyecto",
        heroSubtitle: "Diseñemos juntos la siguiente versión de tu marca, tu producto digital o tu estrategia de crecimiento.",

        infoTitle: "Elige cómo quieres conversar",
        infoSub: "Cuéntanos qué necesitas y te respondemos en menos de 1 día hábil.",

        cardWrite: "Escríbenos",
        cardWriteDesc: "Envíanos contexto, enlaces y objetivos.",
        cardCall: "Llámanos",
        cardCallDesc: "De 9:00 a 18:00 (CDMX), lunes a viernes.",
        cardSchedule: "Agenda",
        cardScheduleLabel: "Calendario 20 min",
        cardScheduleDesc: "Elegimos horario y te guiamos en vivo.",

        formName: "Nombre completo",
        formNamePlace: "Tu nombre",
        formEmail: "Correo",
        formEmailPlace: "tu@email.com",
        formPhone: "Teléfono",
        formService: "Servicio de interés",
        formServicePlaceholder: "Selecciona una opción",
        formChallenge: "Cuéntanos del reto",
        formChallengePlace: "Objetivos, plazo, equipo involucrado, referencias...",
        formSubmit: "Enviar mensaje",
        formNote: "Respondemos en menos de 24 horas hábiles.",

        services: [
            { value: "branding", label: "Branding" },
            { value: "marketing", label: "Marketing digital" },
            { value: "producto", label: "Producto / App / Web" },
            { value: "seo", label: "SEO" },
            { value: "otro", label: "Otro" },
        ]
    },
    en: {
        heroSide: "Contact",
        heroTitle: "Let's talk about your project",
        heroSubtitle: "Let's design together the next version of your brand, your digital product, or your growth strategy.",

        infoTitle: "Choose how you want to talk",
        infoSub: "Tell us what you need and we will answer in less than 1 business day.",

        cardWrite: "Write to us",
        cardWriteDesc: "Send us context, links, and objectives.",
        cardCall: "Call us",
        cardCallDesc: "From 9:00 to 18:00 (CDMX), Monday to Friday.",
        cardSchedule: "Schedule",
        cardScheduleLabel: "20 min calendar",
        cardScheduleDesc: "We choose a time and guide you live.",

        formName: "Full name",
        formNamePlace: "Your name",
        formEmail: "Email",
        formEmailPlace: "you@email.com",
        formPhone: "Phone",
        formService: "Service of interest",
        formServicePlaceholder: "Select an option",
        formChallenge: "Tell us about the challenge",
        formChallengePlace: "Objectives, deadline, involved team, references...",
        formSubmit: "Send message",
        formNote: "We respond in less than 24 business hours.",

        services: [
            { value: "branding", label: "Branding" },
            { value: "marketing", label: "Digital marketing" },
            { value: "producto", label: "Product / App / Web" },
            { value: "seo", label: "SEO" },
            { value: "otro", label: "Other" },
        ]
    }
};

export default function Contacto() {
    const [lang] = useLang();
    const t = useMemo(() => CONTACT_COPY[lang], [lang]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        console.log("Contacto enviado:", Object.fromEntries(data.entries()));
    };

    return (
        <>
            <Head />

            <main className="ContactoPage">
                <section className="ContactoHero">
                    <div className="ContactoWrap">
                        <p className="ContactoEyebrow">{t.heroSide}</p>
                        <h1 className="ContactoTitle">{t.heroTitle}</h1>
                        <p className="ContactoLead">{t.heroSubtitle}</p>
                    </div>
                </section>

                <section className="ContactoContent">
                    <div className="ContactoWrap ContactoGrid">
                        <div className="ContactoInfo">
                            <h2>{t.infoTitle}</h2>
                            <p className="ContactoInfo__text">{t.infoSub}</p>

                            <div className="ContactoInfo__cards">
                                <article className="ContactoCard">
                                    <span className="ContactoCard__kicker">{t.cardWrite}</span>
                                    <a className="ContactoCard__link" href="mailto:jffonseca@quantumsales.mx">
                                        jffonseca@quantumsales.mx
                                    </a>
                                    <p>{t.cardWriteDesc}</p>
                                </article>

                                <article className="ContactoCard">
                                    <span className="ContactoCard__kicker">{t.cardCall}</span>
                                    <a className="ContactoCard__link" href="tel:+525538278103">
                                        +52 55 3827 8103
                                    </a>
                                    <p>{t.cardCallDesc}</p>
                                </article>

                                <article className="ContactoCard">
                                    <span className="ContactoCard__kicker">{t.cardSchedule}</span>
                                    <a className="ContactoCard__link" href="https://cal.com" target="_blank" rel="noreferrer">
                                        {t.cardScheduleLabel}
                                    </a>
                                    <p>{t.cardScheduleDesc}</p>
                                </article>
                            </div>
                        </div>

                        <form className="ContactoForm" onSubmit={handleSubmit}>
                            <div className="ContactoForm__row">
                                <label>
                                    {t.formName}
                                    <input name="nombre" type="text" required placeholder={t.formNamePlace} />
                                </label>
                                <label>
                                    {t.formEmail}
                                    <input name="email" type="email" required placeholder={t.formEmailPlace} />
                                </label>
                            </div>

                            <div className="ContactoForm__row">
                                <label>
                                    {t.formPhone}
                                    <input name="telefono" type="tel" placeholder="+52 55 3827 8103" />
                                </label>
                                <label>
                                    {t.formService}
                                    <select name="servicio" defaultValue="">
                                        <option value="" disabled>
                                            {t.formServicePlaceholder}
                                        </option>
                                        {t.services.map((s: any) => (
                                            <option key={s.value} value={s.value}>{s.label}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <label className="ContactoForm__full">
                                {t.formChallenge}
                                <textarea
                                    name="mensaje"
                                    rows={4}
                                    placeholder={t.formChallengePlace}
                                    required
                                />
                            </label>

                            <button className="ContactoForm__submit" type="submit">
                                {t.formSubmit}
                            </button>
                            <p className="ContactoForm__note">{t.formNote}</p>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
