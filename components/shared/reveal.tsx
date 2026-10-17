"use client"

import { motion, useReducedMotion } from "motion/react"

/**
 * Reveals a section as it enters view.
 *
 * The home and landing pages tell their story by sequence rather than by
 * paragraphs, so each block arrives in turn. Honours prefers-reduced-motion:
 * with it on, everything is simply present.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
