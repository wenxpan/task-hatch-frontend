import React from "react"
import { NavLink } from "react-router-dom"
import HomeSVG from "./icons/HomeSVG"
import TasksSVG from "./icons/TasksSVG"
import ArchiveSVG from "./icons/ArchiveSVG"

interface SideBarProps {
  isOverlayOn: boolean
}

const SideBar: React.FC<SideBarProps> = ({ isOverlayOn }) => {
  const svgClass =
    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
  const navItems = [
    {
      name: "Home",
      link: "/home",
      svg: <HomeSVG className={svgClass} />
    },
    // {
    //   name: "New",
    //   link: "/new",
    //   svg: <NewSVG className={svgClass} />
    // },
    {
      name: "Tasks",
      link: "/tasks",
      svg: <TasksSVG className={svgClass} />
    },
    {
      name: "Archive",
      link: "/archive",
      svg: <ArchiveSVG className={svgClass} />
    }
  ]

  return (
    <aside
      className={`${
        isOverlayOn ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        {/* sidebar content here */}
        {/* Navigation Links */}
        <ul className="space-y-2">
          {/* Each list item represents a navigation link or a group */}
          {navItems.map((n) => (
            <li key={n.name}>
              {/* Link or Button for the navigation */}
              <NavLink
                to={n.link}
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {/* Icon and Text Here */}
                {n.svg}
                <span className="ml-3">{n.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Other sidebar content */}
        {/* <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <BookmarkSVG />
              <span className="ml-3">Tag 1</span>
            </a>
          </li>
        </ul> */}
      </div>

      {/* Fixed bottom content */}
      {/* <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
      </div> */}
    </aside>
  )
}

export default SideBar
