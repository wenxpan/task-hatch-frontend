import React from "react"
import { Task } from "../types/task"
import AddProgressLine from "./AddProgressLine"
import { useModal } from "../state/ModalContext"
import ViewTask from "./ViewTask"
import FullscreenSVG from "./icons/FullscreenSVG"
import { calculateSnoozeDaysLeft } from "../utils/calcSnoozeDaysLeft"
import TagGroup from "./TagGroup"

interface CardProps {
  task: Task
}

const TaskCard: React.FC<CardProps> = ({ task }) => {
  const { showModal } = useModal()

  const recentProgress = [...task.progress].slice(-3)

  const handleOpenView = () => {
    showModal(<ViewTask task={task} />, "Task Info", true, `tasks/${task._id}`)
  }

  const snoozeDaysLeft = calculateSnoozeDaysLeft(task.snoozeUntil)

  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 max-w-md h-full">
      <button
        className="flex items-center gap-2 cursor-pointer group"
        onClick={handleOpenView}
      >
        <h5 className="text-2xl font-semibold text-start text-gray-900 dark:text-white justify-start">
          {task.status === "snoozed" && `(Snoozed for ${snoozeDaysLeft} days) `}
          {task.title}
          <span>
            <FullscreenSVG className="h-4 w-4 ml-2 inline invisible group-hover:visible group-focus:visible" />
          </span>
        </h5>
      </button>
      <TagGroup tags={task.tags} />
      <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">
        {task.doReason}
      </p>
      <p>Recent progress:</p>
      {recentProgress.map((progress, index) => (
        <div key={index} className="text-gray-600 dark:text-gray-400 text-sm">
          {new Date(progress.date).toLocaleDateString()} -{" "}
          {progress.description}
        </div>
      ))}
      <AddProgressLine task={task} />
    </div>
  )
}

export default TaskCard
