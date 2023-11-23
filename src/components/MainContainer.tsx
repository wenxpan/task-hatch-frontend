import React from "react"
import { Outlet, useLocation } from "react-router-dom"

interface MainContainerProps {
  isLoaded: boolean
}

const MainContainer: React.FC<MainContainerProps> = ({ isLoaded }) => {
  const location = useLocation()
  const pageTitles = [
    { url: "/home", title: "Home" },
    { url: "/tasks", title: "All tasks" },
    { url: "/new", title: "Create task" },
    { url: "/archive", title: "Archive" }
  ]

  const title = pageTitles.find((p) => p.url === location.pathname)?.title

  return (
    <>
      <main className="p-4 md:ml-64 h-auto pt-20">
        <h1 className="text-3xl font-bold mb-4 px-2 lg:px-12">{title}</h1>
        {isLoaded ? <Outlet /> : <div>Loading...</div>}
      </main>
    </>
  )
}

export default MainContainer
