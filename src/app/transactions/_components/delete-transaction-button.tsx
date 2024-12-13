import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useDeleteTransaction } from "@/hooks/transactions-hook";

interface DeleteTransactionButtonProps {
  transactionId: string;
}

export const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  const { mutate: deleteTransaction } = useDeleteTransaction();
  const handleConfirmDeleteClick = async () => {
    try {
      await deleteTransaction(transactionId);
      toast.success("Transação deletada com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao deletar a transação.");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-zinc-100 bg-zinc-50 text-black dark:border-zinc-900 dark:bg-zinc-950 dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você deseja realmente deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-none bg-zinc-200 text-black hover:bg-zinc-200/70 hover:text-black dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-800/70 dark:hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
