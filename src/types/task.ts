export interface Task {
  _id: string
  title: string
  dateAdded: Date
  isCompleted: boolean
  isArchived: boolean
  doReason: string
  delayReason: string
  notes?: string
  tags: string[]
  progress: {}[]
}

export type TaskAction =
  | { type: "set_tasks"; tasks: Task[] }
  | { type: "add_task"; task: Task }
  | { type: "update_task"; task: Task }
  | { type: "delete_task"; task: Task }
// | { type: "toggle_completed"; task: Task }
// | { type: "toggle_archived"; task: Task };
