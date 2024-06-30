import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import NotAuthForRoute from './components/NotAuthForRoute'
import ProtectedTasks from './components/ProtectedTasks'
import Authpage from "./pages/Registration/RegistrationPage"
import MainPage from './pages/Main/MainPage'
import Loginpage from "./pages/Login/LoginPage"
import ProfilePage from './pages/Profile/ProfilePage'
import App from "./App"

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
  },
  {
    path: '/registration',
    element: (
      <NotAuthForRoute>
        <Authpage />
      </NotAuthForRoute>
    )
  },
  {
    path: '/login',
    element: (
      <NotAuthForRoute>
        <Loginpage />
      </NotAuthForRoute>
    )
  },
  {
    path: '/profile',
    element: (
			<ProtectedRoute>
				<ProfilePage />
			</ProtectedRoute>
		)
  },
  {
    path: '/main',
    element: (
      <ProtectedRoute>
        <ProtectedTasks>
          <MainPage />
        </ProtectedTasks>
      </ProtectedRoute>
		)
  },
  {
    path: '/*',
    element: (
			<App />
		)
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
