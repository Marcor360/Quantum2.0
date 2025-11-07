export default function Objetivo() {
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
                        Términos de Servicio — Win Zone Casino
                    </h1>
                    <p className="mt-4 max-w-3xl text-slate-300">
                        Al acceder o utilizar nuestro sitio web y/o aplicación móvil, usted (“el Usuario”) acepta estos
                        Términos de Servicio. Por favor, léalos detenidamente antes de registrarse o realizar cualquier
                        operación en la Plataforma.
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
                                ["objeto", "1. Objeto"],
                                ["edad-registro", "2. Requisitos de edad y registro"],
                                ["cuentas-usuario", "3. Cuentas de usuario"],
                                ["pagos", "4. Depósitos, retiros y métodos de pago"],
                                ["juego-responsable", "5. Uso responsable del juego"],
                                ["conducta-usuario", "6. Conducta del usuario"],
                                ["propiedad-intelectual", "7. Propiedad intelectual"],
                                ["limitacion-responsabilidad", "8. Limitación de responsabilidad"],
                                ["modificaciones", "9. Modificaciones"],
                                ["ley-aplicable", "10. Jurisdicción y ley aplicable"],
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
                    <IntroCard />

                    <Section id="objeto" title="1. Objeto">
                        Win Zone Casino ofrece juegos de azar en línea, entretenimiento y apuestas digitales. El acceso y uso de
                        nuestros servicios está condicionado a la aceptación y cumplimiento de los presentes Términos.
                    </Section>

                    <Section id="edad-registro" title="2. Requisitos de edad y registro">
                        El uso de la Plataforma está restringido a personas mayores de 18 años o la edad legal mínima aplicable en
                        su jurisdicción. Al registrarse, usted garantiza que la información proporcionada es veraz, completa y
                        actualizada.
                    </Section>

                    <Section id="cuentas-usuario" title="3. Cuentas de usuario">
                        Cada usuario podrá crear una sola cuenta personal. Está prohibido compartir cuentas, crear múltiples
                        perfiles o usar datos falsos. Usted es responsable de mantener la confidencialidad de su nombre de usuario y
                        contraseña.
                    </Section>

                    <Section id="pagos" title="4. Depósitos, retiros y métodos de pago">
                        Los depósitos y retiros deben realizarse únicamente a través de los métodos habilitados en la Plataforma.
                        Nos reservamos el derecho de solicitar verificación de identidad antes de procesar cualquier transacción.
                        Todas las operaciones están sujetas a políticas de seguridad y cumplimiento contra el lavado de dinero.
                    </Section>

                    <Callout id="juego-responsable" title="5. Uso responsable del juego">
                        Promovemos el juego responsable. El Usuario puede establecer límites de gasto, autoexclusión o solicitar
                        ayuda en caso de detectar comportamientos compulsivos. El juego debe verse como entretenimiento, no como un
                        medio de ingreso.
                    </Callout>

                    <Section id="conducta-usuario" title="6. Conducta del usuario">
                        El Usuario se compromete a no utilizar la Plataforma con fines ilícitos, fraudulentos o que vulneren
                        derechos de terceros. Cualquier intento de manipulación de resultados, hackeo, uso de software externo o
                        colusión será motivo de suspensión inmediata de la cuenta.
                    </Section>

                    <Section id="propiedad-intelectual" title="7. Propiedad intelectual">
                        Todos los contenidos, logotipos, software, imágenes y gráficos son propiedad de Win Zone Casino o de sus
                        proveedores. Queda prohibida su reproducción total o parcial sin autorización previa.
                    </Section>

                    <Section id="limitacion-responsabilidad" title="8. Limitación de responsabilidad">
                        El Usuario acepta que participa bajo su propio riesgo. Win Zone Casino no se hace responsable por pérdidas
                        económicas derivadas del uso de la Plataforma, interrupciones del servicio o fallas técnicas.
                    </Section>

                    <Section id="modificaciones" title="9. Modificaciones">
                        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Las modificaciones serán
                        notificadas y publicadas en el sitio web. El uso continuado del servicio después de los cambios implica la
                        aceptación de los mismos.
                    </Section>

                    <Section id="ley-aplicable" title="10. Jurisdicción y ley aplicable">
                        Estos Términos se regirán e interpretarán conforme a las leyes del país donde Win Zone Casino tenga su sede
                        principal. Cualquier controversia será resuelta ante los tribunales competentes de dicha jurisdicción.
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

function IntroCard() {
    return (
        <section
            aria-labelledby="intro-title"
            className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 via-transparent to-transparent p-6 shadow-lg shadow-black/20"
        >
            <h2 id="intro-title" className="text-lg font-semibold text-white">
                Bienvenido a Win Zone Casino
            </h2>
            <p className="mt-2 text-slate-300">
                Al acceder o utilizar nuestro sitio web y/o aplicación móvil, usted (“el Usuario”) acepta cumplir con estos
                Términos de Servicio.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                    "Experiencia de juego segura y responsable.",
                    "Transacciones sujetas a verificación de identidad (KYC).",
                    "Una sola cuenta por usuario; credenciales personales e intransferibles.",
                    "Contenido y software protegidos por propiedad intelectual.",
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
            <p className="mt-2 leading-relaxed text-slate-300">{children}</p>
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
            <p className="mt-2 leading-relaxed text-slate-300">{children}</p>
            <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-200">
                Consejo: Si el juego deja de ser divertido, detente. Considera activar límites de depósito o la
                autoexclusión temporal desde tu cuenta.
            </div>
        </section>
    );
}
