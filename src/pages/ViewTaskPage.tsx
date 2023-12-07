import React, { useContext } from "react"
import ViewTask from "../components/ViewTask"
import { useParams } from "react-router-dom"
import TaskContext from "../state/TaskContext"

interface Props {}

const ViewTaskPage: React.FC<Props> = () => {
  const { id } = useParams()
  const { tasks } = useContext(TaskContext)
  const task = tasks.find((t) => t._id === id)
  return <div className="max-w-2xl">{task && <ViewTask task={task} />}</div>
}

export default ViewTaskPage
