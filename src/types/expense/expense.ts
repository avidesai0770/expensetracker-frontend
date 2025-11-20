
export interface AddExpensePayload {
    name: string,
    categoryId: number,
    amount: number,
    date: string
}

export interface ExpenseResponse
{
    name: string,
    icon: string,
    date: Date,
    categoryName: string,
    categoryId: number,
    amount: number,
}