import React, { useContext, useState } from "react"
import { Task, TaskStatus } from "../types/task"
import StatusGroup from "./StatusGroup"
import TaskContext from "../state/TaskContext"
import { updateTask } from "../services/taskService"
import { useModal } from "../state/ModalContext"
import EditSVG from "./icons/EditSVG"
import EditTask from "./EditTask"
import { handleError } from "../utils/handleError"

interface Props {
  task: Task
}

const ViewTask: React.FC<Props> = ({ task }) => {
  const { tasksDispatch } = useContext(TaskContext)

  const [status, setStatus] = useState(task.status)

  const { hideModal, showModal } = useModal()

  const handleChangeStatus = async (newStatus: TaskStatus) => {
    try {
      const updatedTask = {
        ...task,
        status: newStatus
      }
      const newTask = await updateTask(updatedTask)
      tasksDispatch({ type: "update_task", task: newTask })
      setStatus(newStatus)
    } catch (e) {
      handleError(e as Error)
    }
  }

  const handleEditTask = () => {
    showModal(
      <EditTask task={task} onSave={hideModal} editContext="modal" />,
      "Edit Task",
      true,
      `/tasks/${task._id}/edit`
    )
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">{task.title}</h1>
      <dl className="grid grid-cols-2 gap-4 my-4">
        <div className="col-span-2 place-self-start">
          <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Status
          </h2>
          <StatusGroup status={status} onChangeStatus={handleChangeStatus} />
        </div>
        {/* tags */}
        <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700  dark:border-gray-600">
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Tags
          </dt>
          <dd className="flex items-center text-gray-500 dark:text-gray-400">
            {task.tags.map((t) => (
              <span
                className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 mx-1 rounded dark:bg-primary-900 dark:text-primary-300 whitespace-nowrap"
                key={t}
              >
                {t}
              </span>
            ))}
          </dd>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 col-span-2 sm:col-span-1">
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Reasons for doing it
          </dt>
          <dd className="text-gray-500 dark:text-gray-400">{task.doReason}</dd>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 col-span-2 sm:col-span-1">
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Reasons for not doing it now
          </dt>
          <dd className="mb-4 text-gray-500 sm:mb-5 dark:text-gray-400">
            {task.delayReason}
          </dd>
        </div>

        <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Notes
          </dt>
          <dd className="mb-4 text-gray-500 sm:mb-5 dark:text-gray-400">
            {task.notes}
          </dd>
        </div>

        <>
          <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700  dark:border-gray-600">
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Progress
            </dt>
            <dd className=" text-gray-500 dark:text-gray-400">
              {task.progress.map((p, index) => (
                <p key={index}>
                  {p.date.toString().slice(0, 10)}: {p.description}
                </p>
              ))}
            </dd>
          </div>
        </>

        <div className="flex justify-between items-center col-span-2">
          <button
            type="button"
            className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={handleEditTask}
          >
            <EditSVG className="h-4 w-4 mr-2 -ml-0.5" />
            Edit
          </button>
          <p>Date Added: {task.dateAdded.toString().slice(0, 10)}</p>
        </div>
      </dl>
    </>
  )
}

export default ViewTask
