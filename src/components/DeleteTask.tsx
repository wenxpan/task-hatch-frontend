import React, { useContext } from "react"
import DeleteSVG from "./icons/DeleteSVG"
import { Task } from "../types/task"
import TaskContext from "../state/task/TaskContext"
import { deleteTask } from "../services/taskService"

interface Props {
  closeModal: () => void
  task: Task
}

const DeleteTask: React.FC<Props> = ({ closeModal, task }) => {
  const { tasksDispatch } = useContext(TaskContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await deleteTask(task._id)
      tasksDispatch({ type: "delete_task", task: task })
      closeModal()
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  return (
    <>
      <DeleteSVG className="mx-auto mb-4 w-14 h-14 " />
      <p className="mb-4 text-center">
        Are you sure you want to delete task:{" "}
        <span className="italic font-semibold">{task.title}</span>?
      </p>
      <div className="flex justify-center items-center space-x-4">
        <button
          type="button"
          className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={closeModal}
        >
          No, cancel
        </button>
        <button
          type="submit"
          className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={handleSubmit}
        >
          Yes, I'm sure
        </button>
      </div>
    </>
  )
}

export default DeleteTask
