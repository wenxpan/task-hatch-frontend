import React from "react"
import Overlay from "./Overlay"

interface ModalOverlayProps {
  isOpen: boolean
  children: React.ReactNode
  toggleModal: () => void
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  isOpen,
  children,
  toggleModal
}) => {
  return (
    <>
      <div
        className={`overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full flex ${
          !isOpen && "hidden"
        }`}
        aria-hidden={!isOpen}
      >
        {children}
      </div>
      <Overlay isOpen={isOpen} zIndex={40} toggleOverlay={toggleModal} />
    </>
  )
}

export default ModalOverlay
