import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DashboardDetailsState {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  totalCategory: number
  totalTransactions: number;

  setTotalBalance: (v: number) => void;
  setTotalIncome: (v: number) => void;
  setTotalExpense: (v: number) => void;
  setTotalCategory: (v: number) => void;
  setTotalTransactions: (V: number) => void;
}

const useDashboardDetailsStore = create<DashboardDetailsState>()(
  persist(
    (set) => ({
      totalBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      totalCategory: 0,
      totalTransactions: 0,

      setTotalBalance: (v) => set({ totalBalance: v }),
      setTotalIncome: (v) => set({ totalIncome: v }),
      setTotalExpense: (v) => set({ totalExpense: v }),
      setTotalCategory: (v) => set({ totalCategory: v }),
      setTotalTransactions: (v) => set({ totalTransactions: v }),
    }),
    {
      name: "dashboard-details",
    }
  )
);

export default useDashboardDetailsStore;
