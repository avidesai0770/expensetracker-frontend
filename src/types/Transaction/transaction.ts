
export type TransactionFilterRequest = {
    startDate?: string;
    endDate?: string;
    keyword?: string;
    categoryName?: string | null;
    minAmount?: number | null;
    maxAmount?: number | null;
    sortField?: string;
    sortDirection?: "asc" | "desc";
    includeIncome?: boolean;
    includeExpense?: boolean
};

export interface TransactionFilterDTO  {
    id: number;
    type: "INCOME" | "EXPENSE";
    name: string;
    amount: number;
    date: string;
    categoryName: string;
}


export interface TransactionFilterResponse {
    transactions: TransactionFilterDTO[];
    totalIncome: number;
    totalExpense: number;
}
