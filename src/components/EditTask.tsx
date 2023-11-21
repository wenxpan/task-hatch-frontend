import React, { useContext, useState } from "react"
import DeleteSVG from "./icons/DeleteSVG"
import AddSVG from "./icons/AddSVG"
import { Task } from "../types/task"
import TaskContext from "../state/task/TaskContext"
import { updateTask } from "../services/taskService"

interface Props {
  task: Task
  closeModal: () => void
}

const EditTask: React.FC<Props> = ({ task, closeModal }) => {
  const [editedTask, setEditedTask] = useState<Task>(task)
  const { tasksDispatch } = useContext(TaskContext)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    value: string | string[]
  ) => {
    setEditedTask({ ...editedTask, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const postedTask = await updateTask(editedTask)
      console.log(postedTask)
      tasksDispatch({ type: "update_task", task: postedTask })
      closeModal()
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  return (
    <>
      <form action="#">
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              required
              value={editedTask.title}
              onChange={(e) => handleChange(e, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={editedTask.tags.join(", ")}
              onChange={(e) => handleChange(e, e.target.value.split(", "))}
            />
          </div>
          <div>
            <label
              htmlFor="doReason"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Reasons for doing it
            </label>
            <input
              type="text"
              name="doReason"
              id="doReason"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={editedTask.doReason}
              onChange={(e) => handleChange(e, e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="delayReason"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Reasons for not doing it
            </label>
            <input
              type="text"
              name="delayReason"
              id="delayReason"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={editedTask.delayReason}
              onChange={(e) => handleChange(e, e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="notes"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              value={editedTask.notes}
              onChange={(e) => handleChange(e, e.target.value)}
            ></textarea>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="progress"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Progress
            </label>
            <button
              className="text-white inline-flex items-center bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={() => console.log("clicked")}
            >
              <AddSVG className="h-3.5 w-3.5 mr-0" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleSubmit}
          >
            Update task
          </button>
          <button className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
            <DeleteSVG className="mr-1 -ml-1 w-5 h-5" />
            Delete
          </button>
        </div>
      </form>
    </>
  )
}

export default EditTask
