import * as React from "react"

const Egg2SVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 800 800" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="60"
      d="M400 736.666c-151.467 0-270-110.662-270-270 0-94.346 33.327-196.974 85.506-275.62C268.401 111.321 335.492 63.333 400 63.333s131.599 47.988 184.494 127.713C636.673 269.692 670 372.32 670 466.666c0 159.338-118.533 270-270 270Z"
    />
    <path
      stroke="currentColor"
      strokeWidth="40"
      d="m160.206 387.508 66.919 51 58-51 61.5 39.5 59.581-38.5"
    />
  </svg>
)

export default Egg2SVG
