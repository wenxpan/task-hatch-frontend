import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import Input from "../components/Input"
import Button from "../components/Button"
import { useAuth } from "../hooks/useAuth"
import { RegisterUserEntry } from "../types/user"

interface Props {}

type UserInfo = {
  username: string
  email: string
  password: string
  confirmedPassword: string
}

const RegisterPage: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInfo>()
  const { registerUser } = useAuth()

  const onSubmit: SubmitHandler<UserInfo> = async (data) => {
    const userInfo: RegisterUserEntry = {
      username: data.username,
      email: data.email,
      password: data.password
    }
    await registerUser(userInfo)
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <img
              src="/task-hatch-logo.png"
              className="mr-3 rounded-full h-8 w-8"
            ></img>
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Task Hatch
            </span>
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  type="text"
                  labelText="Username"
                  {...register("username", {
                    required: "Please enter username"
                  })}
                  error={errors.username?.message}
                />
                <Input
                  type="email"
                  labelText="Email"
                  {...register("email", {
                    required: "Please enter email"
                  })}
                  error={errors.email?.message}
                />
                <Input
                  type="password"
                  labelText="Password"
                  {...register("password", {
                    required: "Please enter password"
                  })}
                  error={errors.password?.message}
                />
                <Input
                  type="password"
                  labelText="Confirm Password"
                  {...register("confirmedPassword", {
                    required: "Please enter password",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match"
                  })}
                  error={errors.confirmedPassword?.message}
                />
                <Button variant="solid" className="w-full" type="submit">
                  Create an account
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-yellow-800 hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RegisterPage
