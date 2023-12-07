import React from "react"
import CloseSVG from "./icons/CloseSVG"
import FullscreenSVG from "./icons/FullScreenSVG"
import { useModal } from "../state/ModalContext"

interface Props {}

const ModalHeader: React.FC<Props> = ({}) => {
  const { hideModal, modalInfo, expandModal } = useModal()
  return (
    <>
      <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {modalInfo.title}
        </h3>
        <div>
          {modalInfo.isExpandable && (
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => expandModal(modalInfo.expandLink)}
            >
              <FullscreenSVG className="w-5 h-5" />
              <span className="sr-only">Expand modal</span>
            </button>
          )}
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={hideModal}
          >
            <CloseSVG />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalHeader
