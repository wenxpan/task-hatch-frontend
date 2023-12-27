import React, { useContext, useState } from "react"
import TaskContext from "../state/TaskContext"
import Table from "../components/Table"
import PageTitle from "../components/PageTitle"
import SearchLine from "../components/SearchLine"
import { Task } from "../types/task"

interface ArchivePageProps {}

const ArchivePage: React.FC<ArchivePageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)
  const archivedTasks = tasks.filter((t) => t.status === "archived")

  const [search, setSearch] = useState("")

  const filteredTasksBySearch: Task[] = archivedTasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      t.notes?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <PageTitle title="Archive" />
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table tasks={filteredTasksBySearch}>
          <SearchLine search={search} setSearch={setSearch} />
        </Table>
      </div>
    </>
  )
}

export default ArchivePage
