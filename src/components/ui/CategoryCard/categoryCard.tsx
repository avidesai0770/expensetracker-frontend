
import { Button } from '../Button/button'
import { Edit2, Trash2, TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '../Badge/badge'
import type { CategoryResponseArray } from '../../../types/category/category';
import useDashboardDetailsStore from '../../../Store/Dashboard/useDasboardDetailStore';



interface categoryCardProps {
    categoryData: CategoryResponseArray;
}




const CategoryCard = ({ categoryData }: categoryCardProps) => {



    return (
        <div className='p-5 border border-neutral-200/50 rounded-xl hover:shadow-md transition-all hover:scale-[1.02] bg-white/80 backdrop-blur-sm group'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex gap-2 items-center'>
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: `${categoryData?.color}20` }}
                    >{
                            categoryData?.type === "expense" ? (
                                <TrendingDown style={{ color: categoryData?.color }} className="w-6 h-6" strokeWidth={2} />
                            )
                                : (<TrendingUp style={{ color: categoryData?.color }} className="w-6 h-6" strokeWidth={2} />)
                        }

                    </div>
                    <div>
                        <p className="text-neutral-900">{categoryData?.name}</p>
                        <Badge variant="secondary" style={{
                            backgroundColor: `${categoryData?.color}15`,
                            color: categoryData?.color,
                            border: "none",
                        }} className="mt-1" >{categoryData?.type}</Badge>
                    </div>
                </div>
                <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <Button
                        variant="ghost"
                        size="sm"

                        className="h-8 w-8 p-0"
                    >
                        <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"

                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
            {categoryData?.type === "expense" && <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div>
                    <p className="text-neutral-500">{categoryData?.totalTransactions} transactions</p>
                </div>
                <div className="text-right">
                    <p className="text-neutral-900">₹{categoryData?.totalAmount}</p>
                </div>
            </div>}
            {categoryData?.type === "income" && <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <div>
                    <p className="text-neutral-500">{categoryData?.incomeTotalTransactions} transactions</p>
                </div>
                <div className="text-right">
                    <p className="text-neutral-900">₹{categoryData?.incomeTotalAmount}</p>
                </div>
            </div>}

        </div>
    )
}

export default CategoryCard