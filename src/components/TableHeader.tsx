import React from "react"

interface Props {
  unarchivedTable: boolean
}

const TableHeader: React.FC<Props> = ({ unarchivedTable }) => {
  const options: string[] = ["Task", "Progress", "Options"]
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="p-4">
          {unarchivedTable && (
            <div className="flex items-center">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all" className="sr-only">
                checkbox
              </label>
            </div>
          )}
        </th>

        {options.map((o) => (
          <th className="p-4" key={o}>
            {o}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
