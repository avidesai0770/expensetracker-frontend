
import type { CategoryResponse, CategoryResponseArray, CreateCategoryRequest } from "../../../types/category/category";
import { CreateCategory, fetchCategoryData } from "../query-hooks/category.query";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const CreateCategoryMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<CategoryResponse, unknown, CreateCategoryRequest>({
    mutationKey: ["createCategory"],
    mutationFn: async (data: any) => await CreateCategory(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchCategoryData"] });
      toast.success("Category added successful!");
    },

    onError: (error: any) => {
      console.error("error:", error);
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });
};


export const GetCategoryData = () => {
  return useQuery<CategoryResponseArray[]>({
    queryKey: ["fetchCategoryData"],
    queryFn: fetchCategoryData,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });
};