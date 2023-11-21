import * as React from "react"

const HomeSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" {...props}>
    <g fill="none" fillRule="nonzero">
      <path
        fill="currentColor"
        d="M13.2 2.65c-.7111-.53333-1.6889-.53333-2.4 0l-7 5.25A2.00001 2.00001 0 0 0 3 9.5V19c0 1.1046.89543 2 2 2h3.9c.60751 0 1.1-.4925 1.1-1.1V15c0-1.1046.8954-2 2-2s2 .8954 2 2v4.9c0 .6075.4925 1.1 1.1 1.1H19c1.1046 0 2-.8954 2-2V9.5a2.00004 2.00004 0 0 0-.8-1.6l-7-5.25Z"
      />
    </g>
  </svg>
)

export default HomeSVG
