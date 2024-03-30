import { createContext, useContext, useReducer } from "react";

const initialState = {
  userData: null
};

const AppContext = createContext({
  userState: initialState,
  dispatch: () => null
});

function appReducer(userState, action) {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return { ...userState, userData: action.data };
    default:
      return userState;
  }
}

export function UserContextProvider({ children }) {
  const [userState, dispatch] = useReducer(appReducer, initialState);
  const value = { userState, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default function useAppContext() {
  return useContext(AppContext);
}
