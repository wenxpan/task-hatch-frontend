import React from "react"

interface OverlayProps {
  zIndex: 0 | 10 | 20 | 30 | 40 | 50
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
          className={`bg-gray-900/50 fixed inset-0 z-${zIndex}`}
          onClick={toggleOverlay}
        ></div>
      </>
    )
  )
}

export default Overlay
