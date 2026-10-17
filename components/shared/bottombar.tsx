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
 * Renders two things: a spacer that takes the bar's height in normal flow, and
 * the bar itself. Pages therefore lay out relative to it and no longer carry
 * their own `mb-20` guesswork -- nothing ends up underneath it.
 *
 * Everything is sized in rem and flex fractions, so the bar grows with the
 * reader's text size instead of clipping.
 */
export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <div aria-hidden style={{ height: "calc(5.75rem + env(safe-area-inset-bottom))" }} />

      <nav
        className="fixed inset-x-0 bottom-0 z-50 px-4"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex max-w-md items-stretch gap-1 rounded-[1.75rem] border border-border/70 bg-background/85 p-1.5 shadow-premium backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className="group flex flex-1 flex-col items-center gap-1 rounded-[1.375rem] py-1.5 transition-colors"
              >
                <span
                  className={cn(
                    "flex size-9 items-center justify-center rounded-2xl transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-premium"
                      : "text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground group-active:scale-95",
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
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
