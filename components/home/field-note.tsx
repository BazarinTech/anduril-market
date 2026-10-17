"use client"

import { useEffect, useState } from "react"

// One quiet line at a time. Each says something true about how the farm works
// -- no counts, no claims, nothing the app cannot stand behind.
const notes = [
  "Plots pay out once a day. Collect yours under Harvest.",
  "Your PIN stays yours. Cloud Farmer will never ask for it.",
  "Bring a neighbour in and you earn from three rings of their harvest.",
  "Withdrawals go straight to the M-Pesa number on your account.",
]

/**
 * The field note.
 *
 * Was a boxed notification with a bell. A card that size read like something
 * had gone wrong; it is now a single line under the picture, marked by a
 * living dot, which is all a passing word from the yard needs.
 */
export function FieldNote() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % notes.length), 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-start gap-3 px-1">
      <span className="relative mt-1.5 flex size-2 shrink-0">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-leaf opacity-70" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <p key={index} className="animate-in text-sm leading-snug text-balance text-muted-foreground fade-in duration-700">
        {notes[index]}
      </p>
    </div>
  )
}
