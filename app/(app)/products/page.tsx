'use client'
import { ProductCard } from '@/components/products/product-card'
import { BottomNav } from '@/components/shared/bottombar'
import NoList from '@/components/shared/no-list'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { useMainStore } from '@/lib/stores/use-main-store'
import React, { useEffect } from 'react'

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-premium ring-1 ring-border/70">
      <div className="flex gap-4 p-4">
        <Skeleton className="h-36 w-28 shrink-0 rounded-t-full rounded-b-2xl" />
        <div className="flex-1 space-y-3 py-1">
          <div className="flex justify-between"><Skeleton className="h-5 w-28" /><Skeleton className="h-5 w-12 rounded-full" /></div>
          <Skeleton className="h-px w-full" />
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-7 w-28" />
          <div className="flex justify-between"><Skeleton className="h-4 w-12" /><Skeleton className="h-4 w-20" /></div>
          <div className="flex justify-between"><Skeleton className="h-4 w-10" /><Skeleton className="h-4 w-24" /></div>
        </div>
      </div>
      <div className="flex items-center gap-3 border-t border-border bg-muted/40 px-4 py-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="ml-auto h-11 flex-1 rounded-4xl" />
      </div>
    </div>
  )
}

function Page() {
  const mainDetails = useMainStore((state) => state.mainDetails)
  const isMainFetching = useMainStore((state) => state.isMainFetching)
  const loginState = useMainStore((state) => state.loginState)
    // useEffect(() => {
    //   loginState()
    // }, [loginState])
  return (
    <div>
      <Topbar title="Products" />

      <main className="max-w-md mx-auto px-4 py-4 space-y-4 mb-20">
        {isMainFetching && !mainDetails && (
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        )}
        {!isMainFetching && mainDetails?.products.map((product) => (
          <ProductCard
            key={product.name}
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
          <NoList title='No products found' description='Please reach our customer support for help'/>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

export default Page