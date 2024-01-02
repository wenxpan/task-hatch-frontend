import { createContext, Dispatch, useReducer, useState } from "react"
import { Stats, Task } from "../types/task"
import { TaskAction } from "../types/task"
import taskReducer from "./taskReducer"
// import taskService from "../services/taskService"
// import { useAuth } from "../hooks/useAuth"

interface TaskContextType {
  tasks: Task[]
  tasksDispatch: Dispatch<TaskAction>
  tags: string[]
  stats: Stats
  isTasksLoaded: boolean
  setIsTasksLoaded: (isTasksLoaded: boolean) => void
  setDetails: (data: { tasks?: Task[]; stats?: Stats; tags?: string[] }) => void
}

const TaskContext = createContext<TaskContextType>({
  tasks: [],
  tasksDispatch: () => {},
  tags: [],
  stats: {
    totalTasks: 0,
    tasksCompleted: 0,
    tasksToDo: 0,
    topTags: []
  },
  isTasksLoaded: false,
  setIsTasksLoaded: () => {},
  setDetails: () => {}
})

export default TaskContext

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [tasks, tasksDispatch] = useReducer(taskReducer, [])
  const [tags, setTags] = useState<string[]>([])
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    tasksCompleted: 0,
    tasksToDo: 0,
    topTags: []
  })
  const [isTasksLoaded, setIsTasksLoaded] = useState(false)

  const setDetails = async (data: {
    tasks?: Task[]
    stats?: Stats
    tags?: string[]
  }) => {
    data.tasks && tasksDispatch({ type: "set_tasks", tasks: data.tasks })
    data.stats && setStats(data.stats)
    data.tags && setTags(data.tags)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        tasksDispatch,
        tags,
        stats,
        isTasksLoaded,
        setIsTasksLoaded,
        setDetails
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
