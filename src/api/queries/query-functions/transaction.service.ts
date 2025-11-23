import { useMutation } from "@tanstack/react-query";
import type { TransactionFilterRequest, TransactionFilterResponse } from "../../../types/Transaction/transaction";
import { toast } from "react-toastify";
import { userTransactionFilter } from "../query-hooks/transaction.query";


export const UserTransactionFilterMutation = () => {
    return useMutation<TransactionFilterResponse, unknown, TransactionFilterRequest>({
        mutationKey: ["userTransactionFilter"],
        mutationFn: async (credentials) => await userTransactionFilter(credentials),

        onSuccess: (response: TransactionFilterResponse) => {

        },
        onError: (error: any) => {
            console.error("error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
        }
    })
}