import { createContext, Dispatch, useEffect, useReducer, useState } from "react"
import { Stats, Task } from "../types/task"
import { TaskAction } from "../types/task"
import taskReducer from "./taskReducer"
import taskService from "../services/taskService"
import { useAuth } from "../hooks/useAuth"

interface TaskContextType {
  tasks: Task[]
  tasksDispatch: Dispatch<TaskAction>
  tags: string[]
  setTags: (tags: string[]) => void
  stats: Stats
  isTasksLoaded: boolean
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
  },
  isTasksLoaded: false
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
  const { isAuthLoaded } = useAuth()

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        // fetch details
        const { tasks, stats, tags } = await taskService.fetchUserDetails()
        tasksDispatch({ type: "set_tasks", tasks: tasks })
        setStats(stats)
        setTags(tags)

        // set task loading state to true
        setIsTasksLoaded(true)
      } catch (error) {
        console.error("Error fetching tasks: ", error)
      }
    }
    // TODO
    if (isAuthLoaded) {
      fetchAllTasks()
    }
  }, [])

  return (
    <TaskContext.Provider
      value={{ tasks, tasksDispatch, tags, setTags, stats, isTasksLoaded }}
    >
      {children}
    </TaskContext.Provider>
  )
}
