import React from "react"

interface Props {
  action?: React.ReactNode
  disabled?: boolean
  error?: string | null
  id?: string
  labelText: string
  name?: string
  type?: "text" | "date"
}

const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { action, disabled, error, id, labelText, name, type = "text", ...rest },
  ref
) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {labelText}
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            ref={ref}
            type={type}
            name={name}
            id={id}
            disabled={disabled}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 invalid:border-pink-500 focus:invalid:border-pink-500"
            {...rest}
          />
          {action}
        </div>
      </label>
      {error && <p className="text-pink-600">{error}</p>}
    </div>
  )
})

export default Input
