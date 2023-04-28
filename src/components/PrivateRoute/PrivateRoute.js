import { useAtomValue } from "jotai";
import { Outlet, Navigate } from "react-router-dom";

import urls from "../../config/urls";
import { authStorage } from "../../config/jotai";

export default function PrivateRoute() {
  const { token } = useAtomValue(authStorage);
  return token ? <Outlet /> : <Navigate to={urls.login} />;
}
