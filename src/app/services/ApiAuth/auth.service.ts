import axios from "axios";
import { ApiManager } from "../ApiManager/ApiManager";
import { ApiResponse } from "../interfaces/ApiResponse";

export const userLogin = async (email: string, password: string): Promise<ApiResponse<unknown>> => {
  if (!email || !password) {
    return {
      isSuccess: false,
      displayMessage: "Email o contraseña vacíos",
      errorMessages: ["Email o contraseña vacíos"],
      result: null,
      status: 400
    };
  }

  try {
    const response = await ApiManager.post(
      "/auth/login",
      { email, password },
      { withCredentials: false }
    );

    return {
      isSuccess: true,
      displayMessage: "Login exitoso",
      errorMessages: [],
      result: response?.data?.result?.token,
      status: response.status
    };
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      return {
        isSuccess: false,
        displayMessage: error.response?.data?.message ?? "Unknown error",
        errorMessages: [error.response?.data?.message ?? "Unknown error"],
        result: null,
        status: error.response?.status ?? 500,
      };
    }
    return {
      isSuccess: false,
      displayMessage: "Unexpected error",
      errorMessages: ["Unexpected error"],
      result: null,
      status: 500,
    };
  }
};

export const refreshAccessToken = async (refreshToken: string): Promise<ApiResponse<unknown>> => {
  if (!refreshToken) {
    return {
      isSuccess: false,
      displayMessage: "Sin token",
      errorMessages: ["El token no es valido."],
      result: null,
      status: 400
    };
  }

  try {
    const response = await ApiManager.post(
      "/auth/refresh",
      { refreshToken },
      { withCredentials: false }
    );

    return {
      isSuccess: true,
      displayMessage: "Se authentico correctamente.",
      errorMessages: [],
      result: response.data.result.token,
      status: response.status
    };
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      return {
        isSuccess: false,
        displayMessage: error.response?.data?.message ?? "Unknown error",
        errorMessages: [error.response?.data?.message ?? "Unknown error"],
        result: null,
        status: error.response?.status ?? 500,
      };
    }
    return {
      isSuccess: false,
      displayMessage: "Unexpected error",
      errorMessages: ["Unexpected error"],
      result: null,
      status: 500,
    };
  }
};

export const resetPassword = async (data: {userId: string; token: string; newPassword: string;}): Promise<ApiResponse<unknown>> => {
  if (!data.userId || !data.token || !data.newPassword) {
    return {
      isSuccess: false,
      displayMessage: "Datos incompletos",
      errorMessages: ["userId, token o password vacíos"],
      result: null,
      status: 400
    };
  }

  try {
    const response = await ApiManager.post("/auth/reset-password", data, { withCredentials: false });

    return {
      isSuccess: true,
      displayMessage: "Contraseña actualizada correctamente",
      errorMessages: [],
      result: response.data.result,
      status: response.status
    };
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      return {
        isSuccess: false,
        displayMessage: error.response?.data?.message ?? "Unknown error",
        errorMessages: [error.response?.data?.message ?? "Unknown error"],
        result: null,
        status: error.response?.status ?? 500,
      };
    }
    return {
      isSuccess: false,
      displayMessage: "Unexpected error",
      errorMessages: ["Unexpected error"],
      result: null,
      status: 500,
    };
  }
};