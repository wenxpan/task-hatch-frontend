import { useEffect, useState } from "react"
import MainContainer from "./components/MainContainer"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import * as taskService from "./services/taskService"
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import NewTaskPage from "./pages/NewTaskPage"
import ArchivePage from "./pages/ArchivePage"

function App() {
  const [isOverlayOn, setIsOverlayOn] = useState(false)

  const toggleOverlay = (): void => {
    setIsOverlayOn((prev: boolean) => !prev)
  }

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const { data } = await taskService.fetchTasks()
        console.log(data)
      } catch (error) {
        console.error("Error fetching tasks: ", error)
      }
    }
    fetchAllTasks()
  }, [])

  return (
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
            />
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/new" element={<NewTaskPage />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
