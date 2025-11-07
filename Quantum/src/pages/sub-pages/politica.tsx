export default function Politicas() {
    return (
        <main id="top" className="min-h-screen scroll-smooth bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
            {/* Hero */}
            <header className="relative isolate">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,0.18),rgba(0,0,0,0))]" />
                <div className="mx-auto max-w-5xl px-4 py-16">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-90" aria-hidden="true">
                            <path fill="currentColor" d="M12 1a2 2 0 0 1 2 2v1.06a8.003 8.003 0 0 1 6.94 6.94H22a2 2 0 1 1 0 4h-1.06a8.003 8.003 0 0 1-6.94 6.94V21a2 2 0 1 1-4 0v-1.06a8.003 8.003 0 0 1-6.94-6.94H2a2 2 0 1 1 0-4h1.06a8.003 8.003 0 0 1 6.94-6.94V3a2 2 0 0 1 2-2Zm0 6a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z" />
                        </svg>
                        Última actualización:&nbsp;
                        <time dateTime="2025-11-06">6 de noviembre de 2025</time>
                    </span>

                    <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Política de Privacidad — Win Zone Casino
                    </h1>
                    <p className="mt-4 max-w-3xl text-slate-300">
                        En Win Zone Casino valoramos su privacidad y estamos comprometidos con la protección de sus datos personales
                        conforme a las leyes de protección de datos aplicables.
                    </p>
                </div>
            </header>

            {/* Body */}
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 lg:grid-cols-[240px_minmax(0,1fr)]">
                {/* TOC */}
                <aside className="lg:sticky lg:top-8 h-max">
                    <nav className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20">
                        <p className="mb-3 text-xs uppercase tracking-wider text-slate-400">Contenido</p>
                        <ul className="space-y-2 text-sm">
                            {[
                                ["info-que-recopilamos", "1. Información que recopilamos"],
                                ["uso-info", "2. Uso de la información"],
                                ["comparticion-datos", "3. Compartición de datos"],
                                ["seguridad", "4. Seguridad de la información"],
                                ["cookies", "5. Cookies y tecnologías similares"],
                                ["derechos-usuario", "6. Derechos del usuario"],
                                ["conservacion-datos", "7. Conservación de datos"],
                                ["cambios", "8. Cambios a esta política"],
                            ].map(([id, label]) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        className="group block rounded-lg px-3 py-2 text-slate-300 ring-cyan-400/40 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2"
                                    >
                                        <span className="flex items-center justify-between">
                                            {label}
                                            <span className="opacity-0 transition group-hover:opacity-100">#</span>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Content */}
                <article className="space-y-6">
                    <IntroCardPrivacy />

                    <Section id="info-que-recopilamos" title="1. Información que recopilamos">
                        <>
                            <p>Recopilamos los siguientes tipos de información cuando usted utiliza la Plataforma:</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
                                <li>Datos de registro (nombre, correo electrónico, fecha de nacimiento).</li>
                                <li>Información financiera (métodos de pago, historial de transacciones).</li>
                                <li>Datos técnicos (dirección IP, tipo de dispositivo, navegador, cookies).</li>
                                <li>Información sobre su actividad de juego (apuestas, historial de partidas, preferencias).</li>
                            </ul>
                        </>
                    </Section>

                    <Section id="uso-info" title="2. Uso de la información">
                        <>
                            <p>Usamos los datos recopilados para:</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
                                <li>Proveer acceso y funcionalidad al servicio.</li>
                                <li>Gestionar cuentas, depósitos y retiros.</li>
                                <li>Cumplir obligaciones legales (prevención de fraude y lavado de dinero).</li>
                                <li>Mejorar la experiencia del usuario y ofrecer promociones personalizadas.</li>
                                <li>Enviar notificaciones y actualizaciones relevantes.</li>
                            </ul>
                        </>
                    </Section>

                    <Section id="comparticion-datos" title="3. Compartición de datos">
                        <>
                            <p>Podemos compartir información con:</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
                                <li>Proveedores de servicios de pago y seguridad.</li>
                                <li>Autoridades regulatorias cuando sea requerido por ley.</li>
                                <li>Socios tecnológicos para análisis y mantenimiento del sistema.</li>
                            </ul>
                            <p className="mt-3">
                                No vendemos, alquilamos ni intercambiamos su información personal con terceros.
                            </p>
                        </>
                    </Section>

                    <Section id="seguridad" title="4. Seguridad de la información">
                        Implementamos medidas técnicas y organizativas adecuadas para proteger sus datos contra pérdida, acceso no
                        autorizado, alteración o divulgación indebida.
                    </Section>

                    <Section id="cookies" title="5. Cookies y tecnologías similares">
                        Utilizamos cookies para mejorar la navegación, personalizar la experiencia y analizar el tráfico del sitio.
                        El Usuario puede gestionar o desactivar las cookies desde la configuración de su navegador.
                    </Section>

                    <Callout id="derechos-usuario" title="6. Derechos del usuario">
                        <>
                            <ul className="list-disc space-y-2 pl-6">
                                <li>Acceder, rectificar o eliminar sus datos personales.</li>
                                <li>Retirar su consentimiento al uso de datos.</li>
                                <li>Solicitar la limitación o portabilidad de la información.</li>
                            </ul>
                            <p className="mt-3">
                                Puede ejercer estos derechos contactándonos en <span className="font-medium">[correo de contacto]</span>.
                            </p>
                        </>
                    </Callout>

                    <Section id="conservacion-datos" title="7. Conservación de datos">
                        Los datos personales se conservarán mientras la cuenta esté activa o durante el tiempo necesario para
                        cumplir obligaciones legales o contractuales.
                    </Section>

                    <Section id="cambios" title="8. Cambios a esta política">
                        Podemos actualizar esta Política de Privacidad periódicamente. Las modificaciones entrarán en vigor al
                        publicarse en la Plataforma.
                    </Section>

                    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-slate-400">
                        <span>© {new Date().getFullYear()} Win Zone Casino. Todos los derechos reservados.</span>
                        <a
                            href="#top"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-200 transition hover:bg-white/10"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor" d="M12 4l6 6h-4v8h-4v-8H6z" />
                            </svg>
                            Volver arriba
                        </a>
                    </div>
                </article>
            </div>
        </main>
    );
}

/* ---------- UI Subcomponents (sin dependencias externas) ---------- */

function IntroCardPrivacy() {
    return (
        <section
            aria-labelledby="intro-privacy-title"
            className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent p-6 shadow-lg shadow-black/20"
        >
            <h2 id="intro-privacy-title" className="text-lg font-semibold text-white">
                Compromiso con su privacidad
            </h2>
            <p className="mt-2 text-slate-300">
                Tratamos sus datos personales con responsabilidad y transparencia. Resumimos a continuación los puntos clave de
                nuestra Política de Privacidad.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                    "Recopilamos datos para operar y mejorar la Plataforma.",
                    "No vendemos sus datos personales a terceros.",
                    "Aplicamos medidas de seguridad técnicas y organizativas.",
                    "Usted puede ejercer derechos ARCO y retirar su consentimiento.",
                ].map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span className="text-sm text-slate-300">{item}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section
            id={id}
            className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/20"
            aria-labelledby={`${id}-title`}
        >
            <h2 id={`${id}-title`} className="text-xl font-semibold text-white">
                {title}
            </h2>
            <div className="mt-2 leading-relaxed text-slate-300">{children}</div>
        </section>
    );
}

function Callout({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <section
            id={id}
            className="scroll-mt-24 relative overflow-hidden rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent p-6 shadow-lg shadow-black/20"
            aria-labelledby={`${id}-title`}
        >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
            <h2 id={`${id}-title`} className="flex items-center gap-2 text-xl font-semibold text-white">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400/20 text-emerald-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill="currentColor" d="M9 12l2 2 4-4 2 2-6 6-4-4 2-2z" />
                    </svg>
                </span>
                {title}
            </h2>
            <div className="mt-2 leading-relaxed text-slate-300">{children}</div>
        </section>
    );
}
