import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

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
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
