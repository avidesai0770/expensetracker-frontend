import type { AddIncomePayload, IncomeResponse } from "../../../types/Income/income";
import axiosInstance from "../../../util/axiosConfig";


export const userAddIncome = async(request: AddIncomePayload): Promise<IncomeResponse> => {
  try {
    const { data } = await axiosInstance.post<IncomeResponse>("/incomes", request);
    return data;
  } catch (error: any) {
    throw error;
  }
};