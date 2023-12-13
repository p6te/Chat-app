import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ThemeProvider } from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import { useTheme } from "./styles/theme/themeContext";

const Layout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

function App() {
  const currentTheme = useTheme();

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
  return (
    <ThemeProvider theme={currentTheme.theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
