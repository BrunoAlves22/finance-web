import { Button } from "./ui/button";
import {
  useCreateTransaction,
  useUpdateTransaction,
} from "@/hooks/transactions-hook";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  EnumTransactionCategory,
  EnumTransactionPaymentMethod,
  EnumTransactionType,
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "@/types/transactions-types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { DatePicker } from "./ui/date-picker";

interface UpsertTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: FormValues;
  isUpdated: boolean;
  transactionId?: string;
  isEditing?: boolean;
}

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
  amount: z
    .number({ required_error: "O valor é obrigatório" })
    .positive({ message: "O valor deve ser positivo" }),
  type: z.nativeEnum(EnumTransactionType, {
    required_error: "Tipo de transação é obrigatório",
  }),
  category: z.nativeEnum(EnumTransactionCategory, {
    required_error: "Categoria é obrigatória",
  }),
  paymentMethod: z.nativeEnum(EnumTransactionPaymentMethod, {
    required_error: "Método de pagamento é obrigatório",
  }),
  date: z.date({
    required_error: "Data é obrigatória",
  }),
});

export type FormValues = z.infer<typeof formSchema>;

export function UpsertTransactionDialog({
  isOpen,
  setIsOpen,
  defaultValues,
  isUpdated,
  transactionId,
  isEditing,
}: UpsertTransactionDialogProps) {
  const { mutate: createTransaction } = useCreateTransaction();
  const { mutate: updateTransaction } = useUpdateTransaction();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditing
      ? defaultValues
      : {
          name: "",
          amount: 0,
          type: EnumTransactionType.EXPENSE,
          category: EnumTransactionCategory.OTHER,
          paymentMethod: EnumTransactionPaymentMethod.OTHER,
          date: new Date(),
        },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log("values", values);
      if (isUpdated) {
        // Update transaction

        await updateTransaction({
          id: transactionId!,
          ...values,
        });
      } else {
        // Create transaction
        await createTransaction(values);

        form.reset();
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar transação", error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open && isEditing) {
          form.reset(defaultValues ?? form.getValues());
        }

        if (!open && !isEditing) {
          form.reset({
            name: "",
            amount: 0,
            type: EnumTransactionType.EXPENSE,
            category: EnumTransactionCategory.OTHER,
            paymentMethod: EnumTransactionPaymentMethod.OTHER,
            date: new Date(),
          });
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>

      <DialogContent className="border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle className="text-black dark:text-white">
            {isUpdated ? "Atualizar transação" : "Adicionar transação"}
          </DialogTitle>
          <DialogDescription>
            {isUpdated
              ? "Atualize as informações da transação"
              : "Insira as informações da transação para adicionar"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white"
                      placeholder="Digite o nome"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Valor
                  </FormLabel>
                  <FormControl>
                    <MoneyInput
                      className="bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white"
                      placeholder="Digite o valor"
                      onValueChange={(values) => {
                        field.onChange(values.floatValue ?? 0); // Permitir valores vazios
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                      value={field.value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Tipo
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-200 hover:bg-zinc-100/50 dark:bg-zinc-800 dark:hover:bg-zinc-900/50">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-200 text-black dark:bg-zinc-900 dark:text-white">
                      {TRANSACTION_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Categoria
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-200 hover:bg-zinc-100/50 dark:bg-zinc-800 dark:hover:bg-zinc-900/50">
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-200 text-black dark:bg-zinc-900 dark:text-white">
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Método de Pagamento
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-zinc-200 hover:bg-zinc-100/50 dark:bg-zinc-800 dark:hover:bg-zinc-900/50">
                        <SelectValue placeholder="Selecione o método" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-zinc-200 text-black dark:bg-zinc-900 dark:text-white">
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Data
                  </FormLabel>

                  <DatePicker value={field.value} onChange={field.onChange} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="border-none bg-zinc-200 text-black hover:bg-zinc-100/70 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-900/70 dark:hover:text-white"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button className="bg-[#55B02E] hover:bg-[#55B02E]/90">
                {isUpdated ? "Atualizar" : "Adicionar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
