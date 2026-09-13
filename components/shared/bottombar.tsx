"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home01Icon, ShoppingBag01Icon, Briefcase01Icon, UserGroupIcon, UserIcon } from "hugeicons-react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Home",
    href: "/home",
    icon: Home01Icon,
  },
  {
    label: "Products",
    href: "/products",
    icon: ShoppingBag01Icon,
  },
  {
    label: "Income",
    href: "/work",
    icon: Briefcase01Icon,
  },
  {
    label: "Team",
    href: "/team",
    icon: UserGroupIcon,
  },
  {
    label: "Mine",
    href: "/mine",
    icon: UserIcon,
  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-border/80 bg-background/90 pb-safe backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && <span className="absolute top-0 h-0.5 w-7 rounded-full bg-primary" />}
              <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
              <span className={cn("text-[11px] tracking-wide", isActive ? "font-semibold" : "font-medium")}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
