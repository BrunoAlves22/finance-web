"use client";

import {
  Transaction,
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/types/transactions-types";
import { ColumnDef } from "@tanstack/react-table";
import { TypeBadge } from "../_components/type-bagde";
import { EditTransactionButton } from "../_components/edit-transaction-button";
import { DeleteTransactionButton } from "../_components/delete-transaction-button";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return <TypeBadge type={transaction.type} />;
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_CATEGORY_LABELS[transaction.category];
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) => {
      return TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod];
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) => {
      return new Date(transaction.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) => {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(transaction.amount);
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="space-x-1">
          <EditTransactionButton transaction={transaction} />

          <DeleteTransactionButton transactionId={transaction.id} />
        </div>
      );
    },
  },
];
