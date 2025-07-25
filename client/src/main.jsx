import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.jsx'
import Main from './pages/Main.jsx'
import Cidade from './pages/Cidade.jsx'
import Associacao from './pages/Associcacao.jsx'; 
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
  {
    path:"/cidade",
    element: <Cidade />
  },
  {
    path:"/empresa",
    element: <Associacao />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);