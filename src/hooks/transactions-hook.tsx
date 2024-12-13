import { EnumTransactionType, Transaction } from "@/types/transactions-types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAxios } from "@/services/api";
import { queryClient } from "@/providers/ReactQueryProvider";

interface TransactionResponse {
  id?: string;
  name: string;
  amount: number;
  type: EnumTransactionType;
  category: string;
  paymentMethod: string;
  date: Date;
}

function translateTransaction(
  transaction: TransactionResponse,
): TransactionResponse {
  const categoryMap: { [key: string]: string } = {
    Aluguel: "RENT",
    Salário: "SALARY",
    Mercado: "GROCERIES",
    Contas: "UTILITIES",
    Transporte: "TRANSPORTATION",
    Entretenimento: "ENTERTAINMENT",
    Saúde: "HEALTH",
    Seguro: "INSURANCE",
    Educação: "EDUCATION",
    Reserva: "SAVINGS",
    Investimento: "INVESTMENT",
    Outros: "OTHER",
  };

  const paymentMethodMap: { [key: string]: string } = {
    Dinheiro: "CASH",
    "Cartão de Débito": "DEBIT_CARD",
    "Cartão de Crédito": "CREDIT_CARD",
    "Transferência Bancária": "BANK_TRANSFER",
    Boleto: "BANK_SLIP",
    PIX: "PIX",
    Outros: "OTHER",
  };

  return {
    ...transaction,
    category: categoryMap[transaction.category] || transaction.category,
    paymentMethod:
      paymentMethodMap[transaction.paymentMethod] || transaction.paymentMethod,
  };
}

// Hook para buscar transações
export function useTransactions(
  orderBy: string,
  orderDirection: "asc" | "desc",
  transactionType: string,
) {
  return useQuery<Transaction[]>({
    queryKey: ["transactions", orderBy, orderDirection, transactionType],
    queryFn: async () => {
      const api = await apiAxios();
      const response = await api.get("/get-transactions", {
        params: { orderBy, orderDirection, transactionType },
      });
      return response.data;
    },
  });
}

// Função para criar uma transação
async function createTransaction(transaction: TransactionResponse) {
  const api = await apiAxios();
  const translatedTransaction = translateTransaction(transaction);
  const response = await api.post("/create-transaction", translatedTransaction);
  return response.data;
}

// Hook para criar transação usando useMutation
export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // Invalida a query de transações para buscar novamente
      console.log("Transação criada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["transactions-info"] });
    },
  });
}

// Função para atualizar uma transação
async function updateTransaction(transaction: TransactionResponse) {
  const api = await apiAxios();
  const translatedTransaction = translateTransaction(transaction);
  const response = await api.put("/update-transaction", translatedTransaction);

  return response.data;
}

// Hook para atualizar transação usando useMutation
export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      // Invalida a query de transações para buscar novamente
      console.log("Transação atualizada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["transactions-info"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

// Função para deletar uma transação
async function deleteTransaction(id: string) {
  const api = await apiAxios();
  const response = await api.delete(`/delete-transaction/${id}`);
  return response.data;
}

// Hook para deletar transação usando useMutation
export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      // Invalida a query de transações para buscar novamente
      console.log("Transação deletada com sucesso");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

// Função para pegar as informações de uma transação
async function infoTransaction(id: string) {
  const api = await apiAxios();
  const response = await api.get(`/info-transaction/${id}`);
  return response.data;
}

// Hook para pegar informações de uma transação
export function useInfoTransaction(id: string) {
  return useMutation({
    mutationFn: () => infoTransaction(id),

    onSuccess: (data) => {
      console.log("Transação encontrada com sucesso", data);
      queryClient.invalidateQueries({ queryKey: ["transactions-info"] });
      queryClient.setQueryData(["transaction-info", id], data);
      return data;
    },
  });
}

// interface DashboardData {
//   balance: number;
//   depositsTotal: number;
//   investmentsTotal: number;
//   expensesTotal: number;
//   typesPercentage: {
//     INCOME: number;
//     EXPENSE: number;
//     INVESTMENT: number;
//   };
//   totalExpensePerCategory: {
//     category: string;
//     totalAmount: number;
//     percentageOfTotal: number;
//   }[];
//   lastTransactions: {
//     id: string;
//     date: string;
//     amount: number;
//     type: string;
//     category: string;
//   }[];
// }

// Função para fazer a requisição HTTP
const fetchDashboardData = async (month: string) => {
  const api = await apiAxios();
  const response = await api.get(`/get-dashboard/${month}`);
  return response.data;
};

// Hook customizado usando React Query
export const useDashboardData = (month: string) => {
  return useQuery({
    queryKey: ["dashboard", month],
    queryFn: () => fetchDashboardData(month),
  });
};

export function useGetCurrentMonthTransactions() {
  return useQuery({
    queryKey: ["months"],
    queryFn: async () => {
      const api = await apiAxios();
      const response = await api.get("/get-current-month-transactions");
      console.log("Resposta getCurrentMonthTransactions", response.data);
      return response.data;
    },
  });
}
