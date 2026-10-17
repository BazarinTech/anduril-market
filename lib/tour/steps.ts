/**
 * Kimani's script.
 *
 * Short beats, one idea each: a tutorial that arrives in small pieces is
 * easier to absorb than one that explains the whole farm at once.
 *
 * Each step names the route it belongs to and, optionally, the element it
 * points at. A step whose element never appears is skipped rather than
 * stalling the tour -- /cashout, for instance, shows a different screen
 * entirely until a withdrawal account exists.
 *
 * `element` values are data-tour attributes, not classes: styling can change
 * freely without silently breaking the tour.
 */
export type TourStep = {
  id: string
  route: string
  /** CSS selector for the element to spotlight. Omitted = centred message. */
  element?: string
  /** Shown above the dialogue, in Kimani's voice. */
  title: string
  dialogue: string
  side?: "top" | "bottom" | "left" | "right"
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "intro",
    route: "/home",
    title: "Karibu",
    dialogue:
      "Eh, a new face at the gate. I am Kimani — I have worked this land a long time. No need to learn it all today. Come, I will walk you round the farm.",
  },
  {
    id: "intro-2",
    route: "/home",
    title: "A farm needs three things",
    dialogue:
      "Something growing. Hands to help you. And a place to keep what you earn. We will take them one at a time.",
  },
  {
    id: "home-banner",
    route: "/home",
    element: '[data-tour="home-banner"]',
    title: "Your farm",
    dialogue: "Your herd, waiting. This is the view from the gate — the money itself is kept in the purse.",
    side: "bottom",
  },
  {
    id: "quick-actions",
    route: "/home",
    element: '[data-tour="quick-actions"]',
    title: "Your tools",
    dialogue: "Every gate in one row. You will wear these smooth.",
    side: "bottom",
  },
  {
    id: "deposit",
    route: "/recharge",
    element: '[data-tour="deposit"]',
    title: "Seed money",
    dialogue:
      "Nothing grows from empty soil. Choose an amount, confirm the M-Pesa prompt on your phone. Nothing moves until you enter your own PIN.",
    side: "top",
  },
  {
    id: "products",
    route: "/products",
    element: '[data-tour="product-card"]',
    title: "Choose your stock",
    dialogue:
      "Each one shows its price, its season and what it brings in daily — all three before you decide. Read them, and take one when you are ready. No hurry.",
    side: "bottom",
  },
  {
    id: "claim",
    route: "/work",
    element: '[data-tour="income"]',
    title: "Harvest",
    dialogue:
      "This is where your stock pays you. What is still growing sits under Valid — come each day and collect. Finished seasons move to Expired.",
    side: "bottom",
  },
  {
    id: "withdraw",
    route: "/cashout",
    element: '[data-tour="withdraw"]',
    title: "Take it to market",
    dialogue:
      "Set your withdrawal account once, then send your earnings to that M-Pesa number whenever you wish. Your PIN guards this gate — give it to nobody. Not even me.",
    side: "bottom",
  },
  {
    id: "invite",
    route: "/team",
    element: '[data-tour="invite"]',
    title: "Your co-op",
    dialogue:
      "Your code sits above. Share it — everyone who joins through it farms alongside you.",
    side: "bottom",
  },
  {
    id: "levels",
    route: "/team",
    element: '[data-tour="levels"]',
    title: "Three rows deep",
    dialogue:
      "Those you bring, those they bring, and those after. Counted here, row by row.",
    side: "top",
  },
  {
    id: "profile",
    route: "/mine",
    element: '[data-tour="profile-menu"]',
    title: "The homestead",
    dialogue:
      "Withdrawal account, records, PIN. Set the account before your first cash-out.",
    side: "bottom",
  },
  {
    id: "whatsapp",
    route: "/mine",
    element: '[data-tour="whatsapp"]',
    title: "The other farmers",
    dialogue: "We gather here. Word of every new season reaches this group first.",
    side: "top",
  },
  {
    id: "outro",
    route: "/mine",
    title: "The land is yours",
    dialogue:
      "That is the whole farm. Go choose your first stock — I will walk you to the market. Call me back any time from Replay guide, in your homestead.",
  },
]
