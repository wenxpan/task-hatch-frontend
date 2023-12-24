import React from "react"
import SnoozeSVG from "./icons/SnoozeSVG"
import PinLineSVG from "./icons/PinLineSVG"
import PinFillSVG from "./icons/PinFillSVG"
import TickSVG from "./icons/TickSVG"

interface Props {
  selectedStatus: string
  onSelectStatus: (status: string) => void
}

const StatusFilter: React.FC<Props> = ({ selectedStatus, onSelectStatus }) => {
  const statusOptions = [
    {
      // shows all in progress, prioritised, snoozed and completed tasks
      name: "all",
      icon: null
    },
    {
      name: "in progress",
      icon: PinLineSVG
    },
    {
      name: "prioritised",
      icon: PinFillSVG
    },
    {
      name: "snoozed",
      icon: SnoozeSVG
    },
    {
      name: "completed",
      icon: TickSVG
    }
  ]
  return (
    <>
      <div
        className="flex flex-wrap justify-start items-center p-4 border-b"
        id="status"
        role="group"
      >
        <p className="mr-3">Filter: </p>
        {statusOptions.map((option) => (
          <button
            key={option.name}
            className={`inline-flex items-center rounded-lg capitalize whitespace-nowrap px-4 py-2 mx-1 text-sm text-gray-900 font-medium hover:text-white hover:bg-gray-600 focus:z-10 focus:ring-2 focus:ring-gray-500 ${
              selectedStatus === option.name ? "text-white bg-gray-600" : ""
            }`}
            onClick={() => onSelectStatus(option.name)}
          >
            {option.icon ? <option.icon className="w-3 h-3 mr-2" /> : null}
            {option.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default StatusFilter
