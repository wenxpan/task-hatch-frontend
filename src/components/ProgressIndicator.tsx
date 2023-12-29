import React from "react"
import Egg1SVG from "./icons/Egg1SVG"
import Egg2SVG from "./icons/Egg2SVG"
import Egg3SVG from "./icons/Egg3SVG"
import Egg4SVG from "./icons/Egg4SVG"
import LightBulbSVG from "./icons/LightBulbSVG"

interface ProgressIndicatorProps {
  number: number
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ number }) => {
  const fillStyle = "fill-yellow-400"
  const lineStyle = "fill-none"
  const icons = [Egg1SVG, Egg2SVG, Egg3SVG, Egg4SVG, LightBulbSVG]

  const getStyle = (index: number) => {
    const filledIcons = Math.floor(number / 2)
    const lineIcon = number % 2 !== 0

    if (index < filledIcons) {
      return fillStyle
    } else if (index === filledIcons && lineIcon) {
      return lineStyle
    } else {
      return "hidden"
    }
  }

  return (
    <div className="flex items-center">
      {icons.map((Icon, index) => (
        <Icon
          key={index}
          className={`h-8 w-8 text-yellow-500 ${getStyle(index)}`}
        />
      ))}
    </div>
  )
}

export default ProgressIndicator
