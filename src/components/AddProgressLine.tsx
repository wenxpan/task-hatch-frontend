import React, { useState } from "react"
import { ProgressEntry, Task } from "../types/task"
import AddSVG from "./icons/AddSVG"
import { handleError } from "../utils/handleError"
import Button from "./Button"
import useTasks from "../hooks/useTasks"

interface Props {
  task: Task
}

const AddProgressLine: React.FC<Props> = ({ task }) => {
  const [progressEntry, setProgressEntry] = useState<ProgressEntry>({
    date: new Date(),
    description: ""
  })

  const { updateTask } = useTasks()

  const handleAddProgress = async () => {
    try {
      if (!progressEntry.description) {
        throw new Error("Progress cannot be empty")
      }
      const editedTask = {
        ...task,
        progress: [...task.progress, progressEntry]
      }
      await updateTask(editedTask)
      setProgressEntry((prev) => ({ ...prev, description: "" }))
    } catch (e) {
      handleError(e as Error)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 mt-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-grow bg-gray-50 border placeholder-gray-600 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-600 focus:border-yellow-600 block w-full p-2"
            value={progressEntry.description}
            onChange={(e) =>
              setProgressEntry({
                ...progressEntry,
                description: e.target.value
              })
            }
            placeholder="add progress here"
          />
          <Button variant="text" icon={AddSVG} onClick={handleAddProgress} />
        </div>
      </div>
    </>
  )
}

export default AddProgressLine
