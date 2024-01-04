import React from "react"
import { Task } from "../types/task"
import AddProgressLine from "./AddProgressLine"
import { useModal } from "../hooks/useModal"
import FullscreenSVG from "./icons/FullscreenSVG"
import { calculateSnoozeDaysLeft } from "../utils/calcSnoozeDaysLeft"
import TagGroup from "./TagGroup"

interface CardProps {
  task: Task
}

const TaskCard: React.FC<CardProps> = ({ task }) => {
  if (!task) {
    return null
  }
  const { showViewModal } = useModal()

  const recentProgress = [...task.progress].slice(-3)

  const snoozeDaysLeft = calculateSnoozeDaysLeft(task.snoozeUntil)

  return (
    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow     max-w-md h-full">
      <button
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => {
          showViewModal(task)
        }}
      >
        <h5 className="text-2xl font-semibold text-start text-gray-900 justify-start">
          {task.status === "snoozed" && `(Snoozed for ${snoozeDaysLeft} days) `}
          {task.title}
          <span>
            <FullscreenSVG className="h-4 w-4 ml-2 inline invisible group-hover:visible group-focus:visible" />
          </span>
        </h5>
      </button>
      <TagGroup tags={task.tags} />
      <p className="font-normal text-gray-700 my-3">{task.doReason}</p>
      <p className="mb-1">Recent progress:</p>
      {recentProgress.map((progress, index) => (
        <div key={index} className="text-gray-600 text-sm">
          {new Date(progress.date).toLocaleDateString()} -{" "}
          {progress.description}
        </div>
      ))}
      <AddProgressLine task={task} />
    </div>
  )
}

export default TaskCard
