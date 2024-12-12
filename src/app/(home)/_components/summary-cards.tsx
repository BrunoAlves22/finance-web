import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import { SummaryCard } from "./summary-card";

interface SummaryCards {
  month: string;
  balance: number;
  depositsTotal: number;
  investmentsTotal: number;
  expensesTotal: number;
  userCanAddTransaction?: boolean;
  isLoading?: boolean;
}

export function SummaryCards({
  balance,
  depositsTotal,
  expensesTotal,
  investmentsTotal,
  isLoading = false,
}: SummaryCards) {
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        isLoading={isLoading}
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} className="text-blue-500" />}
          title="Investido"
          amount={investmentsTotal}
          isLoading={isLoading}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
          isLoading={isLoading}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={expensesTotal}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
