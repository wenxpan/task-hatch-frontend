import { useContext } from "react"
import TaskContext from "../state/TaskContext"
import taskService from "../services/taskService"
import { BaseTask, Task } from "../types/task"
import { handleError } from "../utils/handleError"
import cleanTags from "../utils/cleanTags"
import { toast } from "react-toastify"

const useTasks = () => {
  const { tasks, tasksDispatch, tags, setTags, stats, isTasksLoaded } =
    useContext(TaskContext)

  // create task and send POST task request
  const createTask = async (task: BaseTask) => {
    try {
      const newTask = { ...task, tags: cleanTags(task.tags) }
      const postedTask = await taskService.addTask(newTask)
      tasksDispatch({ type: "add_task", task: postedTask })
      return newTask
    } catch (e) {
      handleError(e as Error, "Error creating task")
    }
  }

  // update task and send PUT task request
  const updateTask = async (task: BaseTask) => {
    try {
      const newTask = { ...task, tags: cleanTags(task.tags) }
      const postedTask: Task = await taskService.updateTask(newTask)
      tasksDispatch({ type: "update_task", task: postedTask })
      return postedTask
    } catch (e) {
      handleError(e as Error, "Error creating task")
    }
  }

  const deleteTask = async (task: Task) => {
    try {
      await taskService.deleteTask(task._id)
      tasksDispatch({ type: "delete_task", task: task })
      toast.success(`"${task.title}" deleted`)
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  // update task status
  const updateStatus = async (task: Task, status: {}) => {
    try {
      const updatedTask = await taskService.updateTask({ ...task, ...status })
      tasksDispatch({
        type: "update_task",
        task: updatedTask
      })
      return updatedTask
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
        const tagData = await taskService.fetchUserTags()
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

  return {
    tasks,
    tasksDispatch,
    tags,
    setTags,
    stats,
    isTasksLoaded,
    createTask,
    updateTask,
    deleteTask,
    updateStatus,
    toggleStatus,
    refreshTags
  }
}

export default useTasks
