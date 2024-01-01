import "react-toastify/dist/ReactToastify.css"
import MainContainer from "./components/MainContainer"
import { Routes, Route, Navigate } from "react-router-dom"
import { ModalProvider } from "./state/ModalContext"
import { TaskProvider } from "./state/TaskContext"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import NewTaskPage from "./pages/NewTaskPage"
import ArchivePage from "./pages/ArchivePage"
import NotFoundPage from "./pages/NotFoundPage"
import ViewTaskPage from "./pages/ViewTaskPage"
import EditTaskPage from "./pages/EditTaskPage"
import LogInPage from "./pages/LogInPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <TaskProvider>
      <ModalProvider>
        <Routes>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="" element={<MainContainer />}>
            <Route index element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<HomePage />} />
            <Route path="/tasks">
              <Route index element={<TasksPage />} />
              <Route path=":id" element={<ViewTaskPage />} />
              <Route path=":id/edit" element={<EditTaskPage />} />
            </Route>
            <Route path="/new" element={<NewTaskPage />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </ModalProvider>
    </TaskProvider>
  )
}

export default App
