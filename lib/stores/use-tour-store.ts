'use client'

import { create } from "zustand"
import { TOUR_STEPS } from "@/lib/tour/steps"

/**
 * Where the guided tour has got to.
 *
 * The tour walks across several routes, so progress cannot live inside one
 * page. It lives here, in the client store that survives client-side
 * navigation, and is mirrored into storage so a hard reload mid-tour resumes
 * rather than starting over.
 */
const DONE_KEY = "spatakas_tour_v1"       // localStorage: taken once, per device
const PROGRESS_KEY = "spatakas_tour_step" // sessionStorage: survives a reload

type TourState = {
  isActive: boolean
  stepIndex: number
  start: (fromIndex?: number) => void
  next: () => void
  previous: () => void
  /** Ends the tour and remembers not to offer it again unprompted. */
  finish: (reason: "completed" | "skipped") => void
  /** True when this device has never finished or skipped the tour. */
  isFirstTime: () => boolean
  resumeIfInterrupted: () => void
}

const read = (storage: Storage, key: string) => {
  try {
    return storage.getItem(key)
  } catch {
    // Private windows and blocked site data both throw here.
    return null
  }
}

const write = (storage: Storage, key: string, value: string | null) => {
  try {
    if (value === null) storage.removeItem(key)
    else storage.setItem(key, value)
  } catch {
    /* storage unavailable -- the tour still runs, it just will not be remembered */
  }
}

export const useTourStore = create<TourState>((set, get) => ({
  isActive: false,
  stepIndex: 0,

  start: (fromIndex = 0) => {
    write(sessionStorage, PROGRESS_KEY, String(fromIndex))
    set({ isActive: true, stepIndex: fromIndex })
  },

  next: () => {
    const nextIndex = get().stepIndex + 1
    if (nextIndex >= TOUR_STEPS.length) {
      get().finish("completed")
      return
    }
    write(sessionStorage, PROGRESS_KEY, String(nextIndex))
    set({ stepIndex: nextIndex })
  },

  previous: () => {
    const prevIndex = Math.max(0, get().stepIndex - 1)
    write(sessionStorage, PROGRESS_KEY, String(prevIndex))
    set({ stepIndex: prevIndex })
  },

  finish: (reason) => {
    write(localStorage, DONE_KEY, reason)
    write(sessionStorage, PROGRESS_KEY, null)
    set({ isActive: false, stepIndex: 0 })
  },

  isFirstTime: () => read(localStorage, DONE_KEY) === null,

  resumeIfInterrupted: () => {
    const saved = read(sessionStorage, PROGRESS_KEY)
    if (saved === null) return
    const index = Number(saved)
    if (Number.isInteger(index) && index >= 0 && index < TOUR_STEPS.length) {
      set({ isActive: true, stepIndex: index })
    }
  },
}))
