import axios, { AxiosResponse } from "axios"
import { Stats, Task } from "../types/task"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

const taskService = {
  fetchTasks: async (accessToken: string): Promise<Task[]> => {
    const res: AxiosResponse<Task[]> = await API.get("/tasks", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  },
  fetchOneTask: async (id: string, accessToken: string): Promise<Task> => {
    const res: AxiosResponse<Task> = await API.get(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  },
  addTask: async (
    newTask: Partial<Task>,
    accessToken: string
  ): Promise<Task> => {
    const res: AxiosResponse<Task> = await API.post("/tasks", newTask, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  },
  updateTask: async (
    updatedTask: Partial<Task>,
    accessToken: string
  ): Promise<Task> => {
    const res: AxiosResponse<Task> = await API.put(
      `/tasks/${updatedTask._id}`,
      updatedTask,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    )
    return res.data
  },
  deleteTask: async (id: string, accessToken: string): Promise<void> => {
    await API.delete(`/tasks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
  },

  // User-specific details
  fetchUserDetails: async (
    accessToken: string
  ): Promise<{
    tasks: Task[]
    stats: Stats
    tags: string[]
  }> => {
    const res: AxiosResponse<{ tasks: Task[]; stats: Stats; tags: string[] }> =
      await API.get("/users/me/details", {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    return res.data
  },
  fetchUserStats: async (accessToken: string): Promise<Stats> => {
    const res: AxiosResponse<Stats> = await API.get("/users/me/stats", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  },
  fetchUserTags: async (accessToken: string): Promise<string[]> => {
    const res: AxiosResponse<string[]> = await API.get("/users/me/tags", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  }
}
export default taskService
