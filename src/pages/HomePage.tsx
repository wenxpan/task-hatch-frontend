import React, { useContext, useEffect, useState } from "react"
import TaskContext from "../state/TaskContext"
import TaskCard from "../components/TaskCard"
import PinFillSVG from "../components/icons/PinFillSVG"
import PageTitle from "../components/PageTitle"
import { Task } from "../types/task"
import ShuffleSVG from "../components/icons/ShuffleSVG"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)
  const pinnedTasks = tasks.filter((t) => t.status === "prioritised")
  const inProgressTasks = tasks.filter((t) => t.status === "in progress")

  const [randomTask, setRandomTask] = useState<Task | null>(null)

  // Function to select a random task
  const selectRandomTask = (): Task | null => {
    if (!inProgressTasks.length) {
      return null
    } else {
      const randomIndex = Math.floor(Math.random() * inProgressTasks.length)
      return inProgressTasks[randomIndex]
    }
  }

  // Initialize the random task
  useEffect(() => {
    setRandomTask(selectRandomTask())
  }, [inProgressTasks])

  // Function to draw a new random task
  const drawRandomTask = () => {
    setRandomTask(selectRandomTask())
  }

  return (
    <>
      <PageTitle title="Hi there!" />
      {/* pinned tasks */}
      <div className="px-2 lg:px-12 max-w-4xl">
        <h4 className="font-semibold text-md mb-2">
          <PinFillSVG className="inline" /> Pinned Tasks
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {pinnedTasks.map((t) => (
            <TaskCard key={t._id} task={t} />
          ))}
        </div>
      </div>
      {/* random tasks */}
      <div className="px-2 lg:px-12 max-w-4xl">
        <div className="flex items-end">
          <h4 className="font-semibold text-md mb-2 shrink-0 mr-4">
            Random Task
          </h4>
          <button
            className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={drawRandomTask}
          >
            <ShuffleSVG />
            <span>Shuffle</span>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {randomTask ? (
            <TaskCard task={randomTask} />
          ) : (
            <p>No tasks yet. Add more now!</p>
          )}
        </div>
      </div>
    </>
  )
}

export default HomePage
