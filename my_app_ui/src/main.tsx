import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import DesktopPage from "./pages/DesktopPage";
import { FrappeProvider } from "frappe-react-sdk";
import ListViewPage from "./pages/ListViewPage";

// Get Site Name
const getSiteName = () => {
  const { boot } = (window as any).frappe || {};
  const { versions, sitename } = boot || {};
  return versions?.frappe?.startsWith("15") ||
    versions?.frappe?.startsWith("16")
    ? sitename ?? import.meta.env.VITE_SITE_NAME
    : import.meta.env.VITE_SITE_NAME;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: ":page",
        element: <DesktopPage />,
      },
      {
        path: ":page/list",
        element: <ListViewPage />,
      },
    ],
  },
  {
    path: "login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

// Render Application
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FrappeProvider
      socketPort={import.meta.env.VITE_SOCKET_PORT}
      siteName={getSiteName()}
    >
      <RouterProvider router={router} />
    </FrappeProvider>
  </StrictMode>
);
