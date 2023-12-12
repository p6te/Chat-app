import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext, PropsWithChildren } from "react";
import { AuthContext } from "./context/AuthContext";

const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

function App() {
  const { loggedUser } = useContext(AuthContext);

  const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    console.log(loggedUser);
    if (!loggedUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
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
