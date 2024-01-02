import React from "react"
import EditSVG from "./icons/EditSVG"
import ProgressIndicator from "./ProgressIndicator"
import { Task } from "../types/task"
import ArchiveSVG from "./icons/ArchiveSVG"
import DeleteSVG from "./icons/DeleteSVG"
import { useModal } from "../hooks/useModal"
import { calculateSnoozeDaysLeft } from "../utils/calcSnoozeDaysLeft"
import StatusRowIcon from "./StatusRowIcon"
import useTasks from "../hooks/useTasks"
import Button from "./Button"
import TagGroup from "./TagGroup"

interface TableRowProps {
  task: Task
}

const TableRow: React.FC<TableRowProps> = ({ task }) => {
  const { toggleStatus } = useTasks()
  const { showViewModal, showEditModal, showDeleteModal } = useModal()

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
          onClick={() => showViewModal(task)}
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
              onClick={() => showEditModal(task)}
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
                onClick={() => showDeleteModal(task)}
              >
                Delete
              </Button>
            )}
          </div>
        </td>
        {/* progress */}
        <td
          className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap  cursor-pointer"
          onClick={() => showViewModal(task)}
        >
          <ProgressIndicator number={task.progress.length} />
        </td>
      </tr>
    </>
  )
}

export default TableRow
