'use client'

import { OrderCard } from '@/components/products/order-card'
import { BottomNav } from '@/components/shared/bottombar'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMainStore } from '@/lib/stores/use-main-store'
import { useEffect, useState } from 'react'

function OrderCardSkeleton() {
  return (
    <div className="rounded-xl bg-background p-4 shadow-sm border border-border w-full">
      <Skeleton className="h-5 w-36 mb-3" />
      <div className="flex gap-4">
        <Skeleton className="h-24 w-24 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="flex justify-between"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-16" /></div>
          <div className="flex justify-between"><Skeleton className="h-4 w-12" /><Skeleton className="h-4 w-10" /></div>
          <div className="flex justify-between"><Skeleton className="h-4 w-28" /><Skeleton className="h-4 w-16" /></div>
        </div>
      </div>
      <Skeleton className="h-11 w-full rounded-full mt-4" />
    </div>
  )
}

function Page() {
  const mainDetails = useMainStore((state) => state.mainDetails)
  const isMainFetching = useMainStore((state) => state.isMainFetching)
  const [validOrders, setValidOrders] = useState<InvestmentOrder[]>([]);
  const [expiredOrders, setExpiredOrders] = useState<InvestmentOrder[]>([]);

  // const loginState = useMainStore((state) => state.loginState)
  //   useEffect(() => {
  //     loginState()
  //   }, [loginState])

  useEffect(() => {
    if (mainDetails) {
      const valid = mainDetails.user_investments.filter((order) => order.status === 'Active');
      const expired = mainDetails.user_investments.filter((order) => order.status === 'Expired');
      setValidOrders(valid);
      setExpiredOrders(expired);
    }
  }, [mainDetails]);
  return (
    <div>
      <Topbar title="Tasks"/>
      {/* Summary Section */}
        <div className="px-4 py-6 mb-20">

          <Tabs defaultValue="valid" className="mt-1">
          <TabsList className="grid w-full grid-cols-2 rounded-full bg-background p-1 space-x-1">
            <TabsTrigger
              value="valid"
              className="rounded-full data-[state=inactive]:bg-background data-[state=active]:text-secondary data-[state=inactive]:shadow-sm data-[state=active]:bg-primary data-[state=inactive]:text-accent-foreground py-4"
            >
              Valid
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="rounded-full data-[state=inactive]:bg-background data-[state=active]:text-secondary data-[state=inactive]:shadow-sm data-[state=active]:bg-primary data-[state=inactive]:text-accent-foreground py-4"
            >
              Expired
            </TabsTrigger>
          </TabsList>

          <TabsContent value="valid" className="mt-5">
            <div className="space-y-4 p-4">
              {isMainFetching && !mainDetails && (
                <>
                  <OrderCardSkeleton />
                  <OrderCardSkeleton />
                  <OrderCardSkeleton />
                </>
              )}
              {!isMainFetching && validOrders.length > 0 ? (
                validOrders.map((order) => (
                  <OrderCard
                    key={order.ID}
                    name={order.product_name}
                    image={order.image}
                    cycle={order.duration}
                    total={order.total_returns}
                    purchaseDate={order.investment_date}
                    status={order.status}
                    daily={order.return_rate}
                    roll={order.roll}
                    orderID={order.ID}
                  />
                ))
              ) : (
                !isMainFetching && <p className="py-8 text-center text-muted-foreground">No valid orders found</p>
              )}
              {!isMainFetching && <p className="py-4 text-center text-sm text-muted-foreground">none more</p>}
            </div>
          </TabsContent>

          <TabsContent value="expired" className="mt-5">
            <div className="space-y-4 p-4">
              {isMainFetching && !mainDetails && (
                <>
                  <OrderCardSkeleton />
                  <OrderCardSkeleton />
                  <OrderCardSkeleton />
                </>
              )}
              {!isMainFetching && expiredOrders.length > 0 ? (
                expiredOrders.map((order) => (
                  <OrderCard
                    key={order.ID}
                    name={order.product_name}
                    image={order.image}
                    cycle={order.duration}
                    total={order.total_returns}
                    purchaseDate={order.investment_date}
                    status={order.status}
                    daily={order.return_rate}
                    roll={order.roll}
                    orderID={order.ID}
                  />
                ))
              ) : (
                !isMainFetching && <p className="py-8 text-center text-muted-foreground">No expired orders found</p>
              )}
              {!isMainFetching && <p className="py-4 text-center text-sm text-muted-foreground">none more</p>}
            </div>
          </TabsContent>
        </Tabs>
        </div>
      <BottomNav />
    </div>
  )
}

export default Page
