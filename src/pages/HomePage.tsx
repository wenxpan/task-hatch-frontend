import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react"
import TaskContext from "../state/TaskContext"
import TaskCard from "../components/TaskCard"
import PinFillSVG from "../components/icons/PinFillSVG"
import PageTitle from "../components/PageTitle"
import { Task } from "../types/task"
import ShuffleSVG from "../components/icons/ShuffleSVG"
import { Link } from "react-router-dom"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { tasks, stats } = useContext(TaskContext)

  const taskCount = useMemo(() => tasks.length, [tasks])
  const pinnedTasks = tasks.filter((t) => t.status === "prioritised")
  const inProgressTasks = tasks.filter((t) => t.status === "in progress")

  const [randomTaskID, setRandomTaskID] = useState<string | null>(null)

  const randomTask: Task | undefined = tasks.find((t) => t._id === randomTaskID)

  const newlyAddedTask = tasks[tasks.length - 1]

  // Function to select a random task
  const selectRandomTaskID = (): string | null => {
    if (!inProgressTasks.length) {
      return null
    } else {
      const randomIndex = Math.floor(Math.random() * inProgressTasks.length)
      return inProgressTasks[randomIndex]._id
    }
  }

  // Initialize the random task
  useEffect(() => {
    setRandomTaskID(selectRandomTaskID())
  }, [taskCount])

  // Function to draw a new random task
  const drawRandomTask = useCallback(() => {
    if (inProgressTasks.length > 0) {
      const randomIndex = Math.floor(Math.random() * inProgressTasks.length)
      setRandomTaskID(inProgressTasks[randomIndex]._id)
    }
  }, [inProgressTasks])

  return (
    <>
      <PageTitle title="Hi there!" />
      {/* stats */}
      <div className="px-2 lg:px-12 max-w-4xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h4>Ongoing Tasks</h4>
            <p className="mt-5 font-bold text-2xl">{stats.tasksToDo}</p>
          </div>
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h4>Tasks Completed</h4>
            <p className="mt-5 font-bold text-2xl">{stats.tasksCompleted}</p>
          </div>
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h4>Total Tasks</h4>
            <p className="mt-5 font-bold text-2xl">{stats.totalTasks}</p>
          </div>
          <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h4>Top Tags</h4>
            <div className="flex items-center flex-wrap">
              {stats.topTags.map((t) => (
                <Link
                  className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 mx-1 rounded whitespace-nowrap mr-2 my-1"
                  key={t.tag}
                  to={`/tasks?tag=${t.tag}`}
                >
                  {t.tag} ({t.taskCount})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* pinned tasks */}
      <div className="px-2 lg:px-12 max-w-4xl">
        <h4 className="font-semibold text-md mb-2">
          <PinFillSVG className="inline" /> Pinned Tasks
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {pinnedTasks.length ? (
            pinnedTasks.map((t) => <TaskCard key={t._id} task={t} />)
          ) : (
            <p>No pinned tasks yet</p>
          )}
        </div>
      </div>
      {/* random tasks & newly added */}
      <div className="px-2 lg:px-12 max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 place-items-stretch">
        {/* row 1 col 1 - newly title */}
        <div className="flex items-end">
          <h4 className="font-semibold text-md mb-2 shrink-0 mr-4">
            Newly Added
          </h4>
        </div>
        {/* row 2 col 1 newly content */}
        <div className="row-start-2">
          <TaskCard task={newlyAddedTask} />
        </div>

        {/* row 1 col 2 - random title */}
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
        {/* row 2 col 2 - random content */}
        <div>
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
