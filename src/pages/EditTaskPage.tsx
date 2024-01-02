import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import EditTask from "../components/EditTask"
import useTasks from "../hooks/useTasks"

interface Props {}

const EditTaskPage: React.FC<Props> = () => {
  const { id } = useParams()
  const { tasks } = useTasks()
  const task = tasks.find((t) => t._id === id)

  if (!task) return null

  const nav = useNavigate()
  const backToTask = () => {
    nav(`/tasks/${task._id}`)
  }

  return (
    <>
      <EditTask task={task} onSave={backToTask} editContext="page" />
    </>
  )
}

export default EditTaskPage
