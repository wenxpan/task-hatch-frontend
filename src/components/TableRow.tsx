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
import TagGroup from "./TagGroup"

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
      <tr className="border-b hover:bg-gray-100  ">
        {/* icon appearing before task */}
        <td className="p-4 w-4">
          <StatusRowIcon task={task} />
        </td>
        {/* task title */}
        <th
          scope="row"
          className="px-4 py-3 font-medium text-gray-900 whitespace-normal  min-w-[15rem] cursor-pointer"
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
        {/* tags */}
        <td className="px-4 py-3">
          <TagGroup tags={task.tags} />
        </td>
        {/* options */}
        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
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
                variant="danger"
                icon={DeleteSVG}
                onClick={handleOpenDeleteModal}
              >
                Delete
              </Button>
            )}
          </div>
        </td>
        {/* progress */}
        <td
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap  cursor-pointer"
          onClick={handleOpenViewModal}
        >
          <ProgressIndicator number={task.progress.length} />
        </td>
      </tr>
    </>
  )
}

export default TableRow
