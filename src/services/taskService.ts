import axios, { AxiosResponse } from "axios"
import { Stats, Task } from "../types/task"
import { useAuth } from "../hooks/useAuth"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

// add api key to header
// API.interceptors.request.use((req) => {
//   req.headers["x-api-key"] = import.meta.env.VITE_API_KEY
//   return req
// })

// add jwt token to header
API.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuth()
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const taskService = {
  fetchTasks: async (): Promise<Task[]> => {
    const res: AxiosResponse<Task[]> = await API.get("/tasks")
    return res.data
  },
  fetchOneTask: async (id: string): Promise<Task> => {
    const res: AxiosResponse<Task> = await API.get(`/tasks/${id}`)
    return res.data
  },
  addTask: async (newTask: Partial<Task>): Promise<Task> => {
    const res: AxiosResponse<Task> = await API.post("/tasks", newTask)
    return res.data
  },
  updateTask: async (updatedTask: Partial<Task>): Promise<Task> => {
    const res: AxiosResponse<Task> = await API.put(
      `/tasks/${updatedTask._id}`,
      updatedTask
    )
    return res.data
  },
  deleteTask: async (id: string): Promise<void> => {
    await API.delete(`/tasks/${id}`)
  },

  // User-specific details
  fetchUserDetails: async (): Promise<{
    tasks: Task[]
    stats: Stats
    tags: string[]
  }> => {
    const res: AxiosResponse<{ tasks: Task[]; stats: Stats; tags: string[] }> =
      await API.get("/users/me/details")
    return res.data
  },
  fetchUserStats: async (): Promise<Stats> => {
    const res: AxiosResponse<Stats> = await API.get("/users/me/stats")
    return res.data
  },
  fetchUserTags: async (): Promise<string[]> => {
    const res: AxiosResponse<string[]> = await API.get("/users/me/tags")
    return res.data
  }
}
export default taskService
