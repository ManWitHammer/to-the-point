import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Authpage from "./pages/Registration/RegistrationPage.jsx"
import Loginpage from "./pages/Login/LoginPage.jsx"
import App from "./App.jsx"

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />
  },
  {
    path: '/registration',
    element: <Authpage />
  },
  {
    path: '/login',
    element: <Loginpage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
