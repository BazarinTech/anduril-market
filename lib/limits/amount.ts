/**
 * Parse a platform limit that arrived from the API.
 *
 * The comparison this feeds is `amount < limit`, and that expression is false
 * whenever `limit` is NaN -- so an absent or malformed value does not weaken
 * the check, it removes it. `Number(undefined)` is NaN, and the cashout screen
 * additionally starts at 0 before the API responds, which has the same effect
 * for anyone quick enough to submit during that window.
 *
 * Returning null for anything unusable forces the caller to decide, and the
 * callers here refuse rather than guess. The server enforces the same limits
 * independently; this exists so the user is told before a request is made,
 * not to be the only thing standing in the way.
 */
export function parseLimit(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null

  const n = Number(value)

  return Number.isFinite(n) && n >= 0 ? n : null
}
