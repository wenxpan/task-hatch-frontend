import React, { useContext } from "react"
import TaskContext from "../state/task/TaskContext"
import PinnedTaskCard from "../components/PinnedTaskCard"
import PinFillSVG from "../components/icons/PinFillSVG"
import PageTitle from "../components/PageTitle"

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)
  const pinnedTasks = tasks.filter((t) => t.isPinned)
  return (
    <>
      <PageTitle title="Hi there!" />
      <div className="px-2 lg:px-12 max-w-4xl">
        {/* pinned tasks */}
        <h4 className="font-semibold text-xl mb-2">
          <PinFillSVG className="inline" /> Pinned Tasks
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {pinnedTasks.map((t) => (
            <PinnedTaskCard key={t._id} title={t.title} doReason={t.doReason} />
          ))}
        </div>
      </div>
    </>
  )
}

export default HomePage
