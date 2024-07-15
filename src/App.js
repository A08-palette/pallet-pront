import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import CreateBoard from "./routes/CreateBoard";
import Login from "./routes/Login";
import Board from "./routes/Board";
import CreateColumn from "./routes/CreateColumn";

export const baseUrl = "http://localhost:8080";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <Signup /> },
      { path: "/createBoard/", element: <CreateBoard /> },
      { path: "/login", element: <Login /> },
      { path: "/board/:id", element: <Board /> },
      { path: "/board/:id/createColumn", element: <CreateColumn /> },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
