import Head from "../components/Header";
import Footer from "../components/Footer";
import "./contacto.css";
import type { FormEvent } from "react";

export default function Contacto() {
    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const data = new FormData(ev.currentTarget);
        // Puedes reemplazar este console.log por tu integración real (API, email, etc.)
        console.log("Contacto enviado:", Object.fromEntries(data.entries()));
    };

    return (
        <>
            <Head />

            <main className="ContactoPage">
                <section className="ContactoHero">
                    <div className="ContactoWrap">
                        <p className="ContactoEyebrow">Contacto</p>
                        <h1 className="ContactoTitle">Hablemos de tu proyecto</h1>
                        <p className="ContactoLead">
                            Diseñemos juntos la siguiente versión de tu marca, tu producto digital o tu estrategia de
                            crecimiento.
                        </p>
                    </div>
                </section>

                <section className="ContactoContent">
                    <div className="ContactoWrap ContactoGrid">
                        <div className="ContactoInfo">
                            <h2>Elige cómo quieres conversar</h2>
                            <p className="ContactoInfo__text">
                                Cuéntanos qué necesitas y te respondemos en menos de 1 día hábil.
                            </p>

                            <div className="ContactoInfo__cards">
                                <article className="ContactoCard">
                                    <span className="ContactoCard__kicker">Escríbenos</span>
                                    <a className="ContactoCard__link" href="mailto:hola@quantum.com">
                                        hola@quantum.com
                                    </a>
                                    <p>Envíanos contexto, enlaces y objetivos.</p>
                                </article>

                                <article className="ContactoCard">
                                    <span className="ContactoCard__kicker">Llámanos</span>
                                    <a className="ContactoCard__link" href="tel:+525500000000">
                                        +52 (55) 0000 0000
                                    </a>
                                    <p>De 9:00 a 18:00 (CDMX), lunes a viernes.</p>
                                </article>

                                <article className="ContactoCard">
                                    <span className="ContactoCard__kicker">Agenda</span>
                                    <a className="ContactoCard__link" href="https://cal.com" target="_blank" rel="noreferrer">
                                        Calendario 20 min
                                    </a>
                                    <p>Elegimos horario y te guiamos en vivo.</p>
                                </article>
                            </div>
                        </div>

                        <form className="ContactoForm" onSubmit={handleSubmit}>
                            <div className="ContactoForm__row">
                                <label>
                                    Nombre completo
                                    <input name="nombre" type="text" required placeholder="Tu nombre" />
                                </label>
                                <label>
                                    Correo
                                    <input name="email" type="email" required placeholder="tu@email.com" />
                                </label>
                            </div>

                            <div className="ContactoForm__row">
                                <label>
                                    Teléfono
                                    <input name="telefono" type="tel" placeholder="+52 55 0000 0000" />
                                </label>
                                <label>
                                    Servicio de interés
                                    <select name="servicio" defaultValue="">
                                        <option value="" disabled>
                                            Selecciona una opción
                                        </option>
                                        <option value="branding">Branding</option>
                                        <option value="marketing">Marketing digital</option>
                                        <option value="producto">Producto / App / Web</option>
                                        <option value="seo">SEO</option>
                                        <option value="otro">Otro</option>
                                    </select>
                                </label>
                            </div>

                            <label className="ContactoForm__full">
                                Presupuesto estimado
                                <select name="presupuesto" defaultValue="">
                                    <option value="" disabled>
                                        Selecciona un rango
                                    </option>
                                    <option value="menor-5k">Hasta $5,000 USD</option>
                                    <option value="5k-15k">$5,000 - $15,000 USD</option>
                                    <option value="15k-30k">$15,000 - $30,000 USD</option>
                                    <option value="30k-plus">$30,000 USD o más</option>
                                </select>
                            </label>

                            <label className="ContactoForm__full">
                                Cuéntanos del reto
                                <textarea
                                    name="mensaje"
                                    rows={4}
                                    placeholder="Objetivos, plazo, equipo involucrado, referencias..."
                                    required
                                />
                            </label>

                            <button className="ContactoForm__submit" type="submit">
                                Enviar mensaje
                            </button>
                            <p className="ContactoForm__note">Respondemos en menos de 24 horas hábiles.</p>
                        </form>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
