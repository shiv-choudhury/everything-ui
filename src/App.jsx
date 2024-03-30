import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material";

import { UserContextProvider } from "./Context/AppContext.jsx";
import Router from "./Routes/Router";
import theme from "./Styles/theme.jsx";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Auth0Provider
            domain="dev-pgi25t52e4kxj3sp.us.auth0.com"
            clientId="josFtwXTDGkE17SiNI9KXL5f10Ru4KX9"
            authorizationParams={{
              redirect_uri: window.location.origin
            }}
          >
            <UserContextProvider>
              <Router />
            </UserContextProvider>
          </Auth0Provider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
