import React, { useState } from "react"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import Modal from "./Modal"
import SearchSVG from "./icons/SearchSVG"
import AddSVG from "./icons/AddSVG"
import CreateTask from "./CreateTask"
import { Task } from "../types/task"
import ViewTask from "./ViewTask"
import EditTask from "./EditTask"

interface TableProps {
  tasks: Task[]
}

const Table: React.FC<TableProps> = ({ tasks }) => {
  // state for modals
  type ModalState = {
    type: "create" | "edit" | "view" | null
    task: Task | null
  }
  // const [selectedTask, setSelectedTask] = useState<Task[]>([])
  const [modalState, setModalState] = useState<ModalState>({
    type: null,
    task: null
  })

  const openModal = (
    type: "create" | "edit" | "view",
    task: Task | null = null
  ) => {
    setModalState({ type, task })
  }

  const closeModal = () => {
    setModalState({ type: null, task: null })
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div className="w-full md:w-1/2">
            <form className="flex items-center">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <SearchSVG />
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <button
              type="button"
              id="createModalButton"
              className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              onClick={() => openModal("create")}
            >
              <AddSVG />
              Add task
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <TableHeader></TableHeader>
            <tbody>
              {tasks.map((t) => (
                <TableRow key={t._id} task={t} openModal={openModal} />
              ))}
            </tbody>
          </table>
        </div>
        <Modal
          isOpen={modalState.type === "create"}
          onClose={closeModal}
          title="Add Task"
        >
          <CreateTask />
        </Modal>
        <Modal
          isOpen={modalState.type === "view"}
          onClose={closeModal}
          title="View Task"
        >
          <ViewTask />
        </Modal>
        <Modal
          isOpen={modalState.type === "edit"}
          onClose={closeModal}
          title="Edit Task"
        >
          <EditTask />
        </Modal>
      </div>
    </>
  )
}

export default Table
