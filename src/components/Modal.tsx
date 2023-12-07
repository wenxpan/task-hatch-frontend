import React from "react"
import Overlay from "./Overlay"
import ModalHeader from "./ModalHeader"

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <>
      <div
        id="createModal"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex"
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <ModalHeader onClose={onClose} title={title} />
            {/* <!-- Modal body --> */}
            {children}
          </div>
        </div>
      </div>
      <Overlay zIndex={40} isOpen={isOpen} toggleOverlay={onClose} />
    </>
  )
}

export default Modal
