import React from "react"
import PageTitle from "../components/PageTitle"

interface Props {}

const NotFoundPage: React.FC<Props> = () => {
  return (
    <>
      <PageTitle title="404" />
      <div className="mx-auto max-w-screen-2xl px-2 lg:px-12">
        Page not found
      </div>
    </>
  )
}

export default NotFoundPage
