import { Fragment, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar, PrivateRoute, RestrictedRoute } from "../components";

import urls from "./urls";

const HomePage = lazy(() => import("../pages/Main"));
const AboutNewPage = lazy(() => import("../pages/AboutNew"));
const LoginPage = lazy(() => import("../pages/Login"));
const AdminPage = lazy(() => import("../pages/AdminPage"));

const routerOConfig = createBrowserRouter([
  {
    path: urls.home,
    element: (
      <Fragment>
        <Navbar />
        <Outlet />
      </Fragment>
    ),
    children: [
      {
        path: urls.home,
        element: <HomePage />,
      },
      {
        path: urls.new + "/:newId",
        element: <AboutNewPage />,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: urls.admin,
        element: <AdminPage />,
      },
    ],
  },
  {
    element: <RestrictedRoute />,
    children: [
      {
        path: urls.login,
        element: <LoginPage />,
      },
    ],
  },
]);

export default routerOConfig;
