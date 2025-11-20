
import axiosInstance from "../../../util/axiosConfig";




export const fetchDashboardData = async<DashboardResponse>(month: number, year: number) => {
  try {
    const { data } = await axiosInstance.get<DashboardResponse>("/dashboard",{
      params:{month,year}
    });
    return data;
  } catch (error: any) {
    console.error("Dashboard:", error);

    throw error;
  }
};