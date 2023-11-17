import { Task } from "../../types/task"

interface SetTaskAction {
  type: "set_task"
  editedTask: Task
}

interface UpdateAreaAction {
  type: "update_area"
  area:
    | "title"
    | "isCompleted"
    | "isArchived"
    | "tags"
    | "doReason"
    | "delayReason"
    | "notes"
  value: any
}

interface UpdateProgAction {
  type: "update_prog"
  protype: "edit_line" | "delete_line" | "add_line"
  obj?: Task
  value?: string
}

interface ClearTaskAction {
  type: "clear_task"
}

type EditedTaskAction =
  | SetTaskAction
  | UpdateAreaAction
  | UpdateProgAction
  | ClearTaskAction

export default function editedTaskReducer(
  editedTask: Task,
  action: EditedTaskAction
): Task {
  switch (action.type) {
    case "set_task": {
      return action.editedTask
    }

    case "update_area": {
      switch (action.area) {
        case "title": {
          return { ...editedTask, title: action.value as string }
        }
        case "isCompleted": {
          return { ...editedTask, isCompleted: action.value as boolean }
        }
        case "isArchived": {
          return { ...editedTask, isArchived: action.value as boolean }
        }
        case "tags": {
          return { ...editedTask, tags: action.value as string[] }
        }
        case "doReason": {
          return { ...editedTask, doReason: action.value as string }
        }
        case "delayReason": {
          return { ...editedTask, delayReason: action.value as string }
        }
        case "notes": {
          return { ...editedTask, notes: action.value as string }
        }
        default:
          return editedTask
      }
    }

    case "update_prog": {
      switch (action.protype) {
        case "edit_line": {
          return {
            ...editedTask,
            progress: editedTask.progress.map((prog) =>
              prog === action.obj
                ? { ...prog, description: action.value as string }
                : prog
            )
          }
        }
        case "delete_line": {
          return {
            ...editedTask,
            progress: editedTask.progress.filter((prog) => prog !== action.obj)
          }
        }
        case "add_line": {
          return {
            ...editedTask,
            progress: [...editedTask.progress, { description: "" }]
          }
        }
        default:
          return editedTask
      }
    }

    case "clear_task": {
      return { title: "" } as Task
    }

    default:
      throw new Error("Unknown action: " + action["type"])
  }
}
