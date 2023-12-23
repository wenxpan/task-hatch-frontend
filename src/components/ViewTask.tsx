import React from "react"
import { Task } from "../types/task"

interface Props {
  task: Task
}

const ViewTask: React.FC<Props> = ({ task }) => {
  // if (!task.tags.length && !task.doReason && !task.delayReason && !task.notes) {
  //   return <div>No info</div>
  // }
  return (
    <>
      <h1 className="text-xl font-semibold mb-3">{task.title}</h1>

      <dl className="grid grid-cols-2 gap-4 mb-4">
        {!!task.tags.length && (
          <>
            <div className="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700  dark:border-gray-600">
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
          </>
        )}
        {task.doReason && (
          <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 col-span-2 sm:col-span-1">
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Reasons for doing it
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">
              {task.doReason}
            </dd>
          </div>
        )}
        {task.delayReason && (
          <div className="p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 col-span-2 sm:col-span-1">
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Reasons for not doing it now
            </dt>
            <dd className="mb-4 text-gray-500 sm:mb-5 dark:text-gray-400">
              {task.delayReason}
            </dd>
          </div>
        )}
        {task.notes && (
          <div className="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
              Notes
            </dt>
            <dd className="mb-4 text-gray-500 sm:mb-5 dark:text-gray-400">
              {task.notes}
            </dd>
          </div>
        )}
        {!!task.progress.length && (
          <>
            <div className="col-span-2 p-3 bg-gray-100 rounded-lg border border-gray-200 dark:bg-gray-700  dark:border-gray-600">
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
        )}
        <div className="flex justify-between col-span-2">
          <p className="capitalize">Status: {task.status}</p>
          <p>Date Added: {task.dateAdded.toString().slice(0, 10)}</p>
        </div>
      </dl>
    </>
  )
}

export default ViewTask
