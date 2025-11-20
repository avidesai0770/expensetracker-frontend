
import { Card, CardContent, CardHeader, CardTitle } from '../ui/HoverCard/hoverCard'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { IncomeVsExpense } from '../../types/DashBoard/dashboard';


interface barChartDataProps {
    barChartData: IncomeVsExpense[];
}

const DashboardBarChart = ({ barChartData }: barChartDataProps) => {


    return (
        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Income vs Expenses</CardTitle>
                        <p className="text-neutral-500 mt-1">Last 6 months overview</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-neutral-600">Income</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-neutral-600">Expenses</span>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData && barChartData.length > 0 ? barChartData : []} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" stroke='#e5e7eb' vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="#9ca3af"
                            tick={{ fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            stroke="#9ca3af"
                            tick={{ fill: '#6b7280' }}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                        />
                        <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />

                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default DashboardBarChart 