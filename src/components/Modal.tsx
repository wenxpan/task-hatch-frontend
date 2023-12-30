import React from "react"
import Overlay from "./Overlay"
import ModalHeader from "./ModalHeader"

interface ModalProps {
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ children }) => {
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
          <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <ModalHeader />
            {/* <!-- Modal body --> */}
            {children}
          </div>
        </div>
      </div>
      <Overlay zIndex={40} isOpen={true} toggleOverlay={() => {}} />
    </>
  )
}

export default Modal
