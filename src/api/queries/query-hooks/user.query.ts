import type { updateProfileRequest, updateProfileResponse } from "../../../types/Profile/profile";
import axiosInstance from "../../../util/axiosConfig";

export const updateProfileData = async (
  request: updateProfileRequest
): Promise<updateProfileResponse> => {
  try {
    const { data } = await axiosInstance.put<updateProfileResponse>(
      "/updateprofile",
      request, 
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("api data", data);
    return data;
  } catch (error: any) {
    const backendMsg = error?.response?.data?.message || "Something went wrong.";
    throw new Error(backendMsg);
  }
};
