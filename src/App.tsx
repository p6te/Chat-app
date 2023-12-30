import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import styled, { ThemeProvider } from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import { ThemeContext } from "./styles/theme/themeContext";
import GlobalStyle from "./styles/global";
import { device } from "./styles/breakpoints";
import { useContext } from "react";

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
  border-radius: 40px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  @media ${device.mobile} {
    background-color: none;
    border-radius: 0;
    box-shadow: none;
    min-height: 100vh;
  }
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
  const currentTheme = useContext(ThemeContext);

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
