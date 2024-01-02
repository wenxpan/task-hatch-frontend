import React from "react"
import DeleteSVG from "./icons/DeleteSVG"
import { Task } from "../types/task"
import Button from "./Button"
import useTasks from "../hooks/useTasks"
import { useModal } from "../hooks/useModal"

interface Props {
  task: Task
}

const DeleteTask: React.FC<Props> = ({ task }) => {
  const { deleteTask } = useTasks()
  const { hideModal } = useModal()

  return (
    <>
      <DeleteSVG className="mx-auto mb-4 w-8 h-8 text-red-600" />
      <p className="mb-4 text-center">
        Are you sure you want to delete task:{" "}
        <span className="italic font-semibold">{task.title}</span>?
      </p>
      <div className="flex justify-center items-center space-x-4">
        <Button variant="solid" onClick={hideModal}>
          No, cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteTask(task)
            hideModal()
          }}
        >
          Yes, delete
        </Button>
      </div>
    </>
  )
}

export default DeleteTask
