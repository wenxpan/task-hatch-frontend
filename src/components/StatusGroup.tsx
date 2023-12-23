import React, { useContext, useState } from "react"
import ArchiveSVG from "./icons/ArchiveSVG"
import TickSVG from "./icons/TickSVG"
import PinLineSVG from "./icons/PinLineSVG"
import PinFillSVG from "./icons/PinFillSVG"
import SnoozeSVG from "./icons/SnoozeSVG"
import TaskContext from "../state/TaskContext"
import { Task, TaskStatus } from "../types/task"
import { updateTask } from "../services/taskService"

interface StatusGroupProps {
  task: Task
}

interface StatusButtonProps {
  name: TaskStatus
  color: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const StatusGroup: React.FC<StatusGroupProps> = ({ task }) => {
  const { tasksDispatch } = useContext(TaskContext)

  const [status, setStatus] = useState(task.status)

  const onChangeStatus = async (newStatus: TaskStatus) => {
    setStatus(newStatus)
    const updatedTask = { ...task, status: newStatus }
    const newTask = await updateTask(updatedTask)
    tasksDispatch({ type: "update_task", task: newTask })
  }

  const statusOptions = [
    {
      name: "archived",
      color: "bg-amber-800 hover:bg-amber-800",
      icon: ArchiveSVG
    },
    {
      name: "snoozed",
      color: "bg-gray-600",
      icon: SnoozeSVG
    },
    {
      name: "in progress",
      color: "bg-blue-600",
      icon: PinLineSVG
    },
    {
      name: "prioritised",
      color: "bg-yellow-600",
      icon: PinFillSVG
    },
    {
      name: "completed",
      color: "bg-green-600",
      icon: TickSVG
    }
  ].map((option) => ({
    ...option,
    name: option.name as TaskStatus
  }))

  const StatusButton: React.FC<StatusButtonProps> = ({ name, color, Icon }) => {
    const isSelected = status === name
    const baseStyles =
      "inline-flex items-center rounded-lg whitespace-nowrap px-4 py-2 text-sm font-medium hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500"
    const buttonStyles = `${baseStyles} ${
      isSelected ? `text-white ${color}` : "text-gray-900"
    }  hover:${color}`

    return (
      <button
        type="button"
        className={buttonStyles}
        onClick={() => onChangeStatus(name)}
      >
        <Icon className="w-3 h-3 mr-2" />
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </button>
    )
  }

  return (
    <>
      <div
        className="flex rounded-lg border flex-wrap col-span-2 justify-between"
        role="group"
      >
        {statusOptions.map((option) => (
          <StatusButton
            key={option.name}
            name={option.name}
            color={option.color}
            Icon={option.icon}
          />
        ))}
      </div>
    </>
  )
}

export default StatusGroup
