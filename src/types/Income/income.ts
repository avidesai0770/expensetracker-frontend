
export interface AddIncomePayload {
    name: string,
    categoryId: number,
    amount: number,
    date: string
}

export interface IncomeResponse
{
    name: string,
    icon: string,
    date: Date,
    categoryName: string,
    categoryId: number,
    amount: number,
}