import React from "react"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import { Task } from "../types/task"
import TaskCard from "../components/TaskCard"

interface TableProps {
  tasks: Task[]
  children: React.ReactNode
}

const Table: React.FC<TableProps> = ({ tasks, children }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 relative lg:shadow-md sm:rounded-lg overflow-hidden">
        <div className="mb-2 bg-gray-50 lg:bg-transparent rounded-lg shadow lg:shadow-none">
          {children}
        </div>
        <div className="overflow-x-auto">
          {/* sm to lg screen - card layout */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:hidden">
            {tasks.map((t) => (
              <TaskCard key={t._id} task={t} />
            ))}
          </section>
          {/* lg screen - table layout */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 hidden lg:block">
            <TableHeader></TableHeader>
            <tbody>
              {tasks.map((t) => (
                <TableRow key={t._id} task={t} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table
