import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.jsx'
import Main from './pages/Main.jsx'
import './style.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path:"/home",
    element: <Main />
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);