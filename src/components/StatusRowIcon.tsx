import React from "react"
import PinFillSVG from "./icons/PinFillSVG"
import PinLineSVG from "./icons/PinLineSVG"
import SnoozeSVG from "./icons/SnoozeSVG"
import TickSVG from "./icons/TickSVG"
import { Task } from "../types/task"
import useTasks from "../hooks/useTasks"

interface StatusButtonsProps {
  task: Task
}

const StatusRowIcon: React.FC<StatusButtonsProps> = ({ task }) => {
  const { toggleStatus } = useTasks()
  return (
    <>
      <button onClick={() => toggleStatus(task, "prioritised")}>
        {task.status === "prioritised" && (
          <PinFillSVG className="h-5 w-5 cursor-pointer text-amber-400 hover:text-gray-600" />
        )}
      </button>
      <button onClick={() => toggleStatus(task, "prioritised")}>
        {task.status === "in progress" && (
          <PinLineSVG className="h-5 w-5 cursor-pointer hover:text-amber-400" />
        )}
      </button>
      {task.status === "snoozed" && (
        <button onClick={() => toggleStatus(task, "snoozed")}>
          <SnoozeSVG className="h-5 w-5 cursor-pointer hover:text-amber-400" />
        </button>
      )}
      {task.status === "completed" && (
        <button onClick={() => toggleStatus(task, "completed")}>
          <TickSVG className="h-5 w-5 cursor-pointer hover:text-amber-400" />
        </button>
      )}
    </>
  )
}

export default StatusRowIcon
