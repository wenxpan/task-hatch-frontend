import React from "react"
import ShuffleSVG from "./icons/ShuffleSVG"

interface Props {
  title: string
  doReason: string
}

const RandomTaskCard: React.FC<Props> = ({ title, doReason }) => {
  return (
    <div className="p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <button className="hover:bg-gray-100 rounded-md flex mb-2 p-1">
        <ShuffleSVG />
        Shuffle
      </button>
      <div>
        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </div>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {doReason}
      </p>
      <a
        href="#"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
      </a>
    </div>
  )
}

export default RandomTaskCard
