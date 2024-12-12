import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/app/_utils/currency";
import Link from "next/link";
import {
  Transaction,
  EnumTransactionType,
  TransactionPaymentMethod,
} from "@/types/transactions-types";
import { CreditCard, Banknote, Landmark, SearchSlash } from "lucide-react";

interface LastTransactionsProps {
  lastTransactions: Transaction[];
}

export const TRANSACTION_PAYMENT_METHOD_ICONS: Record<
  TransactionPaymentMethod,
  string | JSX.Element
> = {
  CREDIT_CARD: <CreditCard />,
  DEBIT_CARD: <CreditCard />,
  BANK_TRANSFER: <Landmark />,
  BANK_SLIP: <Landmark />,
  CASH: <Banknote />,
  PIX: <Banknote />,
  OTHER: <SearchSlash />,
};

export function LastTransactions({ lastTransactions }: LastTransactionsProps) {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === EnumTransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === EnumTransactionType.INCOME) {
      return "text-primary";
    }
    return "text-blue-500";
  };
  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === EnumTransactionType.INCOME) {
      return "+";
    }
    return "-";
  };
  return (
    <ScrollArea className="rounded-md border border-zinc-200 bg-zinc-100 text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-semibold text-black/70 dark:text-white/70">
          Últimas Transações
        </CardTitle>
        <Button
          variant="outline"
          className="rounded-full font-semibold"
          asChild
        >
          <Link
            href="/transactions"
            className="border-zinc-200 bg-zinc-100 text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
          >
            Ver mais
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {lastTransactions.length > 0 ? (
          lastTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-zinc-300/50 p-2 text-black dark:bg-zinc-700/50 dark:text-white">
                  {TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}
                </div>
                <div>
                  <p className="text-sm font-bold">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
                {getAmountPrefix(transaction)}
                {formatCurrency(Number(transaction.amount))}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-black/80 dark:text-white/80">
            Sem transações recentes
          </p>
        )}
      </CardContent>
    </ScrollArea>
  );
}
