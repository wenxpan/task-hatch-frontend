import * as React from "react"

const AddSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="h-3.5 w-3.5 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <path
      clip-rule="evenodd"
      fill-rule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    ></path>
  </svg>
)

export default AddSVG
