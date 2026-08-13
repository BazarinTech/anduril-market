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
    <div className="bg-card rounded-xl p-4 shadow-sm border border-border w-full">
      <Skeleton className="h-6 w-40 mb-3" />
      <div className="flex flex-col items-center gap-4 mb-4">
        <Skeleton className="w-80 h-48 rounded-lg" />
        <div className="w-full space-y-2">
          <div className="flex justify-between"><Skeleton className="h-4 w-16" /><Skeleton className="h-4 w-20" /></div>
          <div className="flex justify-between"><Skeleton className="h-4 w-12" /><Skeleton className="h-4 w-16" /></div>
          <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-20" /></div>
          <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-20" /></div>
        </div>
      </div>
      <Skeleton className="h-2 w-full mb-3 rounded-full" />
      <Skeleton className="h-10 w-36 rounded-lg" />
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