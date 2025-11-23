import { useMutation } from "@tanstack/react-query"
import type { AddExpensePayload, ExpenseResponse } from "../../../types/expense/expense"
import { userAddExpense } from "../query-hooks/expense.query"
import { toast } from "react-toastify"


export const UserAddExpenseMutation = () => {
    return useMutation<ExpenseResponse, unknown, AddExpensePayload>({
        mutationKey: ["userAddExpense"],
        mutationFn: async (credentials) => await userAddExpense(credentials),

        onSuccess: () => {
            toast.success("Expense added successful!");
        },
        onError: (error: any) => {
            console.error("error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        }
    })
}