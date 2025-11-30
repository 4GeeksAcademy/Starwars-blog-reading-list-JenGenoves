import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import App from "./pages/StarWarsApp";
import { Details } from "./pages/Details";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>¡404!</h1>}>
      {/* <Route index element={<App />} /> */}
      <Route path="/" element={<App />} />
      <Route path="details/:type/:uid" element={<Details />} />
    </Route>
  )
);
