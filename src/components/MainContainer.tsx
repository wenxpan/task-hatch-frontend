import React from "react"
import { Outlet } from "react-router-dom"
import Overlay from "./Overlay"

// props types
interface MainContainerProps {
  toggleOverlay: () => void
  isOverlayOn: boolean
  isLoaded: boolean
}

const MainContainer: React.FC<MainContainerProps> = ({
  toggleOverlay,
  isOverlayOn,
  isLoaded
}) => {
  return (
    <>
      <main className="p-4 md:ml-64 h-auto pt-20">
        {isLoaded ? <Outlet /> : <div>Loading...</div>}
      </main>
      <Overlay isOpen={isOverlayOn} toggleOverlay={toggleOverlay} zIndex={30} />
    </>
  )
}

export default MainContainer
