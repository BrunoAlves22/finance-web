import { Badge } from "@/components/ui/badge";
import { TransactionType } from "@/types/transactions-types";
import { Circle } from "lucide-react";

export function TypeBadge({ type }: { type: TransactionType }) {
  if (type === "INCOME") {
    return (
      <Badge className="bg-green-700 hover:bg-green-700 dark:bg-green-900/70 dark:hover:bg-green-900/70">
        <Circle
          size={14}
          className="mr-2 border-green-900/70 fill-green-900/70 dark:border-green-700 dark:fill-green-700"
        />
        Receita
      </Badge>
    );
  }

  if (type === "EXPENSE") {
    return (
      <Badge className="bg-red-700 hover:bg-red-700 dark:bg-red-900/70 dark:hover:bg-red-900/70">
        <Circle
          size={14}
          className="mr-2 border-red-900 fill-red-900 dark:border-red-700 dark:fill-red-700"
        />
        Despesa
      </Badge>
    );
  }

  return (
    <Badge className="bg-blue-700 hover:bg-blue-700 dark:bg-blue-900/70 dark:hover:bg-blue-900/70">
      <Circle
        size={14}
        className="mr-2 border-blue-900 fill-blue-900 dark:border-blue-700 dark:fill-blue-700"
      />
      Investimento
    </Badge>
  );
}
