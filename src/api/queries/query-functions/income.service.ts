import { useMutation } from "@tanstack/react-query"
import { userAddIncome } from "../query-hooks/income.query"
import type { AddIncomePayload, IncomeResponse } from "../../../types/Income/income"
import { toast } from "react-toastify"


const UserAddIncomeMutation = () => {
    return useMutation<IncomeResponse, unknown, AddIncomePayload>({
        mutationKey: ["userAddIncome"],
        mutationFn: async (credentials) => await userAddIncome(credentials),
        onSuccess: () => {
            toast.success("Income added successful!");
        },
        onError: (error: any) => {
            console.error("error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        }
    })
}
export default UserAddIncomeMutation