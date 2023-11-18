import React from "react"

interface OverlayProps {
  zIndex: number
  isOpen: boolean
  toggleOverlay: () => void
}

const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  zIndex = 30,
  toggleOverlay
}) => {
  return (
    isOpen && (
      <>
        <div
          className={`bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-${zIndex}`}
          onClick={toggleOverlay}
        ></div>
      </>
    )
  )
}

export default Overlay
