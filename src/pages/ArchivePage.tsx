import React, { useContext } from "react"
import TaskContext from "../state/TaskContext"
import Table from "../components/Table"
import PageTitle from "../components/PageTitle"

interface ArchivePageProps {}

const ArchivePage: React.FC<ArchivePageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)
  const archivedTasks = tasks.filter((t) => t.status === "archived")

  return (
    <>
      <PageTitle title="Archive" />
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table tasks={archivedTasks} unarchivedTable={false} />
      </div>
    </>
  )
}

export default ArchivePage
