import React from "react"
import { Task } from "../types/task"

interface Props {
  task: Task
}

const ViewTask: React.FC<Props> = ({ task }) => {
  if (!task.tags.length && !task.doReason && !task.delayReason && !task.notes) {
    return <div>No info</div>
  }
  return (
    <>
      {!!task.tags.length && (
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Tags
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {task.tags.join(", ")}
          </dd>
        </dl>
      )}
      {task.doReason && (
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Reasons for doing it
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {task.doReason}
          </dd>
        </dl>
      )}
      {task.delayReason && (
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Reasons for not doing it now
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {task.delayReason}
          </dd>
        </dl>
      )}
      {task.notes && (
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Notes
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {task.notes}
          </dd>
        </dl>
      )}
    </>
  )
}

export default ViewTask
