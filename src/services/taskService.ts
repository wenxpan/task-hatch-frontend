import axios, { AxiosResponse } from "axios"
import { Task } from "../types/task"

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

API.interceptors.request.use((req) => {
  req.headers["x-api-key"] = import.meta.env.VITE_API_KEY
  return req
})

// GET: Fetch tasks
export const fetchTasks = () => API.get("/tasks")

// GET: Fetch one task
export const fetchOneTask = (id: string) => {
  API.get(`/tasks/${id}`)
}

// POST: Add a new task
export const addTask = async (newTask: Partial<Task>) => {
  const res: AxiosResponse<Task> = await API.post("/tasks", newTask)
  return res.data
}

// PUT: Update a task
export const updateTask = async (updatedTask: Partial<Task>) => {
  try {
    const res = await API.put(`/tasks/${updatedTask._id}`, updatedTask)
    return res.data
  } catch (error) {
    // Log the error and return a generic error message
    console.error("Error updating task:", error)
    throw new Error("There was a problem updating the task.")
  }
}

// DELETE: Delete a task
export const deleteTask = (id: string) => API.delete(`/tasks/${id}`)
