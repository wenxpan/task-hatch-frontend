import * as React from "react"

const BookmarkSVG = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24">
    <g id="bookmark_fill" fill="none" fill-rule="nonzero">
      <path
        fill="currentColor"
        d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22V5Z"
      />
    </g>
  </svg>
)

export default BookmarkSVG
