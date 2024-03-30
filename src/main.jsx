import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@mui/material";
import theme from "./Styles/theme.jsx";
import { UserContextProvider } from "./Context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Auth0Provider
      domain="dev-pgi25t52e4kxj3sp.us.auth0.com"
      clientId="josFtwXTDGkE17SiNI9KXL5f10Ru4KX9"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </Auth0Provider>
  </ThemeProvider>
);
