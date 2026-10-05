/**
 * Spartacus's script.
 *
 * Short beats, one idea each: a tutorial that arrives in small pieces is
 * easier to absorb than one that explains the whole arena at once.
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
  /** Shown above the dialogue, in Spartacus's voice. */
  title: string
  dialogue: string
  side?: "top" | "bottom" | "left" | "right"
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "intro",
    route: "/home",
    title: "New blood",
    dialogue:
      "Hold there. I am Spartacus — I fought on this sand before I trained others on it. You will not learn it all at once, so I will give it to you a piece at a time. Walk with me.",
  },
  {
    id: "intro-2",
    route: "/home",
    title: "Three things win here",
    dialogue:
      "A product that earns. A legion at your back. A purse you can empty when you choose. One at a time — starting with the ground beneath you.",
  },
  {
    id: "home-banner",
    route: "/home",
    element: '[data-tour="home-banner"]',
    title: "Your arena floor",
    dialogue: "Your banner. Your name, your rank, what you have taken today.",
    side: "bottom",
  },
  {
    id: "quick-actions",
    route: "/home",
    element: '[data-tour="quick-actions"]',
    title: "Every gate",
    dialogue: "Every gate you need, in one row. You will wear these out.",
    side: "bottom",
  },
  {
    id: "deposit",
    route: "/recharge",
    element: '[data-tour="deposit"]',
    title: "Fund your purse",
    dialogue:
      "Your purse first. Pick an amount, confirm the M-Pesa prompt on your handset. Nothing moves until you enter your own PIN.",
    side: "top",
  },
  {
    id: "products",
    route: "/products",
    element: '[data-tour="product-card"]',
    title: "Choose your weapon",
    dialogue:
      "Stake, cycle, daily pay — every product shows all three before you commit. Read them, and take one up when you are ready. No rush.",
    side: "bottom",
  },
  {
    id: "claim",
    route: "/work",
    // Anchored to the tabs, not to a Claim button: a new fighter owns nothing
    // yet, so that button does not exist and the whole step was being skipped
    // for exactly the people this tour is for.
    element: '[data-tour="income"]',
    title: "Where you claim",
    dialogue:
      "This is where your products pay you. Once you own one, its daily earnings wait here under Valid — come back each day and claim them. Finished runs move to Expired.",
    side: "bottom",
  },
  {
    id: "withdraw",
    route: "/cashout",
    element: '[data-tour="withdraw"]',
    title: "Carry it home",
    dialogue:
      "Your way out. Set your withdrawal account once, then send your balance to that M-Pesa number whenever you please. Your PIN guards this gate — give it to no one. Not even me.",
    side: "bottom",
  },
  {
    id: "invite",
    route: "/team",
    element: '[data-tour="invite"]',
    title: "Raise your legion",
    dialogue: "Your code sits above. Copy it, share it — everyone who enters through it stands in your ranks.",
    side: "bottom",
  },
  {
    id: "levels",
    route: "/team",
    element: '[data-tour="levels"]',
    title: "Three ranks deep",
    dialogue:
      "Your legion runs three deep: those you bring, those they bring, and those after. Counted here, level by level.",
    side: "top",
  },
  {
    id: "profile",
    route: "/mine",
    element: '[data-tour="profile-menu"]',
    title: "Your quarters",
    dialogue:
      "Your quarters: withdrawal account, records, PIN. Set the account before your first cash-out.",
    side: "bottom",
  },
  {
    id: "whatsapp",
    route: "/mine",
    element: '[data-tour="whatsapp"]',
    title: "Train with others",
    dialogue: "The rest of the legion gathers here. Word of every trial reaches them first.",
    side: "top",
  },
  {
    id: "outro",
    route: "/mine",
    title: "The sand is yours",
    dialogue:
      "That is the arena, champion. Choose your first weapon — I will set you down in the armoury. Call me back any time from Replay guide, in your quarters.",
  },
]
