"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home01Icon, ShoppingBag01Icon, Briefcase01Icon, Building01Icon, UserIcon } from "hugeicons-react"
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
    icon: Building01Icon,
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background pb-safe">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                size={24}
                strokeWidth={isActive ? 2 : 1.5}
                className={cn("transition-all", isActive && "scale-110")}
              />
              <span className={cn("text-xs transition-all", isActive ? "font-semibold" : "font-normal")}>
                {item.label}
              </span>
              {isActive && <span className="absolute top-0 h-0.5 w-8 rounded-full bg-primary" />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
