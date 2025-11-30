import React from "react";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-vh-100 bg-light">
      <main className="container pt-4">
        <Outlet />
      </main>
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