"use client"

import { useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { driver, type Driver } from "driver.js"
import "driver.js/dist/driver.css"
import { TOUR_STEPS } from "@/lib/tour/steps"
import { useTourStore } from "@/lib/stores/use-tour-store"

/** Where the tour drops you once Spartacus is done talking. */
const TOUR_EXIT_ROUTE = "/products"

/** Resolves once the element exists, or null if it never turns up. */
function waitForElement(selector: string, timeoutMs = 4000): Promise<HTMLElement | null> {
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLElement>(selector)
    if (existing) return resolve(existing)

    const observer = new MutationObserver(() => {
      const el = document.querySelector<HTMLElement>(selector)
      if (el) {
        observer.disconnect()
        clearTimeout(timer)
        resolve(el)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })

    const timer = setTimeout(() => {
      observer.disconnect()
      resolve(null)
    }, timeoutMs)
  })
}

/** Step dots, like a game tutorial: every step a pip, the current one a bar. */
function progressDots(current: number, total: number) {
  const pips = Array.from({ length: total }, (_, i) =>
    `<i class="${i === current ? "is-current" : i < current ? "is-done" : ""}"></i>`,
  ).join("")
  return `<div class="spartacus-dots">${pips}<span>${current + 1}</span></div>`
}

/**
 * Spartacus's guided tour.
 *
 * driver.js is single-page, so this drives it one step at a time: for each
 * step it navigates to the step's route if needed, waits for the target to
 * mount (pages fetch before they render), then highlights it. Progress lives
 * in the store, which is what lets the tour cross routes at all.
 *
 * A step whose element never appears is skipped automatically -- /cashout
 * shows a different screen until a withdrawal account exists, and a tour that
 * stalls on a missing target would trap the user behind an overlay.
 */
export function SpartacusGuide() {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = useTourStore((s) => s.isActive)
  const stepIndex = useTourStore((s) => s.stepIndex)
  const driverRef = useRef<Driver | null>(null)

  // Resume a tour interrupted by a hard reload.
  useEffect(() => {
    useTourStore.getState().resumeIfInterrupted()
  }, [])

  useEffect(() => {
    const destroy = () => {
      driverRef.current?.destroy()
      driverRef.current = null
    }

    if (!isActive) {
      destroy()
      return
    }

    const step = TOUR_STEPS[stepIndex]
    if (!step) return

    // Different page: navigate and let the effect re-run once pathname changes.
    if (pathname !== step.route) {
      destroy()
      router.push(step.route)
      return
    }

    let cancelled = false

    const show = (element: HTMLElement | null) => {
      if (cancelled) return
      const { next, previous, finish } = useTourStore.getState()
      const isLast = stepIndex === TOUR_STEPS.length - 1

      destroy()
      const instance = driver({
        allowClose: true,
        overlayColor: "#151110",
        overlayOpacity: 0.74,
        stagePadding: 6,
        stageRadius: 18,
        popoverClass: "spartacus-popover",
        smoothScroll: true,
        onDestroyStarted: () => finish("skipped"),
      })
      driverRef.current = instance

      instance.highlight({
        element: element ?? undefined,
        popover: {
          // With no element driver.js anchors to a zero-size point at the
          // centre of the screen and still lays the card out *below* it, which
          // put these cards off the bottom edge. They get a class that pins
          // them to the middle instead; anchored steps keep normal placement.
          popoverClass: step.element ? "spartacus-popover" : "spartacus-popover spartacus-centred",
          ...(element ? { side: step.side ?? ("bottom" as const), align: "center" as const } : {}),
          title: step.title,
          description:
            `<p class="spartacus-dialogue">${step.dialogue}</p>` +
            progressDots(stepIndex, TOUR_STEPS.length),
          showButtons: stepIndex === 0 ? ["next", "close"] : ["previous", "next", "close"],
          nextBtnText: isLast ? "Enter the arena" : "Next",
          prevBtnText: "Back",
          doneBtnText: "Enter the arena",
          onNextClick: () => {
            if (!isLast) return next()
            // Last word: close the tour and set them down in the armoury.
            finish("completed")
            router.push(TOUR_EXIT_ROUTE)
          },
          onPrevClick: () => previous(),
          onCloseClick: () => finish("skipped"),
        },
      })
    }

    if (!step.element) {
      show(null)
    } else {
      waitForElement(step.element).then((el) => {
        if (cancelled) return
        // Missing target: move on rather than trapping the user behind the overlay.
        if (!el) useTourStore.getState().next()
        else show(el)
      })
    }

    return () => {
      cancelled = true
    }
  }, [isActive, stepIndex, pathname, router])

  // Tear the overlay down if the component itself unmounts (e.g. logout).
  useEffect(() => () => driverRef.current?.destroy(), [])

  return null
}
