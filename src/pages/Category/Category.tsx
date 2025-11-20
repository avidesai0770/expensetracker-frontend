
import  { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/modal/modal';
import {FolderOpen, IndianRupee, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import Input from '../../components/Inputs/input';
import { CreateCategoryMutation, GetCategoryData } from '../../api/queries/query-functions/category.service';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateCategoryRequest } from '../../types/category/category';
import CategoryCard from '../../components/ui/CategoryCard/categoryCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/HoverCard/hoverCard';
import useDashboardDetailsStore from '../../Store/Dashboard/useDasboardDetailStore';


const colorOptions = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Orange", value: "#f59e0b" },
  { name: "Green", value: "#10b981" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Red", value: "#ef4444" },
  { name: "Indigo", value: "#6366f1" },
];

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  type: z.enum(["expense", "income"]),
  color: z.string().min(1, "Please select a color"),
});



const Category = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const [newCategoryType, setNewCategoryType] = useState<"expense" | "income">("expense");
  const [newCategoryColor, setNewCategoryColor] = useState("#3b82f6");


  const { mutateAsync: submit, isPending: loading } = CreateCategoryMutation()
  const { data: categories } = GetCategoryData();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<CreateCategoryRequest>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      type: "expense",
      color: "#3b82f6",

    },
  });

  const onSubmit = async (data: CreateCategoryRequest) => {
    await submit(data);
    setIsAddDialogOpen(false);
    reset();
  };

  const expenseCategories = categories?.filter(
    (category) => category.type === "expense"
  );

  const incomeCategories = categories?.filter(
    (category) => category.type === "income"
  );

  const { totalBalance } =
     useDashboardDetailsStore();

  return (
    <div className='max-w-7xl mx-auto space-y-6'>
      <div className='flex justify-between'>
        <div>
          <h1 className='font-bold text-2xl'>Categories</h1>
          <p>Organize and manage your expense and income categories</p>
        </div>
        {/* add category diaolog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <button className="bg-linear-to-r text-white flex items-center hover:border bg-green-600 border-green-600 hover:bg-green-50 hover:text-green-600 shadow-lg py-2 px-3 rounded-2xl shadow-blue-500/30">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category to organize your transactions</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 pt-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-4">
                <div className="space-y-2">

                  <label className='font-medium mb-2' htmlFor="categoryName">Category Name</label>
                  <Input
                    placeholder="e.g., Groceries"
                    {...register("name")}
                    className="h-11 w-full bg-gray-200 mt-2 rounded-xl"
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className='font-medium' htmlFor="categoryType">Type</label>
                  <div className="grid grid-cols-2 mt-2 gap-3">
                    <button
                      type="button"

                      className={`h-11 items-center justify-center bg-gray-100 border-1 border-gray-500 rounded-xl flex ${newCategoryType === "expense" ? 'bg-linear-to-r from-red-500 to-red-600' : ''}`}
                      onClick={() => {
                        setNewCategoryType("expense")
                        setValue("type", "expense")
                      }}
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Expense
                    </button>
                    <button
                      type="button"

                      className={`h-11 items-center justify-center bg-gray-100 border-1 border-gray-500 rounded-xl flex ${newCategoryType === "income" ? 'bg-linear-to-r from-green-500 to-green-600' : ''}`}
                      onClick={() => {
                        setNewCategoryType("income")
                        setValue("type", "income")
                      }}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Income
                    </button>

                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="categoryColor" className='font-medium'>Color Theme</label>
                  <div className="grid grid-cols-4 gap-3 mt-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`h-12 rounded-xl transition-all ${newCategoryColor === color.value
                          ? "ring-2 ring-offset-2 scale-105"
                          : "hover:scale-105"
                          }`}
                        style={{
                          backgroundColor: color.value,
                        }}
                        onClick={() => {
                          setNewCategoryColor(color.value)
                          setValue("color", color.value)
                        }}
                        title={color.name}
                      />
                    ))}
                    {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
                  </div>
                </div>
                <button className="w-full bg-linear-to-r text-white flex items-center justify-center hover:border bg-green-600 border-green-600 hover:bg-green-50 hover:text-green-600 shadow-md py-2 px-3 rounded-lg shadow-blue-500/30">
                  <Plus className="w-4 h-4 mr-2" />
                  {loading ? "Creating..." : "Create Category"}
                </button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-neutral-600">Total</p>
                <p className="text-neutral-900">
                  {(incomeCategories?.length ?? 0) + (expenseCategories?.length ?? 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-neutral-600">Expense</p>
                <p className="text-neutral-900">
                  {expenseCategories?.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-neutral-600">Income</p>
                <p className="text-neutral-900">
                  {incomeCategories?.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-800 border-0 text-white shadow-lg shadow-blue-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-blue-100">Net Total</p>
                <p className="text-white">
                  {totalBalance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm mt-6">
        <CardHeader className="border-b border-neutral-200/50">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <div>
              <CardTitle>Expense Categories</CardTitle>
              <CardDescription>
                Track where your money is being spent
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(expenseCategories ?? []).map((category: any) => (
              <CategoryCard
                key={category.id}
                categoryData={category}
              />
            ))}
            {expenseCategories?.length === 0 && (
              <div className="col-span-full text-center py-12 text-neutral-500">
                No expense categories yet. Add one to get
                started!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/50 shadow-sm mt-6">
        <CardHeader className="border-b border-neutral-200/50">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <CardTitle>Income Categories</CardTitle>
              <CardDescription>
                Organize your income sources
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(incomeCategories ?? []).map((category: any) => (
              <CategoryCard
                key={category.id}
                categoryData={category}
              />
            ))}
            {categories?.length === 0 && (
              <div className="col-span-full text-center py-12 text-neutral-500">
                No income categories yet. Add one to get
                started!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default Category;