import React from "react"
import EditSVG from "./icons/EditSVG"
import ProgressIndicator from "./ProgressIndicator"
import { Task } from "../types/task"
import ArchiveSVG from "./icons/ArchiveSVG"
import DeleteSVG from "./icons/DeleteSVG"
import { useModal } from "../state/ModalContext"
import ViewTask from "./ViewTask"
import EditTask from "./EditTask"
import DeleteTask from "./DeleteTask"
import { calculateSnoozeDaysLeft } from "../utils/calcSnoozeDaysLeft"
import StatusRowIcon from "./StatusRowIcon"
import useTaskActions from "../hooks/useTaskActions"
import Button from "./Button"

interface TableRowProps {
  task: Task
}

const TableRow: React.FC<TableRowProps> = ({ task }) => {
  const { toggleStatus } = useTaskActions()
  const { showModal, hideModal } = useModal()

  const handleOpenViewModal = () => {
    showModal(<ViewTask task={task} />, "Task info", true, `/tasks/${task._id}`)
  }

  const handleOpenEditModal = () => {
    showModal(
      <EditTask task={task} onSave={hideModal} editContext="modal" />,
      "Edit Task",
      true,
      `/tasks/${task._id}/edit`
    )
  }

  const handleOpenDeleteModal = () => {
    showModal(
      <DeleteTask task={task} closeModal={hideModal} />,
      "Delete Task",
      false,
      ""
    )
  }

  const snoozeDaysLeft = calculateSnoozeDaysLeft(task.snoozeUntil)

  return (
    <>
      <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
        {/* icon appearing before task */}
        <td className="p-4 w-4">
          <StatusRowIcon task={task} />
        </td>
        {/* task title */}
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-normal dark:text-white min-w-[15rem] cursor-pointer"
          onClick={handleOpenViewModal}
        >
          <div
            className={`mr-3 ${task.status === "completed" && "line-through"}`}
          >
            {task.status === "snoozed" &&
              `(Snoozed for ${snoozeDaysLeft} days) `}
            {task.title}
          </div>
        </th>
        {/* progress */}
        <td
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
          onClick={handleOpenViewModal}
        >
          <ProgressIndicator number={task.progress.length} />
        </td>
        {/* options */}
        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center space-x-4">
            {/* edit button */}
            <Button
              variant="solid"
              icon={EditSVG}
              onClick={handleOpenEditModal}
            >
              Edit
            </Button>

            {/* archive/unarchive button */}
            <Button
              variant="outlined"
              icon={ArchiveSVG}
              onClick={() => toggleStatus(task, "archived")}
            >
              {task.status === "archived" ? "Unarchive" : "Archive"}
            </Button>

            {/* delete button - only in archived table */}
            {task.status === "archived" && (
              <Button
                variant="outlined"
                icon={DeleteSVG}
                onClick={handleOpenDeleteModal}
              >
                Delete
              </Button>
            )}
          </div>
        </td>
        {/* tags */}
        <td className="px-4 py-3">
          {task.tags.map((t) => (
            <span
              className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 mx-1 rounded dark:bg-primary-900 dark:text-primary-300 whitespace-nowrap"
              key={t}
            >
              {t}
            </span>
          ))}
        </td>
      </tr>
    </>
  )
}

export default TableRow
