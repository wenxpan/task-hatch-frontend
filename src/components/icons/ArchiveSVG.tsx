import * as React from "react"

const ArchiveSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="12" height="12" viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="currentColor"
        d="M7.41421 3A1.99997 1.99997 0 0 0 6 3.58579L3.58579 6a2 2 0 0 0-.54243 1H20.9566a1.9991 1.9991 0 0 0-.5424-1L18 3.58579A2.00005 2.00005 0 0 0 16.5858 3H7.41421ZM21 9H3v10c0 1.1046.89543 2 2 2h14c1.1046 0 2-.8954 2-2V9Zm-9 2c.5523 0 1 .4477 1 1v3.1858l.4142-.4143c.3905-.3905 1.0237-.3905 1.4142 0 .3906.3906.3906 1.0237 0 1.4143l-2.1213 2.1213c-.3905.3905-1.0237.3905-1.4142 0l-2.12133-2.1213c-.39052-.3906-.39052-1.0237 0-1.4143.39053-.3905 1.02373-.3905 1.41423 0l.4142.4143V12c0-.5523.4477-1 1-1Z"
      />
    </g>
  </svg>
)

export default ArchiveSVG
