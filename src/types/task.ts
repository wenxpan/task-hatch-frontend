export interface ProgressEntry {
  date: Date
  description: string
}

export interface Task {
  _id: string
  title: string
  dateAdded: Date
  status: "in progress" | "prioritised" | "completed" | "snoozed" | "archived"
  doReason: string
  delayReason: string
  notes?: string
  tags: string[]
  progress: ProgressEntry[]
}

export type NewTask = Pick<
  Task,
  "title" | "tags" | "delayReason" | "doReason" | "notes"
>

export type TaskAction =
  | { type: "set_tasks"; tasks: Task[] }
  | { type: "add_task"; task: Task }
  | { type: "update_task"; task: Task }
  | { type: "delete_task"; task: Task }
// | { type: "toggle_completed"; task: Task }
// | { type: "toggle_archived"; task: Task };
