import React, { createContext, useContext, useState } from "react"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"

type ModalContextType = {
  showModal: (
    content: React.ReactNode,
    title: string,
    isExpandable: boolean,
    expandLink: string
  ) => void
  hideModal: () => void
  expandModal: (link: string) => void
  modalInfo: {
    title: string
    content: React.ReactNode
    isExpandable: boolean
    expandLink: string
  }
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [modalInfo, setModalInfo] = useState({
    title: "",
    content: null as React.ReactNode,
    isExpandable: false,
    expandLink: ""
  })
  const showModal = (
    content: React.ReactNode,
    title: string,
    isExpandable = false,
    expandLink: string
  ) => {
    setModalInfo({ title, content, isExpandable, expandLink })
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
    setModalInfo({
      title: "",
      content: null as React.ReactNode,
      isExpandable: false,
      expandLink: ""
    })
  }

  const nav = useNavigate()

  const expandModal = () => {
    nav(modalInfo.expandLink)
    hideModal()
  }

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        expandModal,
        modalInfo
      }}
    >
      {children}
      {isModalOpen && <Modal>{modalInfo.content}</Modal>}
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
