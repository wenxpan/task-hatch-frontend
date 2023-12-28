import { useContext } from "react"
import TaskContext from "../state/TaskContext"
import { NewTask, Task } from "../types/task"
import { addTask, updateTask } from "../services/taskService"
import { handleError } from "../utils/handleError"

const useTaskActions = () => {
  const { tasksDispatch } = useContext(TaskContext)

  const createTask = async (task: NewTask) => {
    try {
      const newTask = await addTask(task)
      tasksDispatch({ type: "add_task", task: newTask })
      return newTask
    } catch (e) {
      handleError(e as Error, "Error creating task")
    }
  }

  // update task status
  const updateStatus = async (task: Task, status: {}) => {
    try {
      const updatedTask = await updateTask({ ...task, ...status })
      tasksDispatch({
        type: "update_task",
        task: updatedTask
      })
    } catch (e) {
      handleError(e as Error)
    }
  }

  // Toggles task status between given status and 'in progress'
  const toggleStatus = async (task: Task, status: string) => {
    const newStatus = task.status === status ? "in progress" : status
    await updateStatus(task, { status: newStatus })
  }

  // Additional functionalities

  return { createTask, updateStatus, toggleStatus }
}

export default useTaskActions
