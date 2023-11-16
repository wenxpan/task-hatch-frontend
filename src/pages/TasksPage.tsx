import React from "react"
import Table from "../components/Table"

interface TasksPageProps {}

const TasksPage: React.FC<TasksPageProps> = ({}) => {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        <Table />
      </div>
    </>
  )
}

export default TasksPage
