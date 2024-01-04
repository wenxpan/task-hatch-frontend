import "react-toastify/dist/ReactToastify.css"
import MainContainer from "./components/MainContainer"
import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./state/AuthContext"
import { TaskProvider } from "./state/TaskContext"
import { ModalProvider } from "./state/ModalContext"
import HomePage from "./pages/HomePage"
import TasksPage from "./pages/TasksPage"
import NewTaskPage from "./pages/NewTaskPage"
import ArchivePage from "./pages/ArchivePage"
import NotFoundPage from "./pages/NotFoundPage"
import ViewTaskPage from "./pages/ViewTaskPage"
import EditTaskPage from "./pages/EditTaskPage"
import LogInPage from "./pages/LogInPage"
import RegisterPage from "./pages/RegisterPage"
import LoadDataWrapper from "./components/LoadDataWrapper"
import PublicRoute from "./components/PublicRoute"
import LandingPage from "./pages/LandingPage"

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ModalProvider>
          <LoadDataWrapper>
            <Routes>
              {/* landing routes */}
              <Route path="" element={<PublicRoute />}>
                <Route index element={<LandingPage />} />
                <Route path="/login" element={<LogInPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Route>
              {/* protected routes */}
              <Route path="" element={<MainContainer />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/tasks">
                  <Route index element={<TasksPage />} />
                  <Route path=":id" element={<ViewTaskPage />} />
                  <Route path=":id/edit" element={<EditTaskPage />} />
                </Route>
                <Route path="/new" element={<NewTaskPage />} />
                <Route path="/archive" element={<ArchivePage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </LoadDataWrapper>
        </ModalProvider>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App
