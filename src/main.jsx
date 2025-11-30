import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './routes'; // Importa la configuración de rutas
import { StoreProvider } from './store/StoreProvider'; // Importa el Context Provider
import { RouterProvider } from 'react-router-dom';
import './index.css' // Importa tus estilos globales

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Paso 1: Envuelve toda la lógica de estado */}
    <StoreProvider> 
      {/* Paso 2: Monta la navegación */}
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>,
)