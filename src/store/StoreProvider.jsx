import React, { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "./index";

// 1. Crear el contexto para el estado global y el dispatch
const StoreContext = createContext(null);

// 2. Definir el componente Provider
export function StoreProvider({ children }) {
  // Inicializar reducer con el estado inicial.
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  
  // Guardar favoritos en LocalStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('sw_favorites', JSON.stringify(store.favorites));
  }, [store.favorites]);

  // Proporcionar el store y dispatch a todos los componentes hijos.
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// 3. Custom hook para acceder al estado global y dispatch (lo usarás en todos los componentes)
export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalReducer debe usarse dentro de un StoreProvider');
  }
  const { dispatch, store } = context;
  return { dispatch, store };
}