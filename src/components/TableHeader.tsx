import React from "react"

interface Props {}

const TableHeader: React.FC<Props> = () => {
  const options: string[] = ["Task", "Tags", "Options", "Progress"]
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="p-4"></th>
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
