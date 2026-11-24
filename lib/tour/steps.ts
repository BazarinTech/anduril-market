/**
 * Melo's script.
 *
 * Short beats, one idea each: a tutorial that arrives in small pieces is
 * easier to absorb than one that explains the whole platform at once.
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
  /** Shown above the dialogue, in Melo's voice. */
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
      "Hey, a new face in the crowd. I am Melo — I have been behind these decks a long time. No need to learn it all today. Come, I will show you round.",
  },
  {
    id: "intro-2",
    route: "/home",
    title: "Three things to know",
    dialogue:
      "Tracks that earn for you. A crew to grow with. And a wallet to keep what you earn. We will take them one at a time.",
  },
  {
    id: "home-banner",
    route: "/home",
    element: '[data-tour="home-banner"]',
    title: "Your stage",
    dialogue: "This is home — the view from the stage. The money itself is kept in your wallet.",
    side: "bottom",
  },
  {
    id: "quick-actions",
    route: "/home",
    element: '[data-tour="quick-actions"]',
    title: "Your controls",
    dialogue: "Everything you need, in one row. You will know these by heart soon.",
    side: "bottom",
  },
  {
    id: "deposit",
    route: "/recharge",
    element: '[data-tour="deposit"]',
    title: "Top up",
    dialogue:
      "Every rental starts with a balance. Choose an amount, confirm the M-Pesa prompt on your phone. Nothing moves until you enter your own PIN.",
    side: "top",
  },
  {
    id: "products",
    route: "/products",
    element: '[data-tour="product-card"]',
    title: "Pick a track",
    dialogue:
      "Each one shows its rental price, its term and what it earns daily — all three before you decide. Read them, and rent one when you are ready. No hurry.",
    side: "bottom",
  },
  {
    id: "claim",
    route: "/work",
    element: '[data-tour="income"]',
    title: "Collect earnings",
    dialogue:
      "This is where your tracks pay you. Rentals still running sit under Valid — come each day and collect. Finished rentals move to Expired.",
    side: "bottom",
  },
  {
    id: "withdraw",
    route: "/cashout",
    element: '[data-tour="withdraw"]',
    title: "Cash out",
    dialogue:
      "Set your withdrawal account once, then send your earnings to that M-Pesa number whenever you wish. Your PIN guards this door — give it to nobody. Not even me.",
    side: "bottom",
  },
  {
    id: "invite",
    route: "/team",
    element: '[data-tour="invite"]',
    title: "Your crew",
    dialogue:
      "Your code sits above. Share it — everyone who joins through it is part of your crew.",
    side: "bottom",
  },
  {
    id: "levels",
    route: "/team",
    element: '[data-tour="levels"]',
    title: "Three levels deep",
    dialogue:
      "Those you bring, those they bring, and those after. Counted here, level by level.",
    side: "top",
  },
  {
    id: "profile",
    route: "/mine",
    element: '[data-tour="profile-menu"]',
    title: "Your account",
    dialogue:
      "Withdrawal account, records, PIN. Set the account before your first cash-out.",
    side: "bottom",
  },
  {
    id: "whatsapp",
    route: "/mine",
    element: '[data-tour="whatsapp"]',
    title: "The community",
    dialogue: "We gather here. Word of every new release reaches this group first.",
    side: "top",
  },
  {
    id: "outro",
    route: "/mine",
    title: "The stage is yours",
    dialogue:
      "That is everything. Go pick your first track — I will walk you to the library. Call me back any time from Replay guide, in your account.",
  },
]
