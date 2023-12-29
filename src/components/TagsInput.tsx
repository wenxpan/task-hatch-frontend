import React from "react"
import { UseControllerProps, useController } from "react-hook-form"

const TagsInput: React.FC<UseControllerProps<any>> = ({ control, name }) => {
  const { field } = useController({ control, name })

  const value = Array.isArray(field.value) ? field.value.join(", ") : ""

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Tags
        <input
          {...field}
          id="tags"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          value={value}
          onChange={(e) => field.onChange(e.target.value.split(", "))}
        />
      </label>
    </div>
  )
}

export default TagsInput
