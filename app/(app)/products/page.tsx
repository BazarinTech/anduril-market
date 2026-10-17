'use client'
import { ProductCard } from '@/components/products/product-card'
import { BottomNav } from '@/components/shared/bottombar'
import NoList from '@/components/shared/no-list'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useMainStore } from '@/lib/stores/use-main-store'
import React from 'react'

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-card shadow-premium ring-1 ring-border/70">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="flex items-end justify-between gap-4 px-5 pt-4">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <div className="px-5 pt-4 pb-5">
        <Skeleton className="h-12 w-full rounded-4xl" />
      </div>
    </div>
  )
}

function Page() {
  const mainDetails = useMainStore((state) => state.mainDetails)
  const isMainFetching = useMainStore((state) => state.isMainFetching)

  return (
    <div>
      <Topbar title="The Farm" />

      <main className="mx-auto max-w-md px-4 pt-5">
        <header className="mb-5 px-1">
          <p className="text-eyebrow text-muted-foreground">Open ground</p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">Take a plot</h2>
          <p className="mt-1 text-sm text-muted-foreground">Every plot pays once a day, for its whole cycle.</p>
        </header>

        <div className="space-y-5">
          {isMainFetching && !mainDetails && (
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          )}
          {!isMainFetching && mainDetails?.products.map((product, i) => (
            <ProductCard
              key={product.name}
              index={i}
              name={product.name}
              image={product.image}
              image_url={product.image_url}
              max={product.max}
              duration={product.duration}
              returns={product.returns}
              order_limit={product.order_limit}
              ID={product.ID}
              tier={product.tier}
              description={product.description}
              status={product.status}
            />
          ))}
          {mainDetails?.products.length === 0 && (
            <NoList title='No plots open yet' description='Please reach our customer support for help'/>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

export default Page
