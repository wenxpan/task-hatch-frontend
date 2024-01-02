import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import HomeSVG from "./icons/HomeSVG"
import TasksSVG from "./icons/TasksSVG"
import ArchiveSVG from "./icons/ArchiveSVG"
import BookmarkLineSVG from "./icons/BookmarkLineSVG"
import AccordianSVG from "./icons/AccordianSVG"
import useTasks from "../hooks/useTasks"

interface SideBarProps {
  isOverlayOn: boolean
}

const SideBar: React.FC<SideBarProps> = ({ isOverlayOn }) => {
  const { tags } = useTasks()
  const svgClass =
    "flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
  const navItems = [
    {
      name: "Home",
      link: "/home",
      svg: <HomeSVG className={svgClass} />
    },
    {
      name: "Tasks",
      link: "/tasks",
      svg: <TasksSVG className={svgClass} />
    }
    // {
    //   name: "Archive",
    //   link: "/archive",
    //   svg: <ArchiveSVG className={svgClass} />
    // }
  ]

  const [sidebarTags, setSidebarTags] = useState(tags)

  // update sidebar tags when tags refreshed
  useEffect(() => {
    setSidebarTags((prev) => (prev.length ? tags : []))
  }, [tags])

  const toggleTagList = () => {
    setSidebarTags((prev) => (prev === tags ? [] : tags))
  }

  return (
    <aside
      className={`${
        isOverlayOn ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 md:translate-x-0`}
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white ">
        {/* sidebar content */}
        <ul className="space-y-2">
          {/* Navigation Links: Home and tasks */}
          {navItems.map((n) => (
            <li key={n.name}>
              <NavLink
                to={n.link}
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100 group"
              >
                {/* Icon and Text */}
                {n.svg}
                <span className="ml-3">{n.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Second sidebar content */}
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 ">
          <li>
            <button
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100   w-full"
              onClick={toggleTagList}
            >
              <AccordianSVG
                className={`${svgClass} h-2 ${
                  sidebarTags.length ? "rotate-180" : "rotate-90"
                }`}
              />
              <span className="ml-3">Tags</span>
            </button>
          </li>
          {sidebarTags.map((t) => (
            <li key={t}>
              <NavLink
                to={`/tasks?tag=${t}`}
                className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100   group"
              >
                <BookmarkLineSVG className={svgClass} />
                <span className="ml-3">{t}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 ">
          <li key={"archive"}>
            <NavLink
              to={"/archive"}
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100   group"
            >
              <ArchiveSVG className={svgClass} />
              <span className="ml-3">Archive</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Fixed bottom content */}
      {/* <div className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white  z-20">
        settings
      </div> */}
    </aside>
  )
}

export default SideBar
