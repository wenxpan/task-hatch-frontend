import * as React from "react"

const SnoozeSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" {...props}>
    <g id="sleep_line" fill="none" fill-rule="evenodd">
      <path
        fill="currentColor"
        d="M12 4a1 1 0 0 0 1 1h4.586l-5.293 5.293A1 1 0 0 0 13 12h7a1 1 0 1 0 0-2h-4.586l5.293-5.293A1 1 0 0 0 20 3h-7a1 1 0 0 0-1 1Zm-8 6a1 1 0 1 1 0-2h5a1 1 0 0 1 .707 1.707L6.414 13H9a1 1 0 1 1 0 2H4a1 1 0 0 1-.707-1.707L6.586 10H4Zm8 7a1 1 0 1 1 0-2h4a1 1 0 0 1 .707 1.707L14.414 19H16a1 1 0 1 1 0 2h-4a1 1 0 0 1-.707-1.707L13.586 17H12Z"
      />
    </g>
  </svg>
)

export default SnoozeSVG
