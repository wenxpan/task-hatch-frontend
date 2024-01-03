import React, { useState } from "react"
import Table from "../components/Table"
import PageTitle from "../components/PageTitle"
import { useLocation } from "react-router-dom"
import { Task } from "../types/task"
import StatusFilter from "../components/StatusFilter"
import SearchLine from "../components/SearchLine"
import useTasks from "../hooks/useTasks"

interface TasksPageProps {}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  const { tasks } = useTasks()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tag = queryParams.get("tag")

  const filteredTasks = tag ? tasks.filter((t) => t.tags.includes(tag)) : tasks

  const unarchivedTasks = filteredTasks.filter((t) => t.status !== "archived")

  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredTasksBySearch: Task[] = unarchivedTasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())) ||
      t.notes?.toLowerCase().includes(search.toLowerCase())
  )

  const filteredTasksByStatus: Task[] =
    selectedStatus === "all"
      ? filteredTasksBySearch
      : filteredTasksBySearch.filter((t) => t.status === selectedStatus)

  const sortedTasks: Task[] = filteredTasksByStatus.sort((a, b) => {
    if (a.status === "prioritised" && b.status !== "prioritised") return -1
    else if (a.status !== "prioritised" && b.status === "prioritised") return 1
    else return 1
  })

  return (
    <>
      <PageTitle title={tag ? `Tasks: #${tag}` : "Tasks"} />
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table tasks={sortedTasks}>
          <StatusFilter
            selectedStatus={selectedStatus}
            onSelectStatus={setSelectedStatus}
          />
          <SearchLine search={search} setSearch={setSearch} />
        </Table>
      </div>
    </>
  )
}

export default TasksPage
