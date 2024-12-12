"use client";

import { ArrowDownUp } from "lucide-react";
import { UpsertTransactionDialog } from "./upsert-transaction-dialog";
import { Button } from "./ui/button";
import { useState } from "react";

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean;
  onTransactionCreated?: () => void;
}

export function AddTransactionButton({}: AddTransactionButtonProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setDialogIsOpen(true)}
        className="rounded-full bg-[#55B02E] font-bold hover:bg-[#55B02E]/90"
      >
        <ArrowDownUp />
        Adicionar transação
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        isUpdated={false}
        isEditing={false}
      />
    </>
  );
}
