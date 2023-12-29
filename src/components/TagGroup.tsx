import React from "react"

interface Props {
  tags: string[]
}

const TagGroup: React.FC<Props> = ({ tags }) => {
  return (
    <>
      {tags.map((t) => (
        <span
          className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-0.5 mx-1 rounded whitespace-nowrap"
          key={t}
        >
          {t}
        </span>
      ))}
    </>
  )
}

export default TagGroup
