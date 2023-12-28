import React, { useContext, useState } from "react"
import AddSVG from "./icons/AddSVG"
import { NewTask } from "../types/task"
import { addTask } from "../services/taskService"
import TaskContext from "../state/TaskContext"
import { toast } from "react-toastify"

type CreateTaskProps = {
  onComplete: () => void
}

const CreateTask: React.FC<CreateTaskProps> = ({ onComplete }) => {
  const { tasksDispatch, tags, setTags } = useContext(TaskContext)
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    tags: [],
    delayReason: "",
    doReason: "",
    notes: ""
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    value: string | string[]
  ) => {
    setNewTask({ ...newTask, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const postedTask = await addTask(newTask)
      tasksDispatch({ type: "add_task", task: postedTask })
      // check if tags state needs to be updated
      const newTags = postedTask.tags.filter(
        (tag: string) => !tags.includes(tag)
      )
      if (newTags.length > 0) {
        setTags([...tags, ...newTags])
      }
      onComplete()
    } catch (e) {
      console.error((e as Error).message)
      toast.error("Task creation failed.")
    }
  }

  return (
    <form action="#">
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
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
            value={newTask.title}
            onChange={(e) => handleChange(e, e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags (separate by commas)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            value={newTask.tags.join(", ")}
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
            maxLength={50}
            value={newTask.doReason}
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
            maxLength={50}
            value={newTask.delayReason}
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
            value={newTask.notes}
            onChange={(e) => handleChange(e, e.target.value)}
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        onClick={(e) => handleSubmit(e)}
      >
        <AddSVG className="h-3.5 w-3.5 mr-2" />
        Add new task
      </button>
    </form>
  )
}

export default CreateTask
