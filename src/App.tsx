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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev: boolean) => !prev)
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
        toggleSidebar={toggleSidebar}
      />
      <SideBar isSidebarOpen={isSidebarOpen} />
      <Routes>
        <Route
          path=""
          element={
            <MainContainer
              toggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
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
