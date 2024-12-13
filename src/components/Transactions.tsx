"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/transactions-hook";
import { DataTable } from "./ui/data-table";
import { transactionsColumns } from "@/app/transactions/_columns";
import { AddTransactionButton } from "./add-transaction-button";
import { ScrollArea } from "./ui/scroll-area";
import { ToggleTheme } from "@/app/(home)/_components/toggle-theme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";

export default function TransactionsComponent() {
  const [orderBy, setOrderBy] = useState("date");
  const [orderDirection, setOrderDirection] = useState<"asc" | "desc">("desc");
  const [transactionType, setTransactionType] = useState("all");
  const { data: transactionsData } = useTransactions(
    orderBy,
    orderDirection,
    transactionType,
  );

  return (
    <div className="flex h-screen flex-col space-y-6 p-6 text-black dark:text-white">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex gap-3">
          <div className="flex flex-col items-start gap-3">
            <Label className="text-black dark:text-white">
              Tipo de Transação:
            </Label>

            <Select value={transactionType} onValueChange={setTransactionType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="INCOME">Receita</SelectItem>
                  <SelectItem value="EXPENSE">Despesa</SelectItem>
                  <SelectItem value="INVESTMENT">Investimento</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label className="text-black dark:text-white">Ordenar por:</Label>

            <Select value={orderBy} onValueChange={setOrderBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="date">Data</SelectItem>
                  <SelectItem value="amount">Valor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col items-start gap-3">
            <Label className="text-black dark:text-white">Ordem:</Label>

            <Select
              value={orderDirection}
              onValueChange={(value) =>
                setOrderDirection(value as "asc" | "desc")
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="desc">Maior para o Menor</SelectItem>
                  <SelectItem value="asc">Menor para o Maior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ToggleTheme />
          <AddTransactionButton />
        </div>
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
