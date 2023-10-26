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
import { useState, useContext, PropsWithChildren } from "react";
import { AuthContext } from "./context/AuthContext";

const Layout = () => {
  const [error, setError] = useState(false);
  return (
    <div className="layout">
      {error && <span>error</span>}
      <Outlet />
    </div>
  );
};

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
    if (!currentUser) {
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
