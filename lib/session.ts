/**
 * Session cookie contract.
 *
 * One definition, imported by the auth route, the logout route, the
 * middleware and the client store, so the name can never drift between them.
 *
 * The cookie used to be named "susyr7q3ycugfWDFF" -- which was the literal
 * value of JWT_SECRET on the PHP side. That published the HS256 signing key to
 * every visitor as a cookie name, readable in DevTools, which meant anyone
 * could mint a token for any user. Both the name and the secret were rotated
 * in Phase 2.0; the secret now lives only in .env and config/env.php.
 */
export const SESSION_COOKIE = "anduril_session"

/**
 * Token and cookie lifetime, in seconds.
 *
 * Used for both the JWT `exp` claim and the cookie `maxAge` so the credential
 * and its container expire together -- otherwise a token outlives the cookie
 * and stays valid for anyone who captured it.
 */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

/** Shape of the payload we sign. */
export type SessionClaims = {
  userID: string | number
  exp?: number
  iat?: number
}

/**
 * True when a decoded token has passed its expiry.
 *
 * A token with no `exp` at all is treated as expired: tokens issued before
 * Phase 2.0 had no expiry claim, and they were signed with the leaked secret,
 * so they must not be honoured.
 */
export function isExpired(claims: SessionClaims | null | undefined): boolean {
  if (!claims || typeof claims.exp !== "number") return true
  return claims.exp * 1000 <= Date.now()
}
