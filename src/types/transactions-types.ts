export type TransactionType = "INCOME" | "EXPENSE" | "INVESTMENT";

export enum EnumTransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  INVESTMENT = "INVESTMENT",
}

export type TransactionCategory =
  | "SALARY"
  | "RENT"
  | "GROCERIES"
  | "UTILITIES"
  | "TRANSPORTATION"
  | "ENTERTAINMENT"
  | "HEALTH"
  | "INSURANCE"
  | "EDUCATION"
  | "SAVINGS"
  | "INVESTMENT"
  | "OTHER";

export enum EnumTransactionCategory {
  SALARY = "Salário",
  RENT = "Aluguel",
  GROCERIES = "Mercado",
  UTILITIES = "Contas",
  TRANSPORTATION = "Transporte",
  ENTERTAINMENT = "Entretenimento",
  HEALTH = "Saúde",
  INSURANCE = "Seguro",
  EDUCATION = "Educação",
  SAVINGS = "Reserva",
  INVESTMENT = "Investimento",
  OTHER = "Outros",
}

export type TransactionPaymentMethod =
  | "CASH"
  | "DEBIT_CARD"
  | "CREDIT_CARD"
  | "PIX"
  | "BANK_TRANSFER"
  | "BANK_SLIP"
  | "OTHER";

export enum EnumTransactionPaymentMethod {
  CASH = "Dinheiro",
  DEBIT_CARD = "Cartão de Débito",
  CREDIT_CARD = "Cartão de Crédito",
  PIX = "PIX",
  BANK_TRANSFER = "Transferência Bancária",
  BANK_SLIP = "Boleto",
  OTHER = "Outros",
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: string;
}

type LocalTransactionCategory =
  | "SALARY"
  | "RENT"
  | "GROCERIES"
  | "UTILITIES"
  | "TRANSPORTATION"
  | "ENTERTAINMENT"
  | "HEALTH"
  | "INSURANCE"
  | "EDUCATION"
  | "SAVINGS"
  | "INVESTMENT"
  | "OTHER";

type TransactionCategoryLabels = {
  [key in LocalTransactionCategory]: string;
};

export const TRANSACTION_CATEGORY_LABELS: TransactionCategoryLabels = {
  SALARY: "Salário",
  RENT: "Aluguel",
  GROCERIES: "Mercado",
  UTILITIES: "Contas",
  TRANSPORTATION: "Transporte",
  ENTERTAINMENT: "Entretenimento",
  HEALTH: "Saúde",
  INSURANCE: "Seguro",
  EDUCATION: "Educação",
  SAVINGS: "Reserva",
  INVESTMENT: "Investimento",
  OTHER: "Outros",
};

type LocalTransactionPaymentMethod =
  | "CASH"
  | "DEBIT_CARD"
  | "CREDIT_CARD"
  | "PIX"
  | "BANK_TRANSFER"
  | "BANK_SLIP"
  | "OTHER";

type TransactionPaymentMethodLabels = {
  [key in LocalTransactionPaymentMethod]: string;
};

export const TRANSACTION_PAYMENT_METHOD_LABELS: TransactionPaymentMethodLabels =
  {
    CASH: "Dinheiro",
    DEBIT_CARD: "Cartão de Débito",
    CREDIT_CARD: "Cartão de Crédito",
    PIX: "PIX",
    BANK_TRANSFER: "Transferência Bancária",
    BANK_SLIP: "Boleto",
    OTHER: "Outros",
  };

export const TRANSACTION_TYPE_OPTIONS = [
  { value: EnumTransactionType.INCOME, label: "Receita" },
  { value: EnumTransactionType.EXPENSE, label: "Despesa" },
  { value: EnumTransactionType.INVESTMENT, label: "Investimento" },
];

export const TRANSACTION_PAYMENT_METHOD_OPTIONS = [
  { value: EnumTransactionPaymentMethod.CASH, label: "Dinheiro" },
  { value: EnumTransactionPaymentMethod.DEBIT_CARD, label: "Cartão de Débito" },
  {
    value: EnumTransactionPaymentMethod.CREDIT_CARD,
    label: "Cartão de Crédito",
  },
  { value: EnumTransactionPaymentMethod.PIX, label: "PIX" },
  {
    value: EnumTransactionPaymentMethod.BANK_TRANSFER,
    label: "Transferência Bancária",
  },
  { value: EnumTransactionPaymentMethod.BANK_SLIP, label: "Boleto" },
  { value: EnumTransactionPaymentMethod.OTHER, label: "Outros" },
];

export const TRANSACTION_CATEGORY_OPTIONS = [
  { value: EnumTransactionCategory.SALARY, label: "Salário" },
  { value: EnumTransactionCategory.RENT, label: "Aluguel" },
  { value: EnumTransactionCategory.GROCERIES, label: "Mercado" },
  { value: EnumTransactionCategory.UTILITIES, label: "Contas" },
  { value: EnumTransactionCategory.TRANSPORTATION, label: "Transporte" },
  { value: EnumTransactionCategory.ENTERTAINMENT, label: "Entretenimento" },
  { value: EnumTransactionCategory.HEALTH, label: "Saúde" },
  { value: EnumTransactionCategory.INSURANCE, label: "Seguro" },
  { value: EnumTransactionCategory.EDUCATION, label: "Educação" },
  { value: EnumTransactionCategory.SAVINGS, label: "Reserva" },
  { value: EnumTransactionCategory.INVESTMENT, label: "Investimento" },
  { value: EnumTransactionCategory.OTHER, label: "Outros" },
];

export type TransactionPercentagePerType = {
  [key in TransactionType]: number;
};

export interface TotalExpensePerCategory {
  category: TransactionCategory;
  totalAmount: number;
  percentageOfTotal: number;
}
