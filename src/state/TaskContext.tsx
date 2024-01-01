import { createContext, Dispatch, useEffect, useReducer, useState } from "react"
import { Stats, Task } from "../types/task"
import { TaskAction } from "../types/task"
import taskReducer from "./taskReducer"
import * as taskService from "../services/taskService"

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

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        // fetch tasks
        const taskData: Task[] = await taskService.fetchTasksAPI()
        tasksDispatch({ type: "set_tasks", tasks: taskData })

        // fetch tags
        const tagData = await taskService.fetchTagsAPI()
        setTags(tagData)

        // fetch stats
        const statsData = await taskService.fetchStatsAPI()
        setStats(statsData)

        // set task loading state to true
        setIsTasksLoaded(true)
      } catch (error) {
        console.error("Error fetching tasks: ", error)
      }
    }
    fetchAllTasks()
  }, [])

  return (
    <TaskContext.Provider
      value={{ tasks, tasksDispatch, tags, setTags, stats, isTasksLoaded }}
    >
      {children}
    </TaskContext.Provider>
  )
}
