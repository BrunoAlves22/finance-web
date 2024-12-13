import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Transaction,
  EnumTransactionType,
  EnumTransactionCategory,
  EnumTransactionPaymentMethod,
} from "@/types/transactions-types";
import { UpsertTransactionDialog } from "@/components/upsert-transaction-dialog";
import { useInfoTransaction } from "@/hooks/transactions-hook";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

export function EditTransactionButton({
  transaction,
}: EditTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const { mutate: updateTransaction, data } = useInfoTransaction(
    transaction.id,
  );

  const handleEdit = () => {
    updateTransaction(undefined, {
      onSuccess: () => {
        setDialogIsOpen(true);
      },
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const convertToEnum = (value: string | null, enumObject: any): any => {
    if (!value) return null; // Retorna null se o valor for nulo ou indefinido
    return enumObject[value as keyof typeof enumObject];
  };

  return (
    <>
      <Button
        onClick={handleEdit}
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
      >
        <Pencil />
      </Button>

      {data && (
        <UpsertTransactionDialog
          isOpen={dialogIsOpen}
          setIsOpen={setDialogIsOpen}
          defaultValues={{
            name: data.name, // Fallback para string vazia
            type: convertToEnum(data.type, EnumTransactionType), // Fallback para um tipo padrão
            amount: Number(data.amount), // Fallback para 0
            date: data.date ? new Date(data.date) : new Date(), // Fallback para a data atual
            category: convertToEnum(data.category, EnumTransactionCategory),
            paymentMethod: convertToEnum(
              data.paymentMethod,
              EnumTransactionPaymentMethod,
            ),
          }}
          isUpdated={true}
          transactionId={data.id}
          isEditing={true}
        />
      )}
    </>
  );
}
