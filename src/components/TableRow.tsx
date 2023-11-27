import React, { useContext } from "react"
import EditSVG from "./icons/EditSVG"
import ViewSVG from "./icons/ViewSVG"
import ProgressIndicator from "./ProgressIndicator"
import { Task } from "../types/task"
import ArchiveSVG from "./icons/ArchiveSVG"
import { updateTask } from "../services/taskService"
import TaskContext from "../state/task/TaskContext"
import DeleteSVG from "./icons/DeleteSVG"
import PinLineSVG from "./icons/pinLineSVG"
import PinFillSVG from "./icons/PinFillSVG"

interface TableRowProps {
  task: Task
  openModal: (
    type: "create" | "edit" | "view" | "delete",
    task: Task | null
  ) => void
}

const TableRow: React.FC<TableRowProps> = ({ task, openModal }) => {
  const { tasksDispatch } = useContext(TaskContext)

  // TODO: make two toggle dry
  const toggleArchive = async (task: Task) => {
    const toggledTask = { ...task, isArchived: !task.isArchived }
    const updatedTask = await updateTask(toggledTask)
    tasksDispatch({
      type: "update_task",
      task: updatedTask
    })
  }

  const togglePinned = async (task: Task) => {
    try {
      const toggledTask = { ...task, isPinned: !task.isPinned }
      const updatedTask = await updateTask(toggledTask)
      tasksDispatch({
        type: "update_task",
        task: updatedTask
      })
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  return (
    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      {/* pin */}
      <td className="p-4 w-4">
        <button onClick={() => togglePinned(task)}>
          {task.isPinned ? (
            <PinFillSVG className="h-5 w-5 cursor-pointer hover:text-amber-400" />
          ) : (
            <PinLineSVG className="h-5 w-5 cursor-pointer hover:text-amber-400" />
          )}
        </button>
      </td>
      {/* title */}
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-normal dark:text-white min-w-[15rem]"
      >
        <div className="mr-3">{task.title}</div>
      </th>
      {/* tags */}
      {/* <td className="px-4 py-3">
        {task.tags.map((t) => (
          <span
            className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 mx-1 rounded dark:bg-primary-900 dark:text-primary-300 whitespace-nowrap"
            key={t}
          >
            {t}
          </span>
        ))}
      </td> */}
      {/* progress */}
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <ProgressIndicator number={task.progress.length} />
      </td>
      {/* options */}
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={() => openModal("edit", task)}
          >
            <EditSVG className="h-4 w-4 mr-2 -ml-0.5" />
            Edit
          </button>
          <button
            type="button"
            className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => openModal("view", task)}
          >
            <ViewSVG className="w-4 h-4 mr-2 -ml-0.5" />
            View
          </button>
          <button
            type="button"
            className="flex items-center text-amber-700 hover:text-white border border-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-amber-500 dark:text-amber-500 dark:hover:text-white dark:hover:bg-amber-600 dark:focus:ring-amber-900"
            onClick={() => toggleArchive(task)}
          >
            <ArchiveSVG className="h-4 w-4 mr-2 -ml-0.5 hover:fill-white" />
            {task.isArchived ? "Unarchive" : "Archive"}
          </button>
          {task.isArchived && (
            <button
              type="button"
              className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              onClick={() => openModal("delete", task)}
            >
              <DeleteSVG className="h-4 w-4 mr-2 -ml-0.5" />
              Delete
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

export default TableRow
