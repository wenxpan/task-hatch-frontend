import React, { useContext } from "react"
import Table from "../components/Table"
import TaskContext from "../state/task/TaskContext"

interface TasksPageProps {}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  const { tasks } = useContext(TaskContext)
  const unarchivedTasks = tasks.filter((t) => !t.isArchived)

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table tasks={unarchivedTasks} unarchivedTable={true} />
      </div>
    </>
  )
}

export default TasksPage
