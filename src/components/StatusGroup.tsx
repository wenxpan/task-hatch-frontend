import React from "react"
import ArchiveSVG from "./icons/ArchiveSVG"
import TickSVG from "./icons/TickSVG"
import PinLineSVG from "./icons/PinLineSVG"
import PinFillSVG from "./icons/PinFillSVG"
import SnoozeSVG from "./icons/SnoozeSVG"
import { TaskStatus } from "../types/task"
import StatusButton from "./StatusButton"

interface StatusGroupProps {
  status: TaskStatus
  onChangeStatus: (newStatus: TaskStatus) => void
}

const StatusGroup: React.FC<StatusGroupProps> = ({
  status,
  onChangeStatus
}) => {
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

  return (
    <>
      <div
        className="flex rounded-lg border flex-wrap justify-start"
        id="status"
        role="group"
      >
        {statusOptions.map((option) => (
          <StatusButton
            key={option.name}
            currentStatus={status}
            name={option.name}
            color={option.color}
            Icon={option.icon}
            onChangeStatus={onChangeStatus}
          />
        ))}
      </div>
    </>
  )
}

export default StatusGroup
