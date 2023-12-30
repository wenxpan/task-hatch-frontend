export interface ProgressEntry {
  date: Date | string
  description: string
}

export type TaskStatus =
  | "in progress"
  | "prioritised"
  | "completed"
  | "snoozed"
  | "archived"

// newly created task
export type BaseTask = {
  title: string
  status: TaskStatus
  tags: string[]
  doReason: string
  delayReason: string
  notes?: string
}

export type Task = BaseTask & {
  _id: string
  dateAdded: Date
  snoozeUntil: Date
  progress: ProgressEntry[]
}

export type TaskAction =
  | { type: "set_tasks"; tasks: Task[] }
  | { type: "add_task"; task: Task }
  | { type: "update_task"; task: Task }
  | { type: "delete_task"; task: Task }

export interface Stats {
  totalTasks: number
  tasksCompleted: number
  tasksToDo: number
  topTags: {
    taskCount: number
    tag: string
  }[]
}
