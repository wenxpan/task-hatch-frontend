import { Task } from "../types/task"
import { TaskAction } from "../types/task"

export default function taskReducer(tasks: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case "set_tasks": {
      return action.tasks
    }
    case "add_task": {
      return [...tasks, action.task]
    }
    case "update_task": {
      return tasks.map((t) => (t._id === action.task._id ? action.task : t))
    }
    case "delete_task": {
      return tasks.filter((t) => t._id !== action.task._id)
    }

    default:
      throw new Error("Unknown action: " + action["type"])
  }
}
