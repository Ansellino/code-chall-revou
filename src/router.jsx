// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import CatalogPage from "./pages/CatalogPage";
import catalogData from "./data/catalog.json";

// Fungsi loader — disimulasikan sebagai async fetch
async function catalogLoader() {
  // Simulasi network delay (opsional, tapi shows async pattern)
  // await new Promise(resolve => setTimeout(resolve, 100));
  return catalogData;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CatalogPage />,
    loader: catalogLoader,
  },
]);
