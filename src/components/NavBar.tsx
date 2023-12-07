import React from "react"
import { NavLink } from "react-router-dom"
import MenuSVG from "./icons/MenuSVG"
import NewSVG from "./icons/NewSVG"
import { useModal } from "../state/ModalContext"
import CreateTask from "./CreateTask"

// props types
interface NavBarProps {
  title: string
  logo: string
  toggleOverlay: () => void
}

const NavBar: React.FC<NavBarProps> = ({
  title = "App Title",
  logo,
  toggleOverlay
}) => {
  const { showModal, hideModal } = useModal()

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        {/* Left Section of NavBar */}
        <div className="flex justify-start items-center">
          {/* hamburger icon */}
          <button
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={toggleOverlay}
          >
            <MenuSVG />
          </button>
          {/* Logo and Title */}
          <NavLink to="/home" className="flex items-center">
            <img src={logo} className="mr-3 rounded-full h-8 w-8"></img>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {title}
            </span>
          </NavLink>
        </div>

        {/* Right Section of navbar */}
        <div className="flex items-center">
          <button
            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() =>
              showModal(
                <CreateTask onComplete={hideModal} />,
                "New task",
                true,
                "/new"
              )
            }
          >
            <NewSVG />
            <span className="ml-3 hidden md:inline">New task</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
