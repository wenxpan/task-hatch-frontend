import React from "react"
// import EditSVG from "./icons/EditSVG"

interface Props {
  variant: "text" | "solid" | "outlined" | "danger"
  icon?: React.ElementType
  children?: React.ReactNode
  onClick?(): void
}

const Button: React.FC<Props> = ({
  variant = "solid",
  icon: Icon,
  children,
  onClick,
  ...rest
}) => {
  const buttonStyles = {
    solid:
      "text-yellow-900 bg-yellow-300 hover:bg-yellow-400 hover:text-yellow-950 active:bg-yellow-500 active:text-black focus:ring-yellow-500",
    outlined:
      "text-yellow-700 border border-yellow-700 hover:bg-yellow-50 active:bg-yellow-100 focus:ring-yellow-50",
    text: "text-yellow-700 hover:bg-yellow-200 active:bg-yellow-300 focus:ring-yellow-50",
    danger: "text-red-400 hover:text-red-600 focus:ring-red-200"
  }

  return (
    <button
      type="button"
      className={`font-medium rounded-lg text-sm text-center inline-flex items-center focus:outline-none focus:ring-4 ${
        children ? "px-4 py-2.5" : ""
      } ${buttonStyles[variant]}`}
      onClick={onClick}
      {...rest}
    >
      {Icon && <Icon className="w-6 h-5" />}
      {children}
    </button>
  )
}

export default Button
