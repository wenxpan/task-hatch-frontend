import * as React from "react"

const ExpandSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 10 6" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5 5 1 1 5"
    ></path>
  </svg>
)

export default ExpandSVG
