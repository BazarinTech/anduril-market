"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft01Icon } from "hugeicons-react"

type Props = {
  className?: string
  title: string
  backBtn?: boolean
}

function Topbar({ className, title, backBtn }: Props) {
  const router = useRouter()

  return (
    <div
      className={`w-full h-16 bg-white text-black border-b border-gray-200 sticky top-0 z-50 flex items-center px-4 ${className}`}
    >
      {backBtn && (
        <button
          onClick={() => router.back()}
          className="absolute left-4 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft01Icon size={24} className="text-foreground" />
        </button>
      )}
      <h1 className="text-xl font-bold text-center w-full">{title}</h1>
    </div>
  )
}

export default Topbar
