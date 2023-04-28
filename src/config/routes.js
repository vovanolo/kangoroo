import { Fragment, lazy } from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Navbar, PrivateRoute, RestrictedRoute } from "../components";

import urls from "./urls";

const HomePage = lazy(() => import("../pages/Main"));
const NewsPage = lazy(() => import("../pages/News"));
const EditNewPage = lazy(() => import("../pages/EditNew"));
const LoginPage = lazy(() => import("../pages/Login"));

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
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: urls.news,
        element: <NewsPage />,
      },
    ],
  },
  {
    path: urls.news + "/:newsId",
    element: <EditNewPage />,
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
