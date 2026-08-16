# Anduril

A mobile-first web app where users buy "farm products" that pay out daily returns, top up and cash out via M-Pesa, and earn commission from a three-level referral network.

This repository is the **frontend only**. All business logic — balances, returns, payouts, referral commission — lives in a separate PHP backend that this app talks to over HTTP. Nothing in this codebase decides how much money anyone gets.

---

## What the app actually does

A signed-in user lands on `/home` and can:

- **Buy a product** (`/products`) — each product has a fixed price, a duration in days, and a daily return rate. Buying one creates an *investment order*.
- **Collect daily returns** (`/work`) — orders are split into Valid and Expired tabs. Collecting a day's earnings on an active order is called a *roll*, handled by the promotion dialog on the order card.
- **Recharge** (`/recharge`) — an M-Pesa STK push. The app initiates the deposit, gets a `trackingID` back, and polls `stk-status.php` until the user confirms on their handset.
- **Cash out** (`/cashout`) — a withdrawal to the M-Pesa number saved in the cashout wallet, gated by a 4-digit PIN and subject to a minimum amount and a percentage fee that the backend supplies.
- **Set up a cashout wallet** (`/cashout-wallet`) — the M-Pesa phone number, account name, and withdrawal PIN. Create, update details, or change the PIN.
- **Grow a team** (`/team`) — each user gets a six-character invite code and a share link. Downlines are tracked across three levels, each with its own table of deposits and commission.
- **Claim bonuses and redeem coupons** (`/bonus`).
- **Apply for influencer incentives** (`/incentive`) — referral-count tiers that pay a salary. Applying submits a name, phone, and ID number for manual review.
- **Review history** (`/records`) — every deposit, withdrawal, transfer, and return, with a status badge.
- **Manage the account** (`/mine`, `/reset-password`) — profile, level, links to the Telegram and WhatsApp groups, the Android APK, and password reset.

`/` is a public marketing landing page. `/company` is the About page, reachable from inside the app.

Currency is hard-coded to **KES** and formatted with `Intl.NumberFormat("en-KE")` in [use-currency.ts](lib/hooks/use-currency.ts). Phone validation accepts `0XXXXXXXXX` and `254XXXXXXXXX` only. This is a Kenya-only product today.

---

## Stack

| | |
|---|---|
| Framework | Next.js 16.1.1, App Router |
| React | 19.2.3 |
| Styling | Tailwind CSS v4 (CSS-variable theme in [globals.css](app/globals.css)) |
| Components | shadcn (`radix-nova` style) over Radix and Base UI |
| Icons | Hugeicons, with Lucide as the shadcn default |
| State | Zustand — one store, [use-main-store.ts](lib/stores/use-main-store.ts) |
| Toasts | Sonner |
| Auth | `jsonwebtoken` server-side, `jwt-decode` + `js-cookie` client-side |
| Package manager | pnpm |

---

## Getting started

```bash
pnpm install
# create .env with the values below
pnpm dev
```

Open <http://localhost:3000>.

Both `dev` and `start` set `NODE_OPTIONS=--dns-result-order=ipv4first`. Without it, Node resolves the backend host to IPv6 first and requests hang on some networks — don't drop the flag when running these scripts by hand.

### Environment variables

`.env` is gitignored. Create it locally with:

```bash
BACKEND_URL=https://<host>/backend/mains             # server-side, used by /api/auth
NEXT_PUBLIC_BACKEND_URL=https://<host>/backend/mains # browser-side, used by every other call
JWT_SECRET=<a long random string>                    # signs the session token
NEXT_PUBLIC_CUSTOMER_SUPPORT=https://wa.me/<number>?text=...   # support chat link
NEXT_PUBLIC_WHATSAPP_GROUP=https://chat.whatsapp.com/<invite>  # community group link
NEXT_PUBLIC_TELEGRAM_CHANNEL=https://t.me/<channel>            # announcements channel
```

`BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` point at the same place. The split exists because auth is proxied through a route handler while everything else is called straight from the browser.

The three link variables **must** keep their `NEXT_PUBLIC_` prefix — they are read from client components, and Next only exposes prefixed variables to the browser. They are also inlined at build time, so editing `.env` will not update a running dev server; restart it. Since `.env` is gitignored, all three must be set in the hosting environment too, or production ships a hidden support button and dead community links.

`next.config.ts` whitelists `sanderson.xgramm.com/admin/uploads/**` for `next/image`. Point it at your own host if you change backends, or product images will fail to load.

---

## Architecture

### Layout groups

```
app/
  page.tsx          public landing page
  (auth)/           login, register, forgot-password, and the API route handlers
  (app)/            every authenticated screen; ClientLoginInitializer runs here
```

### The backend contract

The PHP API is a flat list of endpoints, one file per operation. Every call is a `POST` with a JSON body, and every response is `{ status, message, ... }` where `status === "Success"` means it worked. HTTP is always 200 — **failures are reported in the body, not the status code**, so never branch on `response.ok` alone.

[lib/backend/actions.ts](lib/backend/actions.ts) is the complete list of endpoints:

| Endpoint | Function |
|---|---|
| `mains.php` | `getMains` — the whole user state in one payload |
| `invest.php` | `makeInvestment` |
| `returns.php` | `claimEarnings` |
| `account.php` | `updateAccount`, `updatePassword` |
| `deposit.php` / `stk-status.php` | `initiateDeposit`, `checkStkStatus` |
| `withdraw.php` / `withdraw-account.php` | `initiateWithdrawal`, `cashoutWalletSetup` |
| `transfer.php` | `initiateTransfer` |
| `verification.php` | `requestVerificationCode`, `verifyCode` |
| `forgot-password.php` | `resetPassword` |
| `incentive-application.php` | `applyIncentives` |
| `coupon.php` | `couponRedeem` |
| `bonus.php` | `claimBonus` |
| `auth.php` | called only by [/api/auth](<app/(auth)/api/auth/route.ts>) |

### One fetch, one store

There is no per-screen data fetching. `getMains` returns a single `Mains` object holding the user, wallet, referral tree, products, orders, bonuses, transactions, incentives, and the platform `controls` (minimum withdrawal, fee percentages). The Zustand store caches it and every page reads slices of it.

After any mutation, the pattern is: call the action, check `status === "Success"`, then call `fetchMainDetails(token)` to re-pull the whole payload. There is no optimistic updating and no cache invalidation beyond that refetch.

`ClientLoginInitializer` in the `(app)` layout calls `loginState()` on mount, which reads the cookie and triggers the initial fetch. Several pages call `loginState()` again in their own `useEffect` — redundant, and commented out in a few places.

### Auth flow

1. The login or register form posts to `/api/auth`.
2. That route handler forwards to `auth.php`. If the backend returns `Success` with a `userID`, the handler signs `{ userID }` with `JWT_SECRET` and sets it as the cookie `susyr7q3ycugfWDFF` (7-day max-age).
3. [middleware.ts](middleware.ts) guards every authenticated route: no cookie, or a token that fails to decode, redirects to `/login`. Visiting `/login` or `/register` while holding a valid token bounces to `/home`.
4. `/api/logout` expires the cookie; the store also clears it client-side.

**The one thing that will confuse you:** every backend action takes a field called `userID`, but the value passed is the **entire JWT string**, not the numeric ID. `useMainStore.token` holds the raw cookie value and that is what gets sent. The PHP side decodes it. So `getMains({ userID: token })` is correct, not a bug — but the parameter name lies about what it holds.

### Invite codes

[use-invite-code.ts](lib/hooks/use-invite-code.ts) encodes a numeric user ID as a six-character Base62 string, and decodes it back on the register page from `?inviteCode=`. It is obfuscation, not security — anyone can decode a code offline. A malformed code decodes to the literal fallback `531`, which silently assigns that user as the upline.

### Types

Every domain type is a **global ambient type** in [types.d.ts](types.d.ts) — `User`, `Wallet`, `Product`, `Mains`, and so on. They are not exported and not imported anywhere; they are simply in scope everywhere. Add new shared types there rather than creating an exported module, so the existing code stays consistent.

---

## Conventions

- Almost every page is `'use client'`. The only server code is the two route handlers and the middleware.
- Screens follow the same skeleton: `<Topbar title>`, content, `<BottomNav />`, with `mb-20` on the content so the fixed nav doesn't cover it.
- Loading states are hand-written skeleton components co-located at the top of the page file, gated on `isMainFetching && !mainDetails`.
- Money is always rendered through `useCurrency(...)`. Despite the name it is a plain function, not a React hook.
- The theme is a green primary defined as OKLCH variables in `globals.css`. Use the semantic Tailwind classes (`bg-primary`, `text-muted-foreground`) rather than raw colours; a few older files still hard-code `bg-white`.
- Import via the `@/*` alias, which maps to the repo root.

---

## Known issues

Things you will hit, in rough order of how much they matter:

1. **The session cookie is readable by JavaScript.** It is set with `httpOnly: false` so `js-cookie` can read it in the store. Any XSS on the page hands over a working session.
2. **The token is decoded, never verified.** Middleware calls `jwtDecode`, which only base64-decodes the payload. A forged token with any `userID` passes the middleware check — the backend is the only thing actually validating. The signed token also carries no `exp`, so it stays valid until the cookie's 7-day max-age runs out; nothing can revoke it earlier.
3. **`useCurrency` is called inside `.map()` callbacks and conditionals.** It isn't really a hook so it works, but the `use` prefix trips the rules-of-hooks lint rule and misleads readers. Renaming it to `formatCurrency` would settle it.
4. **The withdrawal PIN is present in the `Wallet` payload** as `wallet.withdrawal_pin`, meaning it reaches the client. The commented-out client-side PIN comparison in [cashout/page.tsx](<app/(app)/cashout/page.tsx#L121>) was removed in favour of backend verification, which is the right call — but the field is still being shipped to the browser and should be dropped from the API response.
5. **Leftover scaffolding.** `components/example.tsx` and `components/component-example.tsx` are unused. [app/(app)/layout.tsx](<app/(app)/layout.tsx>) renders a `<head>` block preloading a video from `grover.xgramm.com` — a different project's domain — and `initiateTransfer` is defined but never called from any screen.
6. **One external link is still hard-coded.** The APK download in the profile menu has not been moved into an environment variable the way the support, group, and Telegram links were.

---

## Scripts

```bash
pnpm dev     # dev server on :3000
pnpm build   # production build
pnpm start   # serve the production build
pnpm lint    # eslint
```

There are no tests.
