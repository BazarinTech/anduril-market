"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft01Icon } from "hugeicons-react"
import { cn } from "@/lib/utils"
import { BimaLogo } from "./brand-logo"

type Props = {
  className?: string
  title: string
  backBtn?: boolean
  /** Show the Bima logo in place of the text title. `title` stays as the accessible name. */
  brand?: boolean
}

function Topbar({ className, title, backBtn, brand }: Props) {
  const router = useRouter()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-14 w-full items-center border-b border-border/80 bg-background/85 px-4 backdrop-blur-lg",
        className,
      )}
    >
      {backBtn && (
        <button
          onClick={() => router.back()}
          className="absolute left-3 flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          aria-label="Go back"
        >
          <ArrowLeft01Icon size={22} />
        </button>
      )}
      <h1 className="flex w-full items-center justify-center text-base font-semibold text-foreground">
        {brand ? (
          <>
            <span className="sr-only">{title}</span>
            <BimaLogo size="sm" />
          </>
        ) : (
          title
        )}
      </h1>
    </header>
  )
}

export default Topbar
