import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import TaskContext from "../state/TaskContext"
import EditTask from "../components/EditTask"

interface Props {}

const EditTaskPage: React.FC<Props> = () => {
  const { id } = useParams()
  const { tasks } = useContext(TaskContext)
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
