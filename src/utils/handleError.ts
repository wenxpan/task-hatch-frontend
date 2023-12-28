import { toast } from "react-toastify"

export const handleError = (e: Error) => {
  console.error(e.message)
  toast.error(e.message)
}
