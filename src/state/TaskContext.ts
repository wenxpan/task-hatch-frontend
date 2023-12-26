import { createContext, Dispatch } from "react"
import { Stats, Task } from "../types/task"
import { TaskAction } from "../types/task"

interface TaskContextType {
  tasks: Task[]
  tasksDispatch: Dispatch<TaskAction>
  tags: string[]
  setTags: (tags: string[]) => void
  stats: Stats
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  tasksDispatch: () => {},
  tags: [],
  setTags: () => {},
  stats: {
    totalTasks: 0,
    tasksCompleted: 0,
    tasksToDo: 0,
    topTags: []
  }
})

export default TaskContext
