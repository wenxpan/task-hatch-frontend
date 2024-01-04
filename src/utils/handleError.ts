import { toast } from "react-toastify"

export const handleError = (
  error: any,
  defaultMessage = "An error occurred, please try again"
) => {
  let message = defaultMessage

  // Check if the error is an Axios error with a response and a custom message
  if (error.response && error.response.data && error.response.data.error) {
    message = error.response.data.error
  } else if (error.message) {
    // Fallback to the generic error message
    message = error.message
  }

  console.error(message)
  toast.error(message)
}
