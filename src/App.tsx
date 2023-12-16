import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.scss";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import styled, { ThemeProvider } from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import { useTheme } from "./styles/theme/themeContext";
import GlobalStyle from "./styles/global";

const StyledLayout = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.backgroundGradient};
`;

const AppContainer = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.backgroundPrimary};
  /* padding: 40px; */
  border-radius: 40px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const Layout = () => {
  return (
    <StyledLayout>
      <AppContainer>
        <Outlet />
      </AppContainer>
    </StyledLayout>
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
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
