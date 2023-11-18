import { useEffect, useReducer, useState } from "react"
import MainContainer from "./components/MainContainer"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import * as taskService from "./services/taskService"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import NewTaskPage from "./pages/NewTaskPage"
import ArchivePage from "./pages/ArchivePage"
import TaskContext from "./state/task/TaskContext"
import { Task } from "./types/task"
import taskReducer from "./state/task/TaskReducer"
import Overlay from "./components/Overlay"

function App() {
  const [isOverlayOn, setIsOverlayOn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const toggleOverlay = (): void => {
    setIsOverlayOn((prev: boolean) => !prev)
  }

  const [tasks, taskDispatch] = useReducer(taskReducer, [] as Task[])
  useEffect(() => {
    // get all tasks and save in context
    const fetchAllTasks = async () => {
      try {
        const { data } = await taskService.fetchTasks()
        taskDispatch({ type: "set_tasks", tasks: data })
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching tasks: ", error)
      }
    }
    fetchAllTasks()
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, taskDispatch }}>
      <div className="antialiased">
        <NavBar
          title="Task Hatch"
          logo="/task-hatch-logo.png"
          toggleOverlay={toggleOverlay}
        />
        <SideBar isOverlayOn={isOverlayOn} />
        <Routes>
          <Route
            path=""
            element={
              <MainContainer
                toggleOverlay={toggleOverlay}
                isOverlayOn={isOverlayOn}
                isLoaded={isLoaded}
              />
            }
          >
            <Route path="/home" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route
              path="/new"
              element={<NewTaskPage toggleOverlay={toggleOverlay} />}
            />
            <Route path="/archive" element={<ArchivePage />} />
          </Route>
        </Routes>
      </div>
      <Overlay isOverlayOn={isOverlayOn} toggleOverlay={toggleOverlay} />
    </TaskContext.Provider>
  )
}

export default App
