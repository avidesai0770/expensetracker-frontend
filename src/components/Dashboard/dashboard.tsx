import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useGetUserDetails } from "../../api/queries/query-functions/authentication.service";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/HoverCard/hoverCard";
import { ArrowBigDown, ArrowBigUp, ArrowUpRight, Calendar, CreditCard, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useDashboardData } from "../../api/queries/query-functions/dashboard.service";
import RecentTransactions from "../RecentTransactions/recentTransactions";

import DashBoardPieChart from "../PieChart/pieChart";
import DashboardBarChart from "../BarChart/barChart";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";




export default function DashBoard() {
  const [selectedMonth, setSelectedMonth] = useState<Dayjs | null>(dayjs());
  const [open, setOpen] = useState(false);

  const month = (selectedMonth?.month() ?? 0) + 1;
  const year = selectedMonth?.year() ?? dayjs().year();
  const { mutateAsync: userDetails } = useGetUserDetails();
  const { data: dashboard, isPending: isLoading } = useDashboardData(month!,year);


  useEffect(() => {
    userDetails();
  }, [])


  const { user } = useContext(AppContext)


  const datePickerRef = useRef<HTMLInputElement | null>(null);
  const lastMonthExpense = dashboard?.lastMonthTotalExpense ?? 0;
  const currentMonthExpense = dashboard?.currentMonthTotalExpense ?? 0;
  const lastMonthIncome = dashboard?.lastMonthTotalIncome ?? 0;
  const currentMonthIncome = dashboard?.currentMonthTotalIncome ?? 0;




  function lastMonthAverageCalculateIncome(current: number, last: number) {
    if (last === 0) {
      return current === 0 ? 0 : 100;
    }
    return ((current - last) / last) * 100;

  }


  function lastMonthAverageCalculateExpense(current: number, last: number) {
    if (last === 0) {
      return current === 0 ? 0 : 100;
    }
    return ((current - last) / last) * 100;

  }
  const incomeChange = lastMonthAverageCalculateIncome(currentMonthIncome, lastMonthIncome)

  const expenseChange = lastMonthAverageCalculateExpense(currentMonthExpense, lastMonthExpense)

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <div className="flex justify-between p-2">
        <div>
          <h1 className="text-neutral-900 text-2xl font-bold mb-1">Welcome back, {user?.fullName} 👋</h1>
          <p className="text-neutral-600">Here's what's happening with your finances today</p>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* Hidden input but used as anchor element */}
          <DatePicker
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            value={selectedMonth}
            onChange={(newValue) => {
              setSelectedMonth(newValue);
              setOpen(false);
            }}
            views={["year", "month"]}
            disableFuture   // ❌ user cannot pick future months
            maxDate={dayjs()} // ❌ max allowed = today’s month
            slotProps={{
              textField: {
                inputRef: datePickerRef, // 📌 anchor for popup position
                sx: { display: "none" }, // hide input
              },
              popper: {
                anchorEl: datePickerRef.current, // 📌 position under the hidden input
              },
            }}
          />

          {/* Custom UI box */}
          <div
            onClick={() => setOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/80
        backdrop-blur-sm rounded-xl border border-neutral-200/50 shadow-sm cursor-pointer"
            ref={(divEl) => {
              // Connect box to hidden input’s DOM anchor
              if (divEl && datePickerRef.current) {
                datePickerRef.current = divEl;
              }
            }}
          >
            <Calendar className="w-4 h-4 text-neutral-500" />
            <p>{selectedMonth ? selectedMonth.format("MMMM YYYY") : ""}</p>
          </div>
        </LocalizationProvider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
        <Card className="bg-gradient-to-br from-black to-green-600 border-0 text-white shadow-lg shadow-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white/90 font-medium font-medium text-xl">Total Balance</CardTitle>
            <div className="w-10 h-10 bg-green-100 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-2 font-bold">₹ {dashboard?.currentMonthTotalBalance}</div>
            <div className="flex items-center gap-1 text-blue-100">
              <ArrowBigUp className="w-4 h-4" />
              <span className="text-blue-100 font-bold">25% savings rate</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-black to-green-600 border-0 text-white shadow-lg shadow-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white/90 font-medium text-xl">Total Income</CardTitle>
            <div className="w-10 h-10 bg-green-100 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-2 font-bold">₹ {currentMonthIncome}</div>
            <div className="flex items-center gap-1 text-blue-100">
              {incomeChange > 0 ? <ArrowBigUp className="w-4 h-4" /> : <ArrowBigDown className="w-4 h-4" />}
              <span className="text-blue-100 font-bold">{incomeChange.toPrecision(4)}% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-black to-green-600 border-0 text-white shadow-lg shadow-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white/90 font-medium text-xl">Total Expenses</CardTitle>
            <div className="w-10 h-10 bg-red-50 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-800" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-2 font-bold">₹ {currentMonthExpense}</div>
            <div className="flex items-center gap-1 text-blue-100">
              {expenseChange > 0 ? <ArrowBigUp className="w-4 h-4" /> : <ArrowBigDown className="w-4 h-4" />}
              <span className="text-blue-100 font-bold">{expenseChange.toPrecision(4)}% vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-black to-green-600 border-0 text-white shadow-lg shadow-blue-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-white/90 text-xl font-medium">Transactions</CardTitle>
            <div className="w-10 h-10 bg-green-100 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-white mb-2 text-xl font-bold">{dashboard?.monthlyTotalTransactions}</div>
            <div className="flex items-center gap-1 text-blue-100">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-blue-100 font-bold">32 this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-7 gap-2 grid grid-cols-1 md:grid-cols-2 ">
        <DashboardBarChart barChartData={dashboard?.incomevsexpense ?? []} />
        <DashBoardPieChart categoryData={dashboard?.monthlyExpenseByCategory ?? []} />
      </div>
      <div className="mt-7">
        <RecentTransactions recentTransactions={dashboard?.recentTransactions ?? []} />
      </div>
    </div>
  )
}