import React from "react"
import DeleteSVG from "./icons/DeleteSVG"
import CloseSVG from "./icons/CloseSVG"

interface Props {}

const DeleteTask: React.FC<Props> = () => {
  return (
    <>
      <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          type="button"
          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
        >
          <CloseSVG />
          <span className="sr-only">Close modal</span>
        </button>
        <DeleteSVG />
        <p className="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-center items-center space-x-4">
          <button
            data-modal-toggle="deleteModal"
            type="button"
            className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            type="submit"
            className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </>
  )
}

export default DeleteTask
