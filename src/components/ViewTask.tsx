import React from "react"
import { Task } from "../types/task"
import { useModal } from "../state/ModalContext"
import EditSVG from "./icons/EditSVG"
import TagGroup from "./TagGroup"
import Button from "./Button"
import { useForm } from "react-hook-form"
import useTaskActions from "../hooks/useTaskActions"
import StatusRadioInput from "./StatusRadioInput"
import { handleError } from "../utils/handleError"

interface Props {
  task: Task
}

const ViewTask: React.FC<Props> = ({ task }) => {
  const { showEditModal } = useModal()

  const { updateStatus } = useTaskActions()

  const { register } = useForm({
    defaultValues: {
      ...task,
      status: task.status
    } as Task
  })

  const onStatusChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await updateStatus(task, { status: e.target.value })
    } catch (e) {
      handleError(e as Error)
    }
  }

  return (
    <form>
      <h1 className="text-2xl font-semibold mb-4">{task.title}</h1>
      <dl className="grid grid-cols-2 gap-4 my-4">
        <div className="col-span-2 place-self-start">
          <h2 className="mb-2 font-semibold leading-none text-gray-900 ">
            Status
          </h2>
          <StatusRadioInput
            {...register("status")}
            onChange={(e) => onStatusChange(e)}
          />
        </div>
        {/* tags */}
        <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <dt className="mb-2 font-semibold leading-none text-gray-900 ">
            Tags
          </dt>
          <dd className="flex items-center text-gray-500">
            <TagGroup tags={task.tags} />
          </dd>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
          <dt className="mb-2 font-semibold leading-none text-gray-900 ">
            Reasons for doing it
          </dt>
          <dd className="text-gray-500">{task.doReason}</dd>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
          <dt className="mb-2 font-semibold leading-none text-gray-900 ">
            Reasons for not doing it now
          </dt>
          <dd className="mb-4 text-gray-500 sm:mb-5">{task.delayReason}</dd>
        </div>

        <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <dt className="mb-2 font-semibold leading-none text-gray-900 ">
            Notes
          </dt>
          <dd className="mb-4 text-gray-500 sm:mb-5">{task.notes}</dd>
        </div>

        <>
          <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <dt className="mb-2 font-semibold leading-none text-gray-900 ">
              Progress
            </dt>
            <dd className=" text-gray-500">
              {task.progress.map((p, index) => (
                <p key={index}>
                  {p.date.toString().slice(0, 10)}: {p.description}
                </p>
              ))}
            </dd>
          </div>
        </>

        <div className="flex justify-between items-center col-span-2">
          <Button
            variant="solid"
            type="button"
            icon={EditSVG}
            onClick={() => showEditModal(task)}
          >
            Edit
          </Button>
          <p>Date Added: {task.dateAdded.toString().slice(0, 10)}</p>
        </div>
      </dl>
    </form>
  )
}

export default ViewTask
