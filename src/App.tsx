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
import { useContext, PropsWithChildren, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { ensureError } from "./utils/ensureError";

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
    const turnOnOnlineStatus = async () => {
      if (!loggedUser) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", loggedUser.uid),
          {
            isOnline: true,
          },
          { merge: true }
        );
      } catch (err) {
        const error = ensureError(err);
        // TODO Send to error page
        alert(error.message);
      }
    };

    const turnOffOnlineStatus = async () => {
      if (!loggedUser) {
        return;
      }

      try {
        await setDoc(
          doc(db, "users", loggedUser.uid),
          {
            isOnline: false,
          },
          { merge: true }
        );
      } catch (err) {
        const error = ensureError(err);
        // TODO Send to error page
        alert(error.message);
      }
    };

    useEffect(() => {
      const handleTabClose = (event: Event) => {
        event.preventDefault();
        turnOffOnlineStatus();
      };

      window.addEventListener("beforeunload", handleTabClose);

      return () => {
        window.removeEventListener("beforeunload", handleTabClose);
      };
    }, []);
    useEffect(() => {
      turnOnOnlineStatus();
    }, []);

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
