import React from "react"

interface Props {}

const ViewTask: React.FC<Props> = () => {
  return (
    <>
      <dl>
        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          Why do you want to do it?
        </dt>
        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
          doReason
        </dd>
        <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
          Tags
        </dt>
        <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
          programming, tags
        </dd>
      </dl>
    </>
  )
}

export default ViewTask
