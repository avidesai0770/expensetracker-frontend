import { useMutation, useQuery } from "@tanstack/react-query";
import type { DashboardResponse } from "../../../types/DashBoard/dashboard";
import { fetchDashboardData } from "../query-hooks/dashboard.query";
import useDashboardDetailsStore from "../../../Store/Dashboard/useDasboardDetailStore";
import { useEffect } from "react";





export const useDashboardData = (month: number, year: number) => {
  const { setTotalBalance, setTotalIncome, setTotalExpense, setTotalCategory, setTotalTransactions } =
    useDashboardDetailsStore();

  const query = useQuery<DashboardResponse>({
    queryKey: ["dashboardData", month, year],
    queryFn: () => fetchDashboardData(month, year),
    enabled: !!month && !!year,
    staleTime: 5 * 60 * 1000,
    refetchOnMount: "always"
  });

  useEffect(() => {
    if (query.data) {
      setTotalBalance(query.data?.totalBalance);
      setTotalIncome(query.data?.totalIncome);
      setTotalExpense(query.data?.totalExpense);
      setTotalCategory(query.data?.totalCategoryForCurrentProfile)
      setTotalTransactions(query.data?.totalTransactions)
    }
  }, [query.data]);

  return query;
};