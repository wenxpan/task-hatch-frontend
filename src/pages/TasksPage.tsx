import React, { useContext } from "react"
import Table from "../components/Table"
import TaskContext from "../state/TaskContext"
import PageTitle from "../components/PageTitle"
import { useLocation } from "react-router-dom"

interface TasksPageProps {}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const tag = queryParams.get("tag")

  const filteredTasks = tag ? tasks.filter((t) => t.tags.includes(tag)) : tasks

  const unarchivedTasks = filteredTasks.filter((t) => t.status !== "archived")

  return (
    <>
      <PageTitle title="Tasks" />
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table tasks={unarchivedTasks} unarchivedTable={true} />
      </div>
    </>
  )
}

export default TasksPage
