import React from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"

interface Props {}

const NotFoundPage: React.FC<Props> = () => {
  return (
    <>
      <section className="bg-white">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-yellow-700">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Page not found
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Please return to home page.{" "}
            </p>
            <Button variant="solid">
              <Link to="/home">Back</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default NotFoundPage
