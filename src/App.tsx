import { useEffect, useReducer, useState } from "react"
import MainContainer from "./components/MainContainer"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import * as taskService from "./services/taskService"
import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import NewTaskPage from "./pages/NewTaskPage"
import ArchivePage from "./pages/ArchivePage"
import TaskContext from "./state/task/TaskContext"
import { Task } from "./types/task"
import taskReducer from "./state/task/taskReducer"
import Overlay from "./components/Overlay"
import NotFoundPage from "./pages/NotFoundPage"
import ViewTaskPage from "./pages/ViewTaskPage"
import EditTaskPage from "./pages/EditTaskPage"

function App() {
  const [isOverlayOn, setIsOverlayOn] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const toggleOverlay = (): void => {
    setIsOverlayOn((prev: boolean) => !prev)
  }

  const [tasks, tasksDispatch] = useReducer(taskReducer, [] as Task[])
  useEffect(() => {
    // get all tasks and save in context
    const fetchAllTasks = async () => {
      try {
        const { data } = await taskService.fetchTasks()
        tasksDispatch({ type: "set_tasks", tasks: data })
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching tasks: ", error)
      }
    }
    fetchAllTasks()
  }, [])

  return (
    <TaskContext.Provider value={{ tasks, tasksDispatch }}>
      <div className="antialiased">
        <NavBar
          title="Task Hatch"
          logo="/task-hatch-logo.png"
          toggleOverlay={toggleOverlay}
        />
        <SideBar isOverlayOn={isOverlayOn} />
        <Routes>
          <Route path="" element={<MainContainer isLoaded={isLoaded} />}>
            <Route index element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/tasks">
              <Route index element={<TasksPage />} />
              <Route path=":id" element={<ViewTaskPage />} />
              <Route path=":id/edit" element={<EditTaskPage />} />
            </Route>
            <Route path="/new" element={<NewTaskPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
      <Overlay isOpen={isOverlayOn} toggleOverlay={toggleOverlay} zIndex={30} />
    </TaskContext.Provider>
  )
}

export default App
