import type { AddExpensePayload, ExpenseResponse } from "../../../types/expense/expense";
import axiosInstance from "../../../util/axiosConfig";


export const userAddExpense = async(request: AddExpensePayload): Promise<ExpenseResponse> => {
  try {
    const { data } = await axiosInstance.post<ExpenseResponse>("/expenses", request);
    return data;
  } catch (error: any) {
    throw error;
  }
};