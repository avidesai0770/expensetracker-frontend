export interface CreateCategoryRequest {
  name: string;
  type: "income" | "expense";
  color: string;   // hex color
}

export interface CategoryResponse {
  name: string;
  type: "income" | "expense";
  color: string | null;
}

export interface CategoryResponseArray {
  id: number,
  name: string,
  type: string,
  icon: string,
  color: string,
  totalTransactions:number,
  totalAmount:number
  incomeTotalAmount:number,
  incomeTotalTransactions:number

}

