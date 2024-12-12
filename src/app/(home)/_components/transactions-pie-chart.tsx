"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  EnumTransactionType,
  TransactionPercentagePerType,
} from "@/types/transactions-types";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { PercentageItem } from "./percentage-item";
import { Card, CardContent } from "@/components/ui/card";

const chartConfig = {
  [EnumTransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#3b82f6",
  },
  [EnumTransactionType.INCOME]: {
    label: "Receita",
    color: "#55B02E",
  },
  [EnumTransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

interface TransactionsPieChartProps {
  typesPercentage: TransactionPercentagePerType;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  isLoading?: boolean;
}

export function TransactionsPieChart({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
  isLoading = false,
}: TransactionsPieChartProps) {
  const chartData = [
    {
      type: EnumTransactionType.INCOME,
      amount: depositsTotal,
      fill: "#55B02E",
    },
    {
      type: EnumTransactionType.EXPENSE,
      amount: expensesTotal,
      fill: "#E93030",
    },
    {
      type: EnumTransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: "#3b82f6",
    },
  ];

  const hasData = chartData.some((data) => data.amount > 0);

  return (
    <Card className="flex flex-col border-zinc-200 bg-zinc-100 p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={
                hasData
                  ? chartData
                  : [{ type: "Vazio", amount: 1, fill: "#52525b" }]
              }
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={isLoading ? 0 : typesPercentage[EnumTransactionType.INCOME]}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={isLoading ? 0 : typesPercentage[EnumTransactionType.EXPENSE]}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-blue-500" />}
            title="Investido"
            value={
              isLoading ? 0 : typesPercentage[EnumTransactionType.INVESTMENT]
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
