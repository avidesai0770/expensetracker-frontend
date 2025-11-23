import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { RecentTransaction } from "../../types/DashBoard/dashboard"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/HoverCard/hoverCard"


interface RecentTransactionsProps {
    recentTransactions: RecentTransaction[];
}

const RecentTransactions = ({ recentTransactions }: RecentTransactionsProps) => {
    
    return (
        <div>
            <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Transactions</CardTitle>
                            <p className="text-neutral-500 mt-1">Your latest financial activity</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">View all</button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentTransactions && recentTransactions.length > 0 ? (
                            recentTransactions.map((transaction: any) => (
                                <div
                                    key={transaction.id}
                                    className="flex items-center justify-between p-4 rounded-xl border border-neutral-200/50 hover:bg-neutral-50/50 transition-all hover:shadow-sm group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
                    ${transaction.type === 'INCOME'
                                                ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30'
                                                : 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30'
                                            }
                  `}>
                                            {transaction.type === 'INCOME'
                                                ? <ArrowUpRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                                                : <ArrowDownRight className="w-5 h-5 text-white" strokeWidth={2.5} />
                                            }
                                        </div>
                                        <div>
                                            <p className="text-neutral-900">{transaction.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-neutral-500">{transaction.categoryName}</span>
                                                <span className="text-neutral-400">•</span>
                                                <span className="text-neutral-500">{transaction.date}</span>
                                                <span className="text-neutral-400">•</span>
                                                {/* <span className="text-neutral-500">{transaction.time}</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`
                  ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}
                `}>
                                        {transaction.type === 'INCOME' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                                    </div>
                                </div>
                            )
                            )) : <p className="text-neutral-500 text-center py-4">No recent transactions found.</p>}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default RecentTransactions