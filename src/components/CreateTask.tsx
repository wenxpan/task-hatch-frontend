import React, { useContext } from "react"
import AddSVG from "./icons/AddSVG"
import { NewTask } from "../types/task"
import TaskContext from "../state/TaskContext"
import useTaskActions from "../hooks/useTaskActions"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

type CreateTaskProps = {
  onComplete: () => void
}

const CreateTask: React.FC<CreateTaskProps> = ({ onComplete }) => {
  const { createTask } = useTaskActions()
  const { tags, setTags } = useContext(TaskContext)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<NewTask>({
    defaultValues: {
      tags: []
    }
  })

  const onSubmit: SubmitHandler<NewTask> = async (data) => {
    const postedTask = await createTask(data)

    if (postedTask) {
      const newTags = postedTask.tags.filter(
        (tag: string) => !tags.includes(tag)
      )
      if (newTags.length > 0) {
        setTags([...tags, ...newTags])
      }
      onComplete()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          {/* Title field */}
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            {...register("title", { required: true })}
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
          {errors.title && <p>Title is required</p>}
        </div>
        {/* Tags field */}
        <div>
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags (separate by commas)
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                id="tags"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={field.value.join(", ")}
                onChange={(e) => field.onChange(e.target.value.split(", "))}
              />
            )}
          />
        </div>
        {/* do reason field */}
        <div>
          <label
            htmlFor="doReason"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reasons for doing it
          </label>
          <input
            {...register("doReason", { maxLength: 50 })}
            type="text"
            id="doReason"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          />
        </div>
        {/* delay reasons field */}
        <div>
          <label
            htmlFor="delayReason"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reasons for not doing it
          </label>
          <input
            {...register("delayReason", { maxLength: 50 })}
            type="text"
            id="delayReason"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            maxLength={50}
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
            {...register("notes")}
            id="notes"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <AddSVG className="h-3.5 w-3.5 mr-2" />
        Add new task
      </button>
    </form>
  )
}

export default CreateTask
