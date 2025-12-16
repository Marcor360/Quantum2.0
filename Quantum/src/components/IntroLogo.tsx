import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './IntroLogo.css'

type IntroLogoProps = {
  svgUrl: string
  children: ReactNode
}

export default function IntroLogo({ svgUrl, children }: IntroLogoProps) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null)
  const [isIntroDone, setIsIntroDone] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(svgUrl, { cache: 'no-store', signal: controller.signal })
      .then((response) => response.text())
      .then((markup) => setSvgMarkup(markup))
      .catch(() => {
        if (!controller.signal.aborted) {
          setSvgMarkup(null)
          setIsIntroDone(true)
        }
      })

    return () => controller.abort()
  }, [svgUrl])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(media.matches)

    handleChange()
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const originalOverflow = document.body.style.overflow

    if (!prefersReducedMotion && !isIntroDone) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow
    }

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [prefersReducedMotion, isIntroDone])

  useLayoutEffect(() => {
    if (!svgMarkup || !logoWrapperRef.current || !overlayRef.current || !contentRef.current) {
      return
    }

    const svg = logoWrapperRef.current.querySelector('svg')
    if (!svg) return

    const drawTargets = svg.querySelectorAll(
      'path, circle, rect, line, polyline, polygon, ellipse'
    )
    const margin = 16
    const targetScale = 0.28

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { autoAlpha: prefersReducedMotion ? 1 : 0 })
      gsap.set(overlayRef.current, { autoAlpha: 1, pointerEvents: 'auto' })
      gsap.set(logoWrapperRef.current, {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: 'center center',
      })

      const rect = logoWrapperRef.current!.getBoundingClientRect()
      const targetX = window.innerWidth - margin - rect.width * targetScale
      const targetY = margin
      const deltaX = targetX - rect.left
      const deltaY = targetY - rect.top

      if (prefersReducedMotion) {
        gsap.set(logoWrapperRef.current, {
          x: deltaX,
          y: deltaY,
          scale: targetScale,
        })
        gsap.set(overlayRef.current, { autoAlpha: 0, pointerEvents: 'none' })
        setIsIntroDone(true)
        return
      }

      Array.from(drawTargets).forEach((el) => {
        const geometry = el as SVGGeometryElement
        const length = geometry.getTotalLength ? geometry.getTotalLength() : 0
        gsap.set(el, {
          strokeDasharray: length || 0,
          strokeDashoffset: length || 0,
          strokeOpacity: 1,
          fillOpacity: 0,
        })
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          setIsIntroDone(true)
          overlayRef.current?.setAttribute('data-hidden', 'true')
        },
      })

      timeline
        .to(drawTargets, {
          strokeDashoffset: 0,
          duration: 1.6,
          stagger: 0.08,
          ease: 'power2.out',
        })
        .to(
          drawTargets,
          {
            fillOpacity: 1,
            strokeOpacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .to(
          contentRef.current,
          {
            autoAlpha: 1,
            duration: 0.8,
          },
          '-=0.2'
        )
        .to(
          logoWrapperRef.current,
          {
            x: deltaX,
            y: deltaY,
            scale: targetScale,
            duration: 0.9,
            ease: 'power3.inOut',
          },
          '-=0.4'
        )
        .to(
          overlayRef.current,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power1.in',
            onComplete: () => overlayRef.current?.style.setProperty('pointer-events', 'none'),
          },
          '-=0.5'
        )

      return () => timeline.kill()
    }, rootRef)

    return () => ctx.revert()
  }, [svgMarkup, prefersReducedMotion])

  useEffect(() => {
    if (!isIntroDone && !prefersReducedMotion) return
    if (contentRef.current) {
      gsap.set(contentRef.current, { autoAlpha: 1 })
    }
    if (overlayRef.current && isIntroDone) {
      overlayRef.current.style.pointerEvents = 'none'
      gsap.set(overlayRef.current, { autoAlpha: 0 })
    }
  }, [isIntroDone, prefersReducedMotion])

  return (
    <div className="intro-root" ref={rootRef}>
      <div
        className="intro-overlay"
        ref={overlayRef}
        aria-hidden={isIntroDone}
        role="presentation"
      />

      <div className="intro-logo-wrapper" ref={logoWrapperRef} aria-hidden="true">
        <div
          className="intro-logo-mark"
          dangerouslySetInnerHTML={svgMarkup ? { __html: svgMarkup } : undefined}
        />
      </div>

      <div className="intro-content" ref={contentRef}>
        {children}
      </div>
    </div>
  )
}
