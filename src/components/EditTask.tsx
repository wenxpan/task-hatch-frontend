import React from "react"
import DeleteSVG from "./icons/DeleteSVG"
import AddSVG from "./icons/AddSVG"
import { Task } from "../types/task"
import StatusRadioInput from "./StatusRadioInput"
import { useModal } from "../hooks/useModal"
import { useNavigate } from "react-router-dom"
import { handleError } from "../utils/handleError"
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import useTasks from "../hooks/useTasks"
import dayjs from "dayjs"
import Input from "./Input"
import TagsInput from "./TagsInput"
import Button from "./Button"

interface Props {
  task: Task
  onSave: () => void
  editContext: "modal" | "page"
}

const EditTask: React.FC<Props> = ({ task, onSave, editContext }) => {
  const { refreshTags, updateTask } = useTasks()
  const { hideModal, showDeleteModal } = useModal()
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
        <div className="grid gap-4 mb-4 grid-cols-1 sm:grid-cols-2">
          {/* status field */}
          <StatusRadioInput {...register("status")} />
          {/* title field */}
          <Input
            type="text"
            labelText="title"
            {...register("title", {
              required: "Please enter title",
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
          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Notes
              <textarea
                {...register("notes")}
                id="notes"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-600 focus:border-yellow-600 shadow-sm mt-1"
              ></textarea>
            </label>
          </div>
          {/* progress */}
          <div className="col-span-2">
            <label
              htmlFor="progress"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Progress
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid items-center grid-cols-1 md:grid-cols-[auto,minmax(0,1fr),auto] mb-2 gap-4"
              >
                <input
                  type="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 invalid:border-red-600 block w-full p-2.5 shadow-sm mt-1"
                  {...register(`progress.${index}.date` as const, {
                    valueAsDate: true
                  })}
                />
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2.5 shadow-sm mt-1"
                  {...register(`progress.${index}.description` as const, {
                    required: "Please enter progress"
                  })}
                />
                <Button
                  variant="dangerIcon"
                  icon={DeleteSVG}
                  onClick={() => remove(index)}
                />
                {errors.progress && (
                  <p className="row-start-2 md:col-start-2 text-red-600">
                    {errors.progress[index]?.description?.message}
                  </p>
                )}
              </div>
            ))}
            <Button
              variant="solid"
              icon={AddSVG}
              onClick={() =>
                append({
                  date: dayjs(new Date()).format("YYYY-MM-DD"),
                  description: ""
                })
              }
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="solid" type="submit">
            Update Task
          </Button>
          <Button variant="outlined" onClick={(e) => handleCancel(e)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            icon={DeleteSVG}
            onClick={() => showDeleteModal(task)}
          >
            Delete
          </Button>
        </div>
      </form>
    </>
  )
}

export default EditTask
