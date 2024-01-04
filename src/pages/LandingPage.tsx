import React from "react"
import Button from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { Link } from "react-router-dom"

interface Props {}

const LandingPage: React.FC<Props> = () => {
  const { loginUser } = useAuth()

  const viewDemo = async () => {
    loginUser({ email: "demo@gmail.com", password: "Testingdemouser" })
  }

  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img
              src="/task-hatch-logo.png"
              className="mr-3 rounded-full h-8 w-8"
            ></img>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Task Hatch
            </span>
          </div>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md p-8 text-center">
            <h1 className="mb-4 text-xl font-semibold tracking-tight leading-none text-gray-900">
              Rediscover Task Management
            </h1>
            <p className="mb-8 text-md text-gray-500 sm:px-16 dark:text-gray-400">
              Emphasizing personal development over deadlines, this app offers a
              dynamic dashboard for daily inspiration and customizable task
              organization with tagging and snooze features, fostering focused
              progress and clearer goal pursuit.
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/login">
                <Button variant="solid" className="w-full">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="solid" className="w-full">
                  Register
                </Button>
              </Link>
              <Button variant="solid" onClick={viewDemo}>
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage
