import React, { useContext } from "react"
import AddSVG from "./icons/AddSVG"
import { BaseTask } from "../types/task"
import TaskContext from "../state/TaskContext"
import useTaskActions from "../hooks/useTaskActions"
import { SubmitHandler, useForm } from "react-hook-form"
import TagsInput from "./TagsInput"
import Input from "./Input"

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
  } = useForm<BaseTask>({ defaultValues: { tags: [] } })

  const onSubmit: SubmitHandler<BaseTask> = async (data) => {
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
        {/* Title field */}
        <Input
          type="text"
          labelText="title"
          {...register("title", {
            required: { value: true, message: "Please enter title" },
            maxLength: { value: 50, message: "Title too long" }
          })}
          error={errors.title?.message}
        />
        {/* Tags field */}
        <TagsInput control={control} name="tags" />
        {/* do reason */}
        <Input
          type="text"
          labelText="Reasons for doing it"
          {...register("doReason", {
            maxLength: { value: 50, message: "Reason too long" }
          })}
          error={errors.doReason?.message}
        />
        {/* delay reason */}
        <Input
          type="text"
          labelText="Reasons for not doing it now"
          {...register("delayReason", {
            maxLength: { value: 50, message: "Reason too long" }
          })}
          error={errors.delayReason?.message}
        />
        {/* notes */}
        <div className="sm:col-span-2">
          <label
            htmlFor="notes"
            className="block mb-2 text-sm font-medium text-gray-900"
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
