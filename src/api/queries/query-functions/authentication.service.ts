// src/api/queries/query-functions/authentication.service.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { GetUserDetails, UserLogin, UserRegister, type GetUserDetailsResponse, type LoginRequest, type LoginResponse, type SignUpRequest, type SignUpResponse } from "../query-hooks/authentication.query";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export const UseLoginMutation = () => {
  const { setUser } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate();

  return useMutation<LoginResponse, unknown, LoginRequest>({
    mutationKey: ["userLogin"],
    mutationFn: async (credentials) => await UserLogin(credentials),


    onSuccess: (response) => {

      if (response?.token) {
        localStorage.setItem("token", response.token);

        if (response?.user) {
          setUser(response.user as any);
        }
        navigate("/dashboard");
        queryClient.invalidateQueries({ queryKey: ["dashboardData"] });
        toast.success("Login successful!");
      } else {
        toast.error(response?.message || "Login failed");
      }
    },

    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    },
  });
};


export const UseRegistrationMutation = () => {

  const navigate = useNavigate();

  return useMutation<SignUpResponse, unknown, SignUpRequest>({
    mutationKey: ["userLogin"],
    mutationFn: async (credentials) => await UserRegister(credentials),

    onSuccess: () => {
      toast.success("Registration successful!");
      navigate("/login");
    },

    onError: (error: any) => {
      console.error("Sign Up error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");
    },
  });
};


export const useGetUserDetails = () => {
  const { setUser } = useContext(AppContext)
  return useMutation<GetUserDetailsResponse, unknown, void>({
    mutationKey: ["fetchUserDetails"],
    mutationFn: GetUserDetails,

    onSuccess: (response) => {
      setUser(response as any)
      // navigate("/dashboard"); // optional redirect
    },

    onError: (error: any) => {
      console.error("GetUserDetails error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong. Please try again.");

    },
  });
};



export default { UseLoginMutation, UseRegistrationMutation, useGetUserDetails };
