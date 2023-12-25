import React, { useContext, useState } from "react"
import { ProgressEntry, Task } from "../types/task"
import AddSVG from "./icons/AddSVG"
import TaskContext from "../state/TaskContext"
import { toast } from "react-toastify"
import { updateTask } from "../services/taskService"

interface Props {
  task: Task
}

const AddProgressLine: React.FC<Props> = ({ task }) => {
  const [progressEntry, setProgressEntry] = useState<ProgressEntry>({
    date: new Date(),
    description: ""
  })

  const { tasksDispatch } = useContext(TaskContext)

  const handleAddProgress = async () => {
    try {
      const editedTask = {
        ...task,
        progress: [...task.progress, progressEntry]
      }
      const taskData = await updateTask(editedTask)
      tasksDispatch({ type: "update_task", task: taskData })
      setProgressEntry((prev) => ({ ...prev, description: "" }))
    } catch (e) {
      console.error((e as Error).message)
      toast.error((e as Error).message)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-3">
        {/* <input
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-2 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          value={progressEntry.date.toISOString().substring(0, 10)}
          onChange={(e) =>
            setProgressEntry({
              ...progressEntry,
              date: new Date(e.target.value)
            })
          }
        /> */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-grow bg-gray-50 border placeholder-gray-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            value={progressEntry.description}
            onChange={(e) =>
              setProgressEntry({
                ...progressEntry,
                description: e.target.value
              })
            }
            placeholder="add progress here"
          />
          <button
            className="text-primary-700 rounded-lg hover:bg-gray-100 p-2"
            onClick={handleAddProgress}
          >
            <AddSVG className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  )
}

export default AddProgressLine
