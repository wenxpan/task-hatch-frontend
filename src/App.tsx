import "react-toastify/dist/ReactToastify.css"
// import { useState } from "react"
// import MainContainer from "./components/MainContainer"
import RegisterPage from "./pages/RegisterPage"
// import { Routes, Route, Navigate } from "react-router-dom"
// import { ModalProvider } from "./state/ModalContext"
// import { TaskProvider } from "./state/TaskContext"
// import HomePage from "./pages/HomePage"
// import TasksPage from "./pages/TasksPage"
// import NewTaskPage from "./pages/NewTaskPage"
// import ArchivePage from "./pages/ArchivePage"
// import NotFoundPage from "./pages/NotFoundPage"
// import ViewTaskPage from "./pages/ViewTaskPage"
// import EditTaskPage from "./pages/EditTaskPage"
// import MainContainer from "./components/MainContainer"
// import NavBar from "./components/NavBar"
// import SideBar from "./components/SideBar"
// import Overlay from "./components/Overlay"

function App() {
  // const [isOverlayOn, setIsOverlayOn] = useState(false)

  // const toggleOverlay = (): void => {
  //   setIsOverlayOn((prev: boolean) => !prev)
  // }
  return (
    <RegisterPage />
    // <TaskProvider>
    //   <ModalProvider>
    //     <div className="antialiased">
    //       <NavBar
    //         title="Task Hatch"
    //         logo="/task-hatch-logo.png"
    //         toggleOverlay={toggleOverlay}
    //       />
    //       <SideBar isOverlayOn={isOverlayOn} />
    //       <Routes>

    //         <Route path="" element={<MainContainer />}>
    //           <Route index element={<Navigate to="/home" />}></Route>
    //           <Route path="/home" element={<HomePage />} />
    //           <Route path="/tasks">
    //             <Route index element={<TasksPage />} />
    //             <Route path=":id" element={<ViewTaskPage />} />
    //             <Route path=":id/edit" element={<EditTaskPage />} />
    //           </Route>
    //           <Route path="/new" element={<NewTaskPage />} />
    //           <Route path="/archive" element={<ArchivePage />} />
    //           <Route path="*" element={<NotFoundPage />} />
    //         </Route>
    //       </Routes>
    //     </div>
    //     <Overlay
    //       isOpen={isOverlayOn}
    //       toggleOverlay={toggleOverlay}
    //       zIndex={30}
    //     />
    //   </ModalProvider>
    // </TaskProvider>
  )
}

export default App
