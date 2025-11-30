import { useReducer, useContext } from "react";
import { GlobalContext } from "./context";
import { initialState, reducer } from "./reducer";

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ store, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalReducer() {
  return useContext(GlobalContext);
}

