import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./index.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";

const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
