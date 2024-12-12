"use client";

import { useTransactions } from "@/hooks"; // Ajuste o path conforme a estrutura do projeto
import { DataTable } from "./ui/data-table";
import { transactionsColumns } from "@/app/transactions/_columns";
import { AddTransactionButton } from "./add-transaction-button";
import { ScrollArea } from "./ui/scroll-area";
import { ToggleTheme } from "@/app/(home)/_components/toggle-theme";

export default function TransactionsComponent() {
  const { data: transactionsData } = useTransactions();

  return (
    <div className="flex h-screen flex-col space-y-6 p-6 text-black dark:text-white">
      <div className="flex w-full items-center justify-end gap-3">
        <ToggleTheme />
        <AddTransactionButton />
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full max-h-[92%]">
          <DataTable
            columns={transactionsColumns}
            data={JSON.parse(JSON.stringify(transactionsData ?? []))}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
