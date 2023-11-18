import React, { useState } from "react"
import CreateTask from "../components/CreateTask"
import ModalOverlay from "../components/ModalOverlay"

interface NewTaskPageProps {}

const NewTaskPage: React.FC<NewTaskPageProps> = ({}) => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev)
  }

  const submitModal = () => {}

  return (
    <>
      <ModalOverlay isOpen={isModalOpen} toggleModal={toggleModal}>
        <CreateTask onClose={toggleModal} onSubmit={submitModal} />
      </ModalOverlay>
    </>
  )
}

export default NewTaskPage
