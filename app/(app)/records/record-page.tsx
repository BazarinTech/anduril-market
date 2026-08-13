'use client'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCurrency } from '@/lib/hooks/use-currency'
import { useMainStore } from '@/lib/stores/use-main-store'
import { useSearchParams } from 'next/dist/client/components/navigation'
import React, { useEffect, useState } from 'react'


const statusStyles: Record<TransactionStatus, string> = {
  Pending: "bg-orange-400 text-white",
  Success: "bg-green-500 text-white",
  Failed: "bg-red-500 text-white",
  Approved: "bg-green-500 text-white",
  Rejected: "bg-red-500 text-white",
  Completed: "bg-blue-500 text-white",
  Processing: "bg-blue-500 text-white",
}

function TransactionCard({ transaction }: { transaction: Transactions }) {
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-foreground font-medium">{transaction.type}</p>
          <p className="text-primary font-semibold text-lg">{useCurrency(transaction.amount)}</p>
          <p className="text-muted-foreground text-sm">{transaction.time}</p>
        </div>
        <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusStyles[transaction.status]}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  )
}

function TransactionCardSkeleton() {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-7 w-24 rounded-full" />
      </div>
    </div>
  )
}

export function TransactionListSkeleton() {
  return (
    <div className="space-y-3">
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
      <TransactionCardSkeleton />
    </div>
  )
}

function TransactionList({ transactions, isLoading }: { transactions: Transactions[]; isLoading: boolean }) {
  if (isLoading) return <TransactionListSkeleton />

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.ID} transaction={transaction} />
      ))}
      <p className="text-center text-muted-foreground text-sm py-4">none more</p>
    </div>
  )
}


function RecordPage() {
  const loginState = useMainStore((state) => state.loginState)
  const mainDetails = useMainStore((state) => state.mainDetails)
  const isMainFetching = useMainStore((state) => state.isMainFetching)
  const [accountTransactions, setAccountTransactions] = useState<Transactions[]>([])
  const [rechargeTransactions, setRechargeTransactions] = useState<Transactions[]>([])
  const [withdrawTransactions, setWithdrawTransactions] = useState<Transactions[]>([])
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "account";
    useEffect(() => {
      loginState()
    }, [loginState])

    useEffect(() => {
      if(mainDetails){
        const transactions = mainDetails.transactions
        const accountTxs: Transactions[] = []
        const rechargeTxs: Transactions[] = []
        const withdrawTxs: Transactions[] = []
        for(const tx of transactions){
          if(tx.type === "Deposit"){
            rechargeTxs.push(tx)
          }else if(tx.type === "Withdraw"){
            withdrawTxs.push(tx)
          }else {
            accountTxs.push(tx)
          }
        }
        setAccountTransactions(accountTxs)
        setRechargeTransactions(rechargeTxs)
        setWithdrawTransactions(withdrawTxs)
      }
    }, [mainDetails])

  const isLoading = isMainFetching && !mainDetails

  return (
    <div>
      <Topbar title="Records" backBtn />

      <div className="px-4 pt-4">
        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="w-full h-12 bg-primary rounded-full p-1 grid grid-cols-3">
            <TabsTrigger
              value="account"
              className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none font-medium"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="deposit"
              className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none font-medium"
            >
              Recharge
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
              className="rounded-full text-white data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none font-medium"
            >
              Withdraw
            </TabsTrigger>
          </TabsList>

          <div className="mt-4">
            <TabsContent value="account" className="mt-0">
              <TransactionList transactions={accountTransactions} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="deposit" className="mt-0">
              <TransactionList transactions={rechargeTransactions} isLoading={isLoading} />
            </TabsContent>

            <TabsContent value="withdraw" className="mt-0">
              <TransactionList transactions={withdrawTransactions} isLoading={isLoading} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default RecordPage