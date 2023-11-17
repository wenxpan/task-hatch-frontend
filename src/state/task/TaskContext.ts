import { createContext, Dispatch } from "react"
import { Task } from "../../types/task"
import { TaskAction } from "../../types/task"

interface TaskContextType {
  task: Task[]
  taskDispatch: Dispatch<TaskAction>
}

const TaskContext = createContext<TaskContextType>({
  task: [],
  taskDispatch: () => {}
})

export default TaskContext
