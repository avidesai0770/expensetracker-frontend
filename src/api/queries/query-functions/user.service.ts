
import type { updateProfileRequest, updateProfileResponse } from "../../../types/Profile/profile";
import { useMutation } from "@tanstack/react-query";
import { updateProfileData } from "../query-hooks/user.query";
import { toast } from "react-toastify";


export const UseProfileUpdateMutation = () => {

  return useMutation<updateProfileResponse, unknown, updateProfileRequest>({
    mutationKey: ["userLogin"],
    mutationFn: async (credentials) => await updateProfileData(credentials),
      

    onSuccess: () => {
        toast.success("Updated successful!");
    },

    onError: (error: any) => {
      console.error("error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    },
  });
};
