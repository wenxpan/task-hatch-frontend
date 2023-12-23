import * as React from "react"

const TickSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <g id="check_fill" fill="none" fill-rule="evenodd">
      <path
        fill="currentColor"
        d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0Z"
      />
    </g>
  </svg>
)

export default TickSVG