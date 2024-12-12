import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TotalExpensePerCategory,
  TRANSACTION_CATEGORY_LABELS,
} from "@/types/transactions-types";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

export function ExpensesPerCategory({
  expensesPerCategory,
}: ExpensesPerCategoryProps) {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border border-zinc-200 bg-zinc-100 pb-6 text-black dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
      <CardHeader>
        <CardTitle className="font-semibold text-black/70 dark:text-white/70">
          Gastos por Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.length > 0 ? (
          expensesPerCategory.map((category: TotalExpensePerCategory) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          ))
        ) : (
          <p className="text-sm text-black/80 dark:text-white/80">
            Sem nenhum gasto por categoria
          </p>
        )}
      </CardContent>
    </ScrollArea>
  );
}
