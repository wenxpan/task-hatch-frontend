import React from "react"
import EditSVG from "./icons/EditSVG"
import ViewSVG from "./icons/ViewSVG"
import DeleteSVG from "./icons/DeleteSVG"
import ProgressIndicator from "./ProgressIndicator"

interface TableRowProps {}

const TableRow: React.FC<TableRowProps> = () => {
  return (
    <tr>
      {/* checkbox */}
      <td className="p-4 w-4">
        <div className="flex items-center">
          <input
            id="checkbox-id"
            type="checkbox"
            className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-id" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      {/* title */}
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="flex items-center mr-3">Task Title 1</div>
      </th>
      {/* tags */}
      <td className="px-4 py-3">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
          Tag1
        </span>
      </td>
      {/* progress */}
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <ProgressIndicator number={7} />
      </td>
      {/* options */}
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            data-drawer-target="drawer-update-product"
            data-drawer-show="drawer-update-product"
            aria-controls="drawer-update-product"
            className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <EditSVG className="h-4 w-4 mr-2 -ml-0.5" />
            Edit
          </button>
          <button
            type="button"
            data-drawer-target="drawer-read-product-advanced"
            data-drawer-show="drawer-read-product-advanced"
            aria-controls="drawer-read-product-advanced"
            className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <ViewSVG className="w-4 h-4 mr-2 -ml-0.5" />
            Preview
          </button>
          <button
            type="button"
            data-modal-target="delete-modal"
            data-modal-toggle="delete-modal"
            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
          >
            <DeleteSVG className="w-4 h-4 mr-2 -ml-0.5" />
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default TableRow
