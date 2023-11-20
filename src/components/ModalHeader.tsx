import React from "react"
import CloseSVG from "./icons/CloseSVG"

interface Props {
  onClose: () => void
}

const ModalHeader: React.FC<Props> = ({ onClose }) => {
  return (
    <>
      <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Task
        </h3>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          <CloseSVG />
          <span className="sr-only">Close modal</span>
        </button>
      </div>
    </>
  )
}

export default ModalHeader
