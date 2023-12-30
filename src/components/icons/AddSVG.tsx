import * as React from "react"

const AddSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" {...props}>
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
    ></path>
  </svg>
)

export default AddSVG
