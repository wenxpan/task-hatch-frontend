import { createContext, Dispatch } from "react"
import { Task } from "../types/task"
import { TaskAction } from "../types/task"

interface TaskContextType {
  tasks: Task[]
  tasksDispatch: Dispatch<TaskAction>
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  tasksDispatch: () => {}
})

export default TaskContext
