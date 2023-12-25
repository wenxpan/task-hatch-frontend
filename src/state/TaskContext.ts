import { createContext, Dispatch } from "react"
import { Task } from "../types/task"
import { TaskAction } from "../types/task"

interface TaskContextType {
  tasks: Task[]
  tasksDispatch: Dispatch<TaskAction>
  tags: string[]
  setTags: (tags: string[]) => void
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  tasksDispatch: () => {},
  tags: [],
  setTags: () => {}
})

export default TaskContext
