import React from "react"
import DeleteSVG from "./icons/DeleteSVG"
import AddSVG from "./icons/AddSVG"
import { Task } from "../types/task"
import StatusRadioInput from "./StatusRadioInput"
import { useModal } from "../state/ModalContext"
import { useNavigate } from "react-router-dom"
import { handleError } from "../utils/handleError"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import useTaskActions from "../hooks/useTaskActions"
import dayjs from "dayjs"
import Input from "./Input"
import TagsInput from "./TagsInput"

interface Props {
  task: Task
  onSave: () => void
  editContext: "modal" | "page"
}

const EditTask: React.FC<Props> = ({ task, onSave, editContext }) => {
  const { refreshTags, updateTask } = useTaskActions()
  const { hideModal } = useModal()
  const nav = useNavigate()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...task,
      progress: task.progress.map((item) => ({
        ...item,
        date: dayjs(item.date).format("YYYY-MM-DD")
      }))
    } as Task
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "progress"
  })

  const onSubmit: SubmitHandler<Task> = async (data) => {
    try {
      const postedTask = await updateTask(data)
      if (postedTask) {
        refreshTags(task, postedTask)
      }
      onSave()
    } catch (e) {
      handleError(e as Error)
    }
  }

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault()
    if (editContext === "modal") {
      hideModal()
    } else if (editContext === "page") {
      nav(`/tasks/${task._id}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          {/* status field */}
          <StatusRadioInput {...register("status")} />
          {/* title field */}
          <Input
            type="text"
            labelText="title"
            {...register("title", {
              required: { value: true, message: "Please enter title" },
              maxLength: { value: 50, message: "Title too long" }
            })}
            error={errors.title?.message}
          />
          {/* tags field */}
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
          {/* progress */}
          <div className="sm:col-span-2">
            <label
              htmlFor="progress"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Progress
            </label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center mb-2 gap-4">
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register(`progress.${index}.date` as const, {
                    valueAsDate: true
                  })}
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register(`progress.${index}.description` as const)}
                />
                <button
                  type="button"
                  className="text-red-400 hover:text-red-600"
                  onClick={() => remove(index)}
                >
                  <DeleteSVG />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-white inline-flex items-center bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() =>
                append({
                  date: dayjs(new Date()).format("YYYY-MM-DD"),
                  description: ""
                })
              }
            >
              <AddSVG className="h-3.5 w-3.5 mr-0" />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update task
          </button>
          <button
            className="text-primary-800 border border-primary-700 hover:bg-primary-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
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
