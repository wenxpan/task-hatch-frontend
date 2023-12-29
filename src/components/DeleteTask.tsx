import React, { useContext } from "react"
import DeleteSVG from "./icons/DeleteSVG"
import { Task } from "../types/task"
import TaskContext from "../state/TaskContext"
import { deleteTaskAPI } from "../services/taskService"
import Button from "./Button"

interface Props {
  closeModal: () => void
  task: Task
}

const DeleteTask: React.FC<Props> = ({ closeModal, task }) => {
  const { tasksDispatch } = useContext(TaskContext)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await deleteTaskAPI(task._id)
      tasksDispatch({ type: "delete_task", task: task })
      closeModal()
    } catch (e) {
      console.error((e as Error).message)
    }
  }

  return (
    <>
      <DeleteSVG className="mx-auto mb-4 w-8 h-8 text-red-600" />
      <p className="mb-4 text-center">
        Are you sure you want to delete task:{" "}
        <span className="italic font-semibold">{task.title}</span>?
      </p>
      <div className="flex justify-center items-center space-x-4">
        <Button variant="solid" onClick={closeModal}>
          No, cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Yes, delete
        </Button>
      </div>
    </>
  )
}

export default DeleteTask
