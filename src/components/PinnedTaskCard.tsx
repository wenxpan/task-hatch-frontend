import React from "react"
import { Task } from "../types/task"
import ProgressIndicator from "./ProgressIndicator"
import { useModal } from "../state/ModalContext"
import ViewTask from "./ViewTask"

interface CardProps {
  task: Task
}

const PinnedTaskCard: React.FC<CardProps> = ({ task }) => {
  const { showModal } = useModal()
  return (
    <div
      className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer"
      onClick={() => showModal(<ViewTask task={task} />, "Task Info")}
    >
      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {task.title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
        {task.doReason}
      </p>
      <ProgressIndicator number={task.progress.length} />
    </div>
  )
}

export default PinnedTaskCard
