import React from "react"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"

interface TableProps {}

const Table: React.FC<TableProps> = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <TableHeader></TableHeader>
        <tbody>
          <TableRow />
        </tbody>
      </table>
    </div>
  )
}

export default Table
