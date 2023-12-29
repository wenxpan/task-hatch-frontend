import React from "react"

interface Props {
  disabled?: boolean
  error?: string | null
  id?: string
  labelText: string
  name?: string
  type?: "text" | "date"
}

const Input = React.forwardRef<HTMLInputElement, Props>(function Input(
  { disabled, error, id, labelText, name, type = "text", ...rest },
  ref
) {
  return (
    <div className="col-span-2 sm:col-span-1">
      <label className="block mb-2 text-sm font-medium text-gray-900 capitalize">
        {labelText}
        <input
          ref={ref}
          type={type}
          name={name}
          id={id}
          disabled={disabled}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5 invalid:border-pink-500 focus:invalid:border-pink-500 shadow-sm mt-1"
          {...rest}
        />
      </label>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  )
})

export default Input
