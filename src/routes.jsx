import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";

// Definimos el objeto Router
export const router = createBrowserRouter(
    createRoutesFromElements(
      // La ruta principal usa Layout como envoltorio
      <Route path="/" element={<Layout />} errorElement={<h1>¡404! Ruta Galáctica no encontrada.</h1>} >

        {/* Home: Ruta base (index=true significa '/') */}
        <Route index element={<Home />} /> 
        
        {/* Detalle: Ruta dinámica para cualquier entidad */}
        <Route path="/details/:type/:uid" element={ <Details />} />

        {/* NOTA: Si tienes ScrollToTop.jsx, podrías usarlo aquí si tu boilerplate lo requiere */}
        {/* <Route element={<ScrollToTop />}>...</Route> */}
      </Route>
    )
);