import React from "react"
import ArchiveSVG from "./icons/ArchiveSVG"
import TickSVG from "./icons/TickSVG"
import PinLineSVG from "./icons/PinLineSVG"
import PinFillSVG from "./icons/PinFillSVG"
import SnoozeSVG from "./icons/SnoozeSVG"

interface StatusRadioInputProps {
  action?: React.ReactNode
  disabled?: boolean
  error?: string | boolean | null
}

const StatusRadioInput = React.forwardRef<
  HTMLInputElement,
  StatusRadioInputProps
>(function StatusRadioInput({ action, disabled, error, ...rest }, ref) {
  const statusOptions = [
    {
      name: "archived",
      color: "peer-checked:bg-amber-800 hover:bg-amber-800",
      icon: ArchiveSVG
    },
    {
      name: "snoozed",
      color: "peer-checked:bg-gray-600 hover:bg-gray-600",
      icon: SnoozeSVG
    },
    {
      name: "in progress",
      color: "peer-checked:bg-blue-600 hover:bg-blue-600",
      icon: PinLineSVG
    },
    {
      name: "prioritised",
      color: "peer-checked:bg-yellow-600 hover:bg-yellow-600",
      icon: PinFillSVG
    },
    {
      name: "completed",
      color: "peer-checked:bg-green-600 hover:bg-green-600",
      icon: TickSVG
    }
  ]

  return (
    <>
      <div className="col-span-2 place-self-start">
        <label className="mb-2 font-semibold leading-none text-gray-900">
          Status
          <div
            className="flex rounded-lg border flex-wrap justify-start"
            role="group"
          >
            {statusOptions.map((option) => (
              <>
                <div className="flex items-center" key={option.name}>
                  <input
                    {...rest}
                    ref={ref}
                    type="radio"
                    id={option.name}
                    value={option.name}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 checked:bg-blue-200 peer hidden"
                  />
                  <label
                    htmlFor={option.name}
                    className={`cursor-pointer inline-flex items-center rounded-lg capitalize whitespace-nowrap px-4 py-2 text-sm font-medium hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 ${option.color} peer-checked:text-white`}
                  >
                    <option.icon className="h-4 w-4" />
                    {option.name}
                  </label>
                </div>
              </>
            ))}
          </div>
        </label>
      </div>
    </>
  )
})

export default StatusRadioInput
