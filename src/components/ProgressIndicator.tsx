import React from "react"
import FlowerSVG from "./icons/FlowerSVG"

interface ProgressIndicatorProps {
  number: number
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ number }) => {
  // Colors for each round
  const roundColors = ["#FDAD15", "green", "blue"]

  // Function to determine the current round and set colors accordingly
  // Function to determine the colors of the flowers based on the number
  const getColors = (num: number) => {
    // Initialize an array with gray colors
    let colors = new Array(5).fill("gray")

    // Iterate through each number up to the current one
    for (let i = 1; i <= num; i++) {
      // Determine the round and the flower to change color
      const round = Math.floor((i - 1) / 5)
      const flowerToChange = (i - 1) % 5

      // Get the current round color
      const currentColor = roundColors[round % roundColors.length]

      // Update the color of the current flower
      colors[flowerToChange] = currentColor
    }

    return colors
  }

  // Get the current colors based on the number
  const currentColors = getColors(number)

  return (
    <div className="flex items-center">
      {currentColors.map((color, index) => (
        <FlowerSVG key={index} fill={color} />
      ))}
    </div>
  )
}

export default ProgressIndicator
