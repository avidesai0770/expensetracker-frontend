
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/HoverCard/hoverCard"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { MonthlyExpenseByCategory } from "../../types/DashBoard/dashboard";

interface categoryDataProps {
  categoryData: MonthlyExpenseByCategory[];
}



const DashBoardPieChart = ({ categoryData }: categoryDataProps) => {
  console.log('cate', categoryData);

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
      <CardHeader className="flex flex-col items-start  pb-2">
        <CardTitle className="text-black text-xl font-medium">Spending by Category
        </CardTitle>
        <CardDescription>
          This month breakdown
        </CardDescription>

      </CardHeader>
      <CardContent>
        {categoryData && categoryData.length > 0 ? (
          <>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    dataKey="totalAmount"
                    nameKey="categoryName"
                    paddingAngle={2}
                    label
                  >
                    {categoryData.map((item, index) => (
                      <Cell key={index} fill={item?.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((entry, index) => (
                <div key={entry.categoryName} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry?.color }}
                    />
                    <h4 className="text-neutral-700 font-bold">{entry.categoryName.toUpperCase()}</h4>
                  </div>
                  <h4 className="text-neutral-900 font-medium">{entry.totalAmount}</h4>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card >
  )
}

export default DashBoardPieChart;