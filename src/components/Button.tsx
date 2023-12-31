import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "text" | "solid" | "outlined" | "dangerIcon" | "danger"
  icon?: React.ElementType
  className?: string
  children?: React.ReactNode
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<Props> = ({
  variant = "solid",
  icon: Icon,
  className,
  children,
  type = "button",
  ...rest
}) => {
  const buttonStyles = {
    solid:
      "text-yellow-900 bg-yellow-300 hover:bg-yellow-400 hover:text-yellow-950 active:bg-yellow-500 active:text-black focus:ring-yellow-200",
    outlined:
      "text-yellow-700 border border-yellow-700 hover:bg-yellow-50 active:bg-yellow-100 focus:ring-yellow-200",
    text: "text-yellow-700 hover:bg-yellow-200 active:bg-yellow-300 focus:ring-yellow-50",
    dangerIcon: "text-red-400 hover:text-red-600 focus:ring-red-200",
    danger:
      "text-red-600 border border-red-600 hover:bg-red-50 active:bg-red-100 focus:ring-red-200"
  }

  return (
    <button
      type={type}
      className={`font-medium rounded-lg text-sm text-center inline-flex gap-1 items-center justify-center focus:outline-none focus:ring-4 ${
        !children && variant === "dangerIcon" ? "" : "px-4 py-2.5"
      } ${buttonStyles[variant]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className={`w-6 h-5`} />}
      {children}
    </button>
  )
}

export default Button
