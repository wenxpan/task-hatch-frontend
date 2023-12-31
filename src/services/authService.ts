import axios, { AxiosResponse } from "axios"
import { AuthResult, RegisterUserEntry } from "../types/user"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export const authService = {
  loginUser: async (credentials: {
    email: string
    password: string
  }): Promise<AuthResult> => {
    const res: AxiosResponse<AuthResult> = await API.post(
      "/auth/login",
      credentials,
      { withCredentials: true }
    )
    return res.data
  },
  registerUser: async (userData: RegisterUserEntry): Promise<AuthResult> => {
    const res: AxiosResponse<AuthResult> = await API.post(
      "/auth/register",
      userData,
      { withCredentials: true }
    )
    return res.data
  },
  refreshToken: async (): Promise<AuthResult> => {
    const res: AxiosResponse<AuthResult> = await API.post(
      "/auth/refresh_token",
      {},
      { withCredentials: true }
    )
    return res.data
  },
  logoutUser: async (): Promise<void> => {
    await API.post("/auth/logout", {}, { withCredentials: true })
  }
}
