export interface Transaction {
  id: number;
  name: string;
  icon: string | null;
  date: string;
  categoryName: string;
  categoryId: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface RecentTransaction {
  id: number;
  profileId: number;
  name: string;
  icon: string | null;
  amount: number;
  date: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  type: "INCOME" | "EXPENSE";
}

export interface MonthlyExpenseByCategory {
  categoryName: string,
  icon: string,
  totalAmount: number
  [key: string]: string | number | undefined;
}

export interface IncomeVsExpense {
  month: string,
  income: number,
  expense: number
}



export interface DashboardResponse {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalCategoryForCurrentProfile: number;
  totalTransactions: number;
  lastMonthTotalIncome: number;
  monthlyTotalTransactions: number;
  currentMonthTotalBalance: number;
  lastMonthTotalExpense: number;
  currentMonthTotalExpense: number;
  currentMonthTotalIncome: number;
  latestIncome: Transaction[];
  latestExpense: Transaction[];
  recentTransactions: RecentTransaction[];
  monthlyExpenseByCategory: MonthlyExpenseByCategory[]
  incomevsexpense: IncomeVsExpense[]
}
