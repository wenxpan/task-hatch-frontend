import axios from "axios"

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
export const addTask = (newTask: {}) => API.post("/tasks", newTask)

// PUT: Update a task
export const updateTask = (id: string, updatedTask: {}) =>
  API.put(`/tasks/${id}`, updatedTask)

// DELETE: Delete a task
export const deleteTask = (id: string) => API.delete(`/tasks/${id}`)
