
import axiosInstance from "../../../util/axiosConfig";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  fullName: string;
  email: string;
  password: string;
}
export interface SignUpResponse {
  fullName?: string;
  email?: string;
}

export interface GetUserDetailsRequest {
  token?: string
}


export interface GetUserDetailsResponse {
  fullName?: string;
  email?: string;
}

export interface LoginResponse {
  token?: string;
  user?: Record<string, any>;
  message?: string;
}

export const UserLogin = async (request: LoginRequest): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>("/login", request);
    return data;
  } catch (error: any) {
    throw error;
  }
};


export const UserRegister = async (request: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const { data } = await axiosInstance.post<SignUpResponse>("/register", request);
    return data;
  } catch (error: any) {
    console.error("Login API Error:", error);
    // Return a safe fallback error object
    throw error;
  }
};


export const GetUserDetails = async (): Promise<GetUserDetailsResponse> => {
  try {
    const { data } = await axiosInstance.get<GetUserDetailsResponse>("/profile");
    return data;
  } catch (error: any) {
    console.error("Login API Error:", error);

    throw error;
  }
};