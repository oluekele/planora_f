// src/lib/api.ts
import axios, { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  withCredentials: true,
});

// ✅ Response interceptor → unwrap data
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data?.message || "Something went wrong",
        status: error.response.status,
      });
    }
    if (error.request) {
      return Promise.reject({
        message: "No response from server. Please try again.",
        status: 0,
      });
    }
    return Promise.reject({
      message: error.message || "Unexpected error occurred",
      status: 0,
    });
  }
);
