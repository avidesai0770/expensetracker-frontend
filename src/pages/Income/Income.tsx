import { CalendarIcon, Check, Tag, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/HoverCard/hoverCard";
import Input from "../../components/Inputs/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/DropDrown/dropDown";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "../../components/ui/Button/button";
import { GetCategoryData } from "../../api/queries/query-functions/category.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import { cn } from "../../util/util";
import UserAddIncomeMutation from "../../api/queries/query-functions/income.service";
import useDashboardDetailsStore from "../../Store/Dashboard/useDasboardDetailStore";


export const addIncomeSchema = z.object({
    name: z.string().min(1, "Income name is required"),
    amount: z.number().positive("Amount must be greater than zero"),
    categoryId: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required"),
});
export type AddIncomePayload = z.infer<typeof addIncomeSchema>;

const Income = () => {
    const { data: categories } = GetCategoryData();
    const { mutateAsync: addIncome, isPending: loading } = UserAddIncomeMutation()

 const { totalIncome,totalBalance } =
     useDashboardDetailsStore();
    const expenseCategories = categories?.filter(
        (category) => category.type === "income"
    );
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AddIncomePayload>({
        resolver: zodResolver(addIncomeSchema),
        defaultValues: {
            name: "",
            amount: 0,
            categoryId: "",
            date: "",
        },
    });


    const onSubmit = async (data: AddIncomePayload) => {
        console.log("Submitted expense:", data);
        const incomePayload = {
            name: data?.name,
            amount: data?.amount,
            categoryId: Number(data?.categoryId),
            date: data?.date
        }

        await addIncome(incomePayload)
        reset
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-neutral-900">Add New Income</h1>
                </div>
                <p className="text-neutral-600">Record your income and track your earnings</p>
            </div>
            <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-lg">
                <CardHeader className="border-b border-neutral-200/50">
                    <CardTitle>Income Details</CardTitle>
                    <CardDescription>Fill in the information about your income transaction</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        {/* Amount */}
                        <div className="space-y-2">
                            <Input
                                label="Income Name"
                                type="text"
                                placeholder="Enter your expense title"
                                error={errors?.name?.message}
                                {...register("name")}
                            />

                        </div>
                        <div className="space-y-2">
                            <Input
                                id="amount"
                                type="number"
                                label="Amount"
                                step="0.01"
                                placeholder="0"
                                error={errors?.amount?.message}
                                {...register("amount", { valueAsNumber: true })}
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label htmlFor="category" className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-neutral-500" />
                                Category *
                            </label>

                            <Select
                                onValueChange={(value) => setValue("categoryId", value, { shouldValidate: true })}
                            >
                                <SelectTrigger id="category" className={cn(
                                    "h-12 bg-white border-neutral-200",
                                    errors.categoryId && "border-red-500 focus:border-red-500"
                                )}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {expenseCategories?.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id.toString()}>
                                            <span>{cat.name}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {errors.categoryId && (
                                <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4 text-neutral-500" />
                                Date *
                            </label>

                            <div
                                className={cn(
                                    "rounded-md",
                                    errors.date && "border border-red-500"
                                )}
                            >
                                <DatePicker
                                    className="w-full py-1"
                                    onChange={(v: any) => {
                                        const dateStr = v ? v.format("YYYY-MM-DD") : "";
                                        setValue("date", dateStr, { shouldValidate: true });
                                    }}
                                />
                            </div>

                            {errors.date && (
                                <p className="text-red-500 text-sm">{errors.date.message}</p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1 h-12 bg-linear-to-r text-white flex items-center hover:border bg-green-600 border-green-600 hover:bg-green-50 hover:text-green-600 shadow-lg py-2 px-3">
                                <Check className="w-5 h-5 mr-2" />
                                {loading ? '...loading' : 'Add Income'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => reset()}
                                className="bg-linear-to-r flex-1 h-12 text-black flex items-center hover:border bg-white-600 border-green-600 hover:bg-green-50 hover:text-green-600 shadow-lg py-2 px-3 "
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="grid grid-cols-1  md:grid-cols-3 gap-4">
                <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-lg">
                    <CardContent className="p-5 space-y-2">
                        <p>This Month</p>
                        <p className="font-bold">₹</p>
                        <p className="text-gray-500 font-medium">8 transactions</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-lg">
                    <CardContent className="p-5 space-y-2">
                        <p>Total balance</p>
                        <p className="font-bold"></p>
                        <p className="text-gray-500 font-medium">₹{totalBalance}</p>
                    </CardContent>
                </Card>
                <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-lg">
                    <CardContent className="p-5 space-y-2">
                        <p className="text-gray-500 font-medium">Primary Source</p>
                        <p className="font-bold">Salary</p>
                        <p className="text-gray-500 font-medium">₹{totalIncome} earned</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Income;