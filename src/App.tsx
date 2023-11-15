import { useState } from "react"
import MainContainer from "./components/MainContainer"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = (): void => {
    setIsSidebarOpen((prev: boolean) => !prev)
  }

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <NavBar
        title="Task Hatch"
        logo="/task-hatch-logo.png"
        toggleSidebar={toggleSidebar}
      />
      <SideBar isSidebarOpen={isSidebarOpen} />
      <MainContainer
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  )
}

export default App
