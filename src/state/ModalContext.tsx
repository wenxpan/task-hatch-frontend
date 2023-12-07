import React, { createContext, useContext, useState } from "react"
import Modal from "../components/Modal"

type ModalContextType = {
  showModal: (content: React.ReactNode, title: string) => void
  hideModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const [modalTitle, setModalTitle] = useState("")

  const showModal = (content: React.ReactNode, title: string) => {
    setModalContent(content)
    setModalTitle(title)
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
    setModalContent(null)
    setModalTitle("")
  }

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal isOpen={isModalOpen} onClose={hideModal} title={modalTitle}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  )
}

// custom hook for accessing the modal context
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
