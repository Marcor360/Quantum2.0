import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './IntroLogo.css'

type IntroLogoProps = {
  svgUrl: string
  children: ReactNode
}

const DRAW_TARGET_SELECTOR = 'path, circle, rect, line, polyline, polygon, ellipse'
const DOCK_MARGIN = 16
const DOCK_SCALE = 0.28

function splitMultiSegmentPaths(svg: SVGSVGElement) {
  const paths = Array.from(svg.querySelectorAll('path'))

  paths.forEach((path) => {
    const d = path.getAttribute('d')
    if (!d) return

    const segments = d.match(/[Mm][^Mm]*/g)
    if (!segments || segments.length <= 1) return

    const parent = path.parentNode
    if (!parent) return

    const baseId = path.getAttribute('id') || undefined

    segments.forEach((segment, index) => {
      const newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

      Array.from(path.attributes).forEach((attr) => {
        if (attr.name === 'd' || attr.name === 'id') return
        newPath.setAttribute(attr.name, attr.value)
      })

      newPath.setAttribute('d', segment.trim())

      if (baseId) {
        newPath.setAttribute('id', `${baseId}__seg${index + 1}`)
      }

      parent.insertBefore(newPath, path)
    })

    parent.removeChild(path)
  })
}

function getStrokeColor(svg: SVGSVGElement) {
  const firstPath = svg.querySelector('path')
  const computedFill = firstPath ? window.getComputedStyle(firstPath).fill : null

  if (!computedFill || computedFill === 'none') {
    return '#ff0'
  }

  return computedFill
}

export default function IntroLogo({ svgUrl, children }: IntroLogoProps) {
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null)
  const [isIntroDone, setIsIntroDone] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const baseSizeRef = useRef<{ w: number; h: number } | null>(null)
  const hasDockedRef = useRef(false)

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

    const ctx = gsap.context(() => {
      const wrapper = logoWrapperRef.current
      const overlay = overlayRef.current
      const content = contentRef.current
      const svg = wrapper?.querySelector('svg') as SVGSVGElement | null

      if (!wrapper || !overlay || !content || !svg) return

      splitMultiSegmentPaths(svg)

      const drawTargets = svg.querySelectorAll(DRAW_TARGET_SELECTOR)
      const strokeColor = getStrokeColor(svg)

      const rect = wrapper.getBoundingClientRect()
      if (!baseSizeRef.current) {
        baseSizeRef.current = { w: rect.width, h: rect.height }
      }

      gsap.set(content, { autoAlpha: prefersReducedMotion ? 1 : 0 })
      gsap.set(overlay, {
        autoAlpha: prefersReducedMotion ? 0 : 1,
        pointerEvents: prefersReducedMotion ? 'none' : 'auto',
      })
      gsap.set(wrapper, {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: 'center center',
      })

      if (prefersReducedMotion) {
        overlay.setAttribute('data-hidden', 'true')
        setIsIntroDone(true)
        return
      }

      Array.from(drawTargets).forEach((el) => {
        const geometry = el as SVGGeometryElement
        const length = typeof geometry.getTotalLength === 'function' ? geometry.getTotalLength() : 0
        const dash = length || 1

        gsap.set(el, {
          stroke: strokeColor,
          strokeWidth: 2,
          strokeDasharray: dash,
          strokeDashoffset: dash,
          strokeOpacity: 1,
          fillOpacity: 0,
        })
      })

      const timeline = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          setIsIntroDone(true)
          overlay.setAttribute('data-hidden', 'true')
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
          content,
          {
            autoAlpha: 1,
            duration: 0.8,
          },
          '-=0.2'
        )
        .to(
          overlay,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power1.in',
            onComplete: () => overlay.style.setProperty('pointer-events', 'none'),
          },
          '-=0.3'
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

  useEffect(() => {
    if (!isIntroDone || !logoWrapperRef.current) return

    const computeDockTransform = () => {
      const wrapper = logoWrapperRef.current
      const baseSize = baseSizeRef.current

      if (!wrapper || !baseSize) return null

      const rect = wrapper.getBoundingClientRect()
      const currentCX = rect.left + rect.width / 2
      const currentCY = rect.top + rect.height / 2
      const targetW = baseSize.w * DOCK_SCALE
      const targetH = baseSize.h * DOCK_SCALE
      const targetCX = DOCK_MARGIN + targetW / 2
      const targetCY = DOCK_MARGIN + targetH / 2

      return {
        x: targetCX - currentCX,
        y: targetCY - currentCY,
        scale: DOCK_SCALE,
      }
    }

    const dockLogo = (instant = false) => {
      const transform = computeDockTransform()
      if (!transform) return

      hasDockedRef.current = true

      if (prefersReducedMotion || instant) {
        gsap.set(logoWrapperRef.current, transform)
      } else {
        gsap.to(logoWrapperRef.current, {
          ...transform,
          duration: 0.8,
          ease: 'power3.inOut',
        })
      }
    }

    const handleScroll = () => {
      if (hasDockedRef.current) return
      if (window.scrollY > 0) {
        dockLogo()
        window.removeEventListener('scroll', handleScroll)
      }
    }

    const handleResize = () => {
      if (!hasDockedRef.current) return
      const transform = computeDockTransform()
      if (transform) {
        gsap.set(logoWrapperRef.current, transform)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    if (window.scrollY > 0) {
      dockLogo(true)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
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
