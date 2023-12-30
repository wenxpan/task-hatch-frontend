import { toast } from "react-toastify"

export const handleError = (e: Error, msg = e.message) => {
  console.error(msg)
  toast.error(msg)
}
