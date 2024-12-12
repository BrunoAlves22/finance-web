import { AddTransactionButton } from "@/components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  userCanAddTransaction?: boolean;
  isLoading?: boolean;
}

export function SummaryCard({
  icon,
  title,
  amount,
  size = "small",
  isLoading = false,
}: SummaryCardProps) {
  return (
    <Card className="border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
      <CardHeader className="gap-2 text-black dark:text-white">
        <div className="w-fit rounded-full bg-zinc-300/50 p-2 dark:bg-zinc-700/50">
          {icon}
        </div>
        <p
          className={`${size === "small" ? "text-black/80 dark:text-white/80" : "text-2xl text-black/80 dark:text-white/80"}`}
        >
          {title}
        </p>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div
          className={`font-bold text-black dark:text-white ${size === "small" ? "text-2xl" : "text-4xl"}`}
        >
          {isLoading ? (
            <Skeleton className="h-[25px] w-[200px] rounded-full bg-zinc-700/50" />
          ) : (
            Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)
          )}
        </div>

        {size === "large" && <AddTransactionButton />}
      </CardContent>
    </Card>
  );
}
