import { useContext } from "react"
import TaskContext from "../state/TaskContext"
import { Task } from "../types/task"
import { updateTask } from "../services/taskService"
import { handleError } from "../utils/handleError"

const useTaskActions = () => {
  const { tasksDispatch } = useContext(TaskContext)

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

  return { updateStatus, toggleStatus }
}

export default useTaskActions
