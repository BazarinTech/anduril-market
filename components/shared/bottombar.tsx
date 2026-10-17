"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home09Icon, Plant02Icon, ShoppingBasket03Icon, UserGroupIcon, UserCircleIcon } from "hugeicons-react"
import { cn } from "@/lib/utils"

// Farm words, farm icons: the yard, the plots, what the day produced, the
// people around you, and you.
const navItems = [
  { label: "Yard", href: "/home", icon: Home09Icon },
  { label: "Farm", href: "/products", icon: Plant02Icon },
  { label: "Harvest", href: "/work", icon: ShoppingBasket03Icon },
  { label: "Team", href: "/team", icon: UserGroupIcon },
  { label: "Mine", href: "/mine", icon: UserCircleIcon },
]

/**
 * The bottom bar.
 *
 * Sits flush on the bottom edge, full width, resting on a hairline -- a bar,
 * not a floating pill. Only the active tab is picked out, by a filled chip
 * behind its icon.
 *
 * Renders a spacer of its own height in normal flow ahead of it, so pages lay
 * out relative to the bar and nothing ends up underneath it; pages carry no
 * bottom-padding guesswork of their own.
 */
export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <div aria-hidden style={{ height: "calc(4rem + env(safe-area-inset-bottom))" }} />

      <nav
        className="fixed inset-x-0 bottom-0 z-50 border-t border-border/80 bg-background/90 backdrop-blur-lg"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-16 max-w-md items-stretch px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="group flex flex-1 flex-col items-center justify-center gap-1"
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground group-active:scale-95",
                  )}
                >
                  <Icon size={19} strokeWidth={isActive ? 2 : 1.5} />
                </span>
                <span
                  className={cn(
                    "text-[0.6875rem] leading-none",
                    isActive ? "font-semibold text-primary" : "font-medium text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
