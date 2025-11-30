import React from 'react';
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export function Layout() {
    return (
        // Clase principal ajustada a Bootstrap (min-vh-100 para min-h-screen, bg-light)
        <div className="min-vh-100 bg-light">
            {/* Navbar es visible en todas las rutas */}
            <Navbar /> 
            
            <main className="container pt-4"> 
                {/* Outlet renderiza la vista de la ruta actual (Home, Details) */}
                <Outlet /> 
            </main>

            {/* Aquí iría el Footer si usas Footer.jsx */}
        </div>
    );
}





// import { Outlet } from "react-router-dom/dist"
// import ScrollToTop from "../components/ScrollToTop"
// import { Navbar } from "../components/Navbar"
// import { Footer } from "../components/Footer"


// export const Layout = () => {
//     return (
//         <ScrollToTop>
//             <Navbar />
//                 <Outlet />
//             <Footer />
//         </ScrollToTop>
//     )
// }