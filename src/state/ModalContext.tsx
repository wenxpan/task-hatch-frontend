import React, { createContext, useContext, useState } from "react"
import Modal from "../components/Modal"
import { useNavigate } from "react-router-dom"
import ViewTask from "../components/ViewTask"
import { Task } from "../types/task"
import EditTask from "../components/EditTask"
import DeleteTask from "../components/DeleteTask"
import CreateTask from "../components/CreateTask"

type ModalInfo = {
  content: React.ReactNode
  title: string
  isExpandable: boolean
  expandLink: string
}

type ModalContextType = {
  showModal: (info: ModalInfo) => void
  hideModal: () => void
  showViewModal: (task: Task) => void
  showEditModal: (task: Task) => void
  showDeleteModal: (task: Task) => void
  showCreateModal: () => void
  expandModal: (link: string) => void
  modalInfo: ModalInfo
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
  children: React.ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const nav = useNavigate()

  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    title: "",
    content: null,
    isExpandable: false,
    expandLink: ""
  })
  const showModal = (info: ModalInfo) => {
    setModalInfo(info)
    setIsModalOpen(true)
  }

  const showViewModal = (task: Task) => {
    showModal({
      title: "Task info",
      content: <ViewTask task={task} />,
      isExpandable: true,
      expandLink: `/tasks/${task._id}`
    })
  }

  const showEditModal = (task: Task) => {
    showModal({
      title: "Edit Task",
      content: <EditTask task={task} onSave={hideModal} editContext="modal" />,
      isExpandable: true,
      expandLink: `/tasks/${task._id}/edit`
    })
  }

  const showDeleteModal = (task: Task) => {
    showModal({
      title: "Delete Task",
      content: <DeleteTask task={task} />,
      isExpandable: false,
      expandLink: ""
    })
  }

  const showCreateModal = () => {
    showModal({
      title: "New task",
      content: <CreateTask onComplete={hideModal} />,
      isExpandable: true,
      expandLink: "/new"
    })
  }

  const hideModal = () => {
    setIsModalOpen(false)
    setModalInfo({
      title: "",
      content: null,
      isExpandable: false,
      expandLink: ""
    })
  }

  const expandModal = () => {
    nav(modalInfo.expandLink)
    hideModal()
  }

  return (
    <ModalContext.Provider
      value={{
        showModal,
        showViewModal,
        showEditModal,
        showDeleteModal,
        showCreateModal,
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
