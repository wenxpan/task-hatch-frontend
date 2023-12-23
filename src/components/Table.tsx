import React, { useState } from "react"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import AddSVG from "./icons/AddSVG"
import { Task } from "../types/task"
import SearchLine from "./SearchLine"
import { useModal } from "../state/ModalContext"
import CreateTask from "./CreateTask"

interface TableProps {
  tasks: Task[]
  unarchivedTable: boolean
}

const Table: React.FC<TableProps> = ({ tasks, unarchivedTable }) => {
  const [search, setSearch] = useState("")

  const filteredTasks: Task[] = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      t.notes?.toLowerCase().includes(search.toLowerCase())
  )

  const sortedTasks: Task[] = filteredTasks.sort((a, b) => {
    if (a.status === "prioritised" && b.status !== "prioritised") return -1
    else if (a.status !== "prioritised" && b.status === "prioritised") return 1
    else return 1
  })

  const { showModal, hideModal } = useModal()

  const addButtonEl = (
    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
      <button
        type="button"
        id="createModalButton"
        className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        onClick={() =>
          showModal(
            <CreateTask onComplete={hideModal} />,
            "New Task",
            true,
            "/new"
          )
        }
      >
        <AddSVG className="h-3.5 w-3.5 mr-2" />
        Add task
      </button>
    </div>
  )

  return (
    <>
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <SearchLine search={search} setSearch={setSearch} />
          {unarchivedTable && addButtonEl}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <TableHeader></TableHeader>
            <tbody>
              {sortedTasks.map((t) => (
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
