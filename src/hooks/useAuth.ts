import { useContext } from "react"
import AuthContext from "../state/AuthContext"
import { authService } from "../services/authService"
import { handleError } from "../utils/handleError"
import { RegisterUserEntry } from "../types/user"
import { toast } from "react-toastify"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  const { isAuthLoaded, accessToken, user, setTokenUser, clearTokenUser } =
    context

  const loginUser = async (credentials: {
    email: string
    password: string
  }) => {
    try {
      const { accessToken, user } = await authService.loginUser(credentials)
      setTokenUser(accessToken, user)
    } catch (e) {
      handleError(e as Error)
    }
  }

  const logoutUser = async () => {
    try {
      await authService.logoutUser()
      clearTokenUser()
    } catch (e) {
      handleError(e as Error)
    }
  }

  const registerUser = async (credentials: RegisterUserEntry) => {
    try {
      const { accessToken, user } = await authService.registerUser(credentials)
      setTokenUser(accessToken, user)
      toast.success("account created!")
    } catch (e) {
      handleError(e as Error)
    }
  }

  return {
    isAuthLoaded,
    accessToken,
    user,
    setTokenUser,
    clearTokenUser,
    loginUser,
    logoutUser,
    registerUser
  }
}
