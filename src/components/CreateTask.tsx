import React, { useContext } from "react"
import AddSVG from "./icons/AddSVG"
import { BaseTask } from "../types/task"
import TaskContext from "../state/TaskContext"
import useTaskActions from "../hooks/useTaskActions"
import { SubmitHandler, useForm } from "react-hook-form"
import TagsInput from "./TagsInput"
import Input from "./Input"
import Button from "./Button"

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
            required: "Please enter title",
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
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Notes
            <textarea
              {...register("notes")}
              id="notes"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 shadow-sm mt-1"
            ></textarea>
          </label>
        </div>
      </div>
      <Button variant="solid" icon={AddSVG} type="submit">
        Add new task
      </Button>
    </form>
  )
}

export default CreateTask
