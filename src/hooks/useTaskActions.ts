import { useContext } from "react"
import TaskContext from "../state/TaskContext"
import { NewTask, Task } from "../types/task"
import {
  addTaskAPI,
  fetchTagsAPI,
  updateTaskAPI
} from "../services/taskService"
import { handleError } from "../utils/handleError"

const useTaskActions = () => {
  const { tasksDispatch, setTags } = useContext(TaskContext)

  // create task and send POST task request
  const createTask = async (task: NewTask) => {
    try {
      const newTask = await addTaskAPI(task)
      tasksDispatch({ type: "add_task", task: newTask })
      return newTask
    } catch (e) {
      handleError(e as Error, "Error creating task")
    }
  }

  // update task and send PUT task request
  const updateTask = async (task: NewTask) => {
    try {
      const postedTask: Task = await updateTaskAPI({
        ...task
      })
      tasksDispatch({ type: "update_task", task: postedTask })
      return postedTask
    } catch (e) {
      handleError(e as Error, "Error creating task")
    }
  }

  // update task status
  const updateStatus = async (task: Task, status: {}) => {
    try {
      const updatedTask = await updateTaskAPI({ ...task, ...status })
      tasksDispatch({
        type: "update_task",
        task: updatedTask
      })
    } catch (e) {
      handleError(e as Error)
    }
  }

  // update tags in sidebar
  const refreshTags = async (oldTask: Task, newTask: Task) => {
    try {
      const tagsUpdated =
        !newTask.tags.every((t) => oldTask.tags.includes(t)) ||
        !oldTask.tags.every((t) => newTask.tags.includes(t))
      if (tagsUpdated) {
        const tagData = await fetchTagsAPI()
        setTags(tagData)
      }
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

  return { createTask, updateTask, updateStatus, toggleStatus, refreshTags }
}

export default useTaskActions
