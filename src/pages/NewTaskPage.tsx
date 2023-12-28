import React from "react"
import CreateTask from "../components/CreateTask"
import { useNavigate } from "react-router-dom"
import PageTitle from "../components/PageTitle"

interface NewTaskPageProps {}

const NewTaskPage: React.FC<NewTaskPageProps> = ({}) => {
  const nav = useNavigate()

  const jumpToTask = () => {
    nav("/tasks")
  }
  return (
    <>
      <PageTitle title="New Task" />
      <div className="px-2 lg:px-12 max-w-4xl">
        <CreateTask onComplete={jumpToTask} />
      </div>
    </>
  )
}

export default NewTaskPage
