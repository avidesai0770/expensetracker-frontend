import type { CategoryResponse, CategoryResponseArray, CreateCategoryRequest } from "../../../types/category/category";
import axiosInstance from "../../../util/axiosConfig";




export const CreateCategory = async (request: CreateCategoryRequest): Promise<CategoryResponse> => {
  try {
    const { data } = await axiosInstance.post<CategoryResponse>("/categories", request);
    return data;
  } catch (error: any) {
    const backendMsg = error?.response?.data?.message || "Something went wrong.";
    throw new Error(backendMsg);
  }
};

export const fetchCategoryData = async() => {
  try {
    const { data } = await axiosInstance.get<CategoryResponseArray[]>("/categories");
    console.log('data on query', data);
    return data;
  } catch (error: any) {
    const backendMsg = error?.response?.data?.message || "Something went wrong.";
    throw new Error(backendMsg);
  }
};
