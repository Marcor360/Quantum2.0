import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type CSSProperties, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

type ServiceCard = {
    id: string
    label: string
    title: string
    description: string
    href: string
    accent: string
    overlay: string
    desktopImage: string
    mobileImage?: string
    minHeight?: string
}

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SERVICE_CARDS: ServiceCard[] = [
    {
        id: 'branding',
        label: 'BRANDING',
        title: 'Branding',
        description:
            'Creamos ADN estratégico para tu marca, elevamos reconocimiento y fidelizamos audiencias.',
        href: '/servicios/branding',
        accent: '#d7ff00',
        overlay: 'linear-gradient(135deg, rgba(3, 3, 3, 0.72), rgba(8, 8, 8, 0.82))',
        desktopImage: '/img/branding.webp',
        mobileImage: '/img/branding-mobile.webp',
        minHeight: '36rem',
    },
    {
        id: 'ecommerce',
        label: 'E - COMMERCE',
        title: 'E-commerce',
        description:
            'Operamos canales digitales para crecer ticket, tráfico y recompra con procesos precisos.',
        href: '/servicios/e-commerce',
        accent: '#ff4d4d',
        overlay: 'linear-gradient(180deg, rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.78))',
        desktopImage: '/img/e-commerce.webp',
        mobileImage: '/img/e-commerce-mobile.webp',
        minHeight: '36rem',
    },
    {
        id: 'apps',
        label: 'APPS & I.A',
        title: 'Apps & I.A',
        description:
            'Diseñamos experiencias móviles y flujos con I.A. aplicada para crear hábitos y eficiencia.',
        href: '/servicios/apps-ia',
        accent: '#5b3ae6',
        overlay: 'linear-gradient(160deg, rgba(8, 6, 20, 0.35), rgba(8, 6, 20, 0.75))',
        desktopImage: '/img/appsIA.webp',
        mobileImage: '/img/appsIA-mobile.webp',
        minHeight: '32rem',
    },
    {
        id: 'campanas',
        label: 'CAMPAÑAS',
        title: 'Campañas',
        description:
            'Creatividad accionable: campañas full-funnel con narrativa, performance y optimización continua.',
        href: '/servicios/campanas',
        accent: '#b687ff',
        overlay: 'linear-gradient(200deg, rgba(13, 7, 24, 0.52), rgba(8, 6, 12, 0.86))',
        desktopImage: '/img/campañas.webp',
        mobileImage: '/img/campañas-mobiles.webp',
        minHeight: '32rem',
    },
]

const ROTATING_WORDS = ['estrategia,', 'precisión,', 'resultados.'] as const

export default function Home() {
    const scope = useRef<HTMLElement | null>(null)
    const rotatorWrapRef = useRef<HTMLSpanElement | null>(null)
    const rotatorWordRef = useRef<HTMLSpanElement | null>(null)

    useLayoutEffect(() => {
        const wrap = rotatorWrapRef.current
        const wordEl = rotatorWordRef.current
        if (!wrap || !wordEl) return

        const computed = getComputedStyle(wordEl)
        const measureSpan = document.createElement('span')
        measureSpan.style.position = 'absolute'
        measureSpan.style.visibility = 'hidden'
        measureSpan.style.whiteSpace = 'nowrap'
        measureSpan.style.fontFamily = computed.fontFamily
        measureSpan.style.fontSize = computed.fontSize
        measureSpan.style.fontWeight = computed.fontWeight
        measureSpan.style.letterSpacing = computed.letterSpacing

        document.body.appendChild(measureSpan)
        let maxWidth = 0
        ROTATING_WORDS.forEach((word) => {
            measureSpan.textContent = word
            maxWidth = Math.max(maxWidth, measureSpan.getBoundingClientRect().width)
        })
        measureSpan.remove()

        if (maxWidth > 0) {
            wrap.style.setProperty('--rotator-width', `${Math.ceil(maxWidth)}px`)
        }
    }, [])

    useGSAP(
        () => {
            const prefersReducedMotion = window.matchMedia(
                '(prefers-reduced-motion: reduce)'
            ).matches

            if (prefersReducedMotion) {
                gsap.set('[data-animate]', { opacity: 1, y: 0 })
                gsap.set('[data-animate-card]', { opacity: 1, y: 0 })
                if (rotatorWordRef.current) {
                    rotatorWordRef.current.textContent = ROTATING_WORDS[0]
                    gsap.set(rotatorWordRef.current, { rotationY: 0, opacity: 1 })
                }
                return
            }

            gsap.fromTo(
                '[data-animate]',
                { opacity: 0, y: 18 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.12,
                    delay: 0.1,
                }
            )

            const isMobile = window.matchMedia('(max-width: 1024px)').matches
            if (isMobile) {
                gsap.set('[data-animate-card]', { opacity: 1, y: 0 })
            } else {
                gsap.from('[data-animate-card]', {
                    opacity: 0,
                    y: 22,
                    duration: 1,
                    ease: 'power2.out',
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: '.quantum-services',
                        start: 'top 78%',
                    },
                })
            }

            const wordEl = rotatorWordRef.current
            if (!wordEl) return

            let index = 0
            wordEl.textContent = ROTATING_WORDS[index]
            gsap.set(wordEl, {
                transformOrigin: '50% 50%',
                transformPerspective: 800,
                rotationY: 0,
                opacity: 1,
            })

            const swapWord = () => {
                index = (index + 1) % ROTATING_WORDS.length
                wordEl.textContent = ROTATING_WORDS[index]
            }

            // Keep the word always visible while still rotating it.
            gsap
                .timeline({ repeat: -1, repeatDelay: 3 })
                .to(
                    wordEl,
                    {
                        rotationY: 55,
                        duration: 0.6,
                        ease: 'power2.inOut',
                        onComplete: swapWord,
                    },
                    '+=3.8'
                )
                .to(wordEl, { rotationY: 0, duration: 0.6, ease: 'power2.out' })
        },
        { scope }
    )

    return (
        <main className="home-hero" ref={scope}>
            <Header />

            <section className="quantum-video" aria-label="Video principal">
                <div className="quantum-video__frame">
                    <picture className="quantum-video__media">
                        <source
                            media="(max-width: 768px)"
                            srcSet="/video/banermobile.webp"
                        />
                        <img
                            className="quantum-video__image"
                            src="/video/Banner%20Home%20quantum.webp"
                            alt="Banner Quantum"
                            decoding="async"
                        />
                    </picture>
                </div>
            </section>

            <section className="quantum-hero" aria-labelledby="quantum-title">
                <div className="quantum-hero__identifier" data-animate>
                    <img
                        className="quantum-hero__logo"
                        src="/svg/Logo-text.svg"
                        alt="Quantum"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                <div className="quantum-hero__statement">
                    <h1
                        className="quantum-hero__headline"
                        id="quantum-title"
                        data-animate
                        aria-live="off"
                    >
                        <span className="quantum-hero__prefix">es</span>
                        <span className="quantum-hero__rotator-wrap" ref={rotatorWrapRef}>
                            <span className="quantum-hero__rotator-word" ref={rotatorWordRef}>
                                {ROTATING_WORDS[0]}
                            </span>
                        </span>
                    </h1>
                </div>
            </section>

            <section
                className="quantum-services"
                id="servicios"
                aria-label="Servicios principales"
            >
                <div className="quantum-grid">
                    {SERVICE_CARDS.map((card) => (
                        <Link
                            key={card.id}
                            className={`quantum-card quantum-card--${card.id}`}
                            to={card.href}
                            aria-label={`Ir a ${card.title}`}
                            data-animate-card
                            style={
                                {
                                    '--card-accent': card.accent,
                                    '--card-overlay': card.overlay,
                                    '--card-image-desktop': `url(${card.desktopImage})`,
                                    '--card-image-mobile': card.mobileImage
                                        ? `url(${card.mobileImage})`
                                        : undefined,
                                    '--card-min-height': card.minHeight,
                                } as CSSProperties
                            }
                        >
                            <span className="quantum-card__bg" aria-hidden="true" />
                            <span className="quantum-card__overlay" aria-hidden="true" />

                            <span className="quantum-card__badge">
                                {card.label}
                                <span className="quantum-card__arrow" aria-hidden="true">
                                    →
                                </span>
                            </span>

                            <div className="quantum-card__content">
                                <h3 className="quantum-card__title">{card.title}</h3>
                                <p className="quantum-card__desc">{card.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    )
}
