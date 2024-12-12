"use client";

import { ExpensesPerCategory } from "./expenses-per-category";
import { LastTransactions } from "./last-transactions";
import { SummaryCards } from "./summary-cards";
import { TransactionsPieChart } from "./transactions-pie-chart";
import { useDashboardData } from "@/hooks";

interface DashboardComponentsProps {
  searchParams: {
    month: string;
  };
}

export function DashboardComponents({
  searchParams: { month },
}: DashboardComponentsProps) {
  const { data: dashboard, isLoading } = useDashboardData(month);
  return (
    <div className="grid grid-cols-[2fr,1fr] gap-6 overflow-auto">
      <div className="flex flex-col gap-4 overflow-auto">
        <SummaryCards month={month} {...dashboard} isLoading={isLoading} />

        <div className="grid h-full grid-cols-3 grid-rows-1 gap-6">
          <TransactionsPieChart {...dashboard} isLoading={isLoading} />
          {dashboard && dashboard.totalExpensePerCategory ? (
            <ExpensesPerCategory
              expensesPerCategory={dashboard.totalExpensePerCategory}
            />
          ) : (
            <ExpensesPerCategory expensesPerCategory={[]} />
          )}
        </div>
      </div>

      {dashboard && dashboard.lastTransactions ? (
        <LastTransactions lastTransactions={dashboard.lastTransactions} />
      ) : (
        <LastTransactions lastTransactions={[]} />
      )}
    </div>
  );
}
