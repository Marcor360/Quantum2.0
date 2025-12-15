import { useRef, type RefObject, type DependencyList } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

type UseGsapTimelineOptions = {
  scope?: RefObject<HTMLElement | null>
  dependencies?: DependencyList
  defaults?: gsap.TweenVars
  timeline?: gsap.TimelineVars
  onReady: (timeline: gsap.core.Timeline, instance: typeof gsap) => void
}

/** Registers a gsap timeline that is automatically cleaned up with React lifecycles. */
export function useGsapTimeline({
  scope,
  dependencies,
  defaults,
  timeline,
  onReady,
}: UseGsapTimelineOptions) {
  const localRef = useRef<HTMLElement | null>(null)
  const targetRef = scope ?? localRef

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults, ...timeline })
      onReady?.(tl, gsap)
      return () => tl.kill()
    },
    {
      scope: targetRef,
      dependencies: dependencies ? [...dependencies] : undefined,
    }
  )

  return targetRef
}

type UseSequentialFadeOptions = {
  scope?: RefObject<HTMLElement | null>
  selectors: string | string[]
  delay?: number
  stagger?: number
  dependencies?: DependencyList
}

/** Convenience hook to fade & slide a list of elements sequentially. */
export function useSequentialFade({
  scope,
  selectors,
  delay = 0,
  stagger = 0.15,
  dependencies,
}: UseSequentialFadeOptions) {
  return useGsapTimeline({
    scope,
    dependencies,
    defaults: { ease: 'power2.out', duration: 0.8 },
    onReady: (tl) => {
      const items = Array.isArray(selectors) ? selectors : [selectors]
      items.forEach((selector, index) => {
        tl.from(
          selector,
          { autoAlpha: 0, y: 24 },
          index === 0 ? delay : `>-=${stagger}`
        )
      })
    },
  })
}

export { gsap, useGSAP }
