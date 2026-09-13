'use client'
import Topbar from '@/components/shared/topbar'
import { Skeleton } from '@/components/ui/skeleton'
import NoList from '@/components/shared/no-list'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCurrency } from '@/lib/hooks/use-currency'
import { useMainStore } from '@/lib/stores/use-main-store'
import { useSearchParams } from 'next/dist/client/components/navigation'
import React, { useEffect, useState } from 'react'


// Soft, tinted chips: status should be scannable without shouting louder
// than the amount it describes.
const statusStyles: Record<TransactionStatus, string> = {
  Pending: "bg-warning-soft text-warning",
  Success: "bg-success-soft text-success",
  Failed: "bg-destructive/10 text-destructive",
  Approved: "bg-success-soft text-success",
  Rejected: "bg-destructive/10 text-destructive",
  Completed: "bg-accent text-accent-foreground",
  Processing: "bg-accent text-accent-foreground",
}

function TransactionCard({ transaction }: { transaction: Transactions }) {
  
  return (
    <div className="bg-card rounded-xl p-4 ring-1 ring-border/70">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{transaction.type}</p>
          <p className="text-lg font-semibold text-foreground tabular-nums">{useCurrency(transaction.amount)}</p>
          <p className="text-xs text-muted-foreground tabular-nums">{transaction.time}</p>
        </div>
        <span className={`text-eyebrow rounded-full px-2.5 py-1 ${statusStyles[transaction.status] ?? "bg-muted text-muted-foreground"}`}>
          {transaction.status}
        </span>
      </div>
    </div>
  )
}

function TransactionCardSkeleton() {
  return (
    <div className="bg-card rounded-xl p-4 ring-1 ring-border/70">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
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
  if (transactions.length === 0) return <NoList title="No records yet" description="Transactions will appear here as they happen." />

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <TransactionCard key={transaction.ID} transaction={transaction} />
      ))}
      <p className="py-2 text-center text-xs text-muted-foreground">No more records</p>
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

      <div className="mx-auto max-w-md px-4 pt-4 pb-10">
        <Tabs defaultValue={tab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="account"
            >
              Account
            </TabsTrigger>
            <TabsTrigger
              value="deposit"
            >
              Recharge
            </TabsTrigger>
            <TabsTrigger
              value="withdraw"
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