import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import { ChatContextProvider } from "./context/ChatContext.tsx";
import { ThemeContextProvider } from "./styles/theme/themeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
