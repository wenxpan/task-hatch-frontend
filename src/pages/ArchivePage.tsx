import React, { useContext } from "react"
import TaskContext from "../state/task/TaskContext"
import Table from "../components/Table"

interface ArchivePageProps {}

const ArchivePage: React.FC<ArchivePageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)
  const archivedTasks = tasks.filter((t) => t.isArchived)

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table tasks={archivedTasks} hasAddButton={false} />
      </div>
    </>
  )
}

export default ArchivePage
