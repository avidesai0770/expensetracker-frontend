
import type { TransactionFilterRequest, TransactionFilterResponse } from "../../../types/Transaction/transaction";
import axiosInstance from "../../../util/axiosConfig";



export const userTransactionFilter = async(request: TransactionFilterRequest): Promise<TransactionFilterResponse> => {
  try {
    const { data } = await axiosInstance.post<TransactionFilterResponse>("/transactions/filter", request);
    return data;
  } catch (error: any) {
    throw error;
  }
};