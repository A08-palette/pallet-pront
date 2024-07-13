import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Main from "./routes/Main";
import Signup from "./routes/Signup";
import CreateBoard from "./routes/CreateBoard";
import Login from "./routes/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/signup", element: <Signup /> },
      { path: "/createBoard", element: <CreateBoard /> },
      { path: "/login", element: <Login /> },
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
