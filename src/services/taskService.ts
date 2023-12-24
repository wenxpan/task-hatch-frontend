import axios, { AxiosResponse } from "axios"
import { Task } from "../types/task"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

API.interceptors.request.use((req) => {
  req.headers["x-api-key"] = import.meta.env.VITE_API_KEY
  return req
})

// GET: Fetch tasks
export const fetchTasks = async () => {
  const res = await API.get("/tasks")
  return res.data
}

// GET: Fetch unique tags
export const fetchTags = async () => {
  const res: AxiosResponse<string[]> = await API.get("/tags")
  return res.data
}

// GET: Fetch one task
export const fetchOneTask = async (id: string) => {
  const res: AxiosResponse<Task> = await API.get(`/tasks/${id}`)
  return res.data
}

// POST: Add a new task
export const addTask = async (newTask: Partial<Task>) => {
  try {
    const res: AxiosResponse<Task> = await API.post("/tasks", newTask)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Log the error and throw the specific error message from the API
      console.error("Error updating task:", error.response.data)
      throw new Error(
        error.response.data.error || "There was a problem updating the task."
      )
    } else {
      // Handle non-Axios errors
      console.error("Error updating task:", error)
      throw new Error("There was a problem updating the task.")
    }
  }
}

// PUT: Update a task
export const updateTask = async (updatedTask: Partial<Task>) => {
  try {
    const res = await API.put(`/tasks/${updatedTask._id}`, updatedTask)
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Log the error and throw the specific error message from the API
      console.error("Error updating task:", error.response.data)
      throw new Error(
        error.response.data.error || "There was a problem updating the task."
      )
    } else {
      // Handle non-Axios errors
      console.error("Error updating task:", error)
      throw new Error("There was a problem updating the task.")
    }
  }
}

// DELETE: Delete a task
export const deleteTask = (id: string) => API.delete(`/tasks/${id}`)
