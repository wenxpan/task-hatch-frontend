import React from "react"
import { TaskStatus } from "../types/task"

interface StatusButtonProps {
  name: TaskStatus
  currentStatus: TaskStatus
  color: string
  Icon: React.FC<React.SVGProps<SVGSVGElement>>
  onChangeStatus: (newStatus: TaskStatus) => void
}

const StatusButton: React.FC<StatusButtonProps> = ({
  currentStatus,
  name,
  color,
  Icon,
  onChangeStatus
}) => {
  const isSelected = currentStatus === name
  const baseStyles =
    "inline-flex items-center rounded-lg capitalize whitespace-nowrap px-4 py-2 text-sm font-medium hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500"
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
      {name}
    </button>
  )
}

export default StatusButton
