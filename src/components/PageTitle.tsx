import React from "react"

interface Props {
  title: string
}

const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 px-2 lg:px-12">{title}</h1>
    </>
  )
}

export default PageTitle
