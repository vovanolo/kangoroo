import { useAtomValue } from "jotai"
import { Outlet, Navigate } from "react-router-dom"

import urls from "../../config/urls"
import { authStorage } from "../../config/jotai"

export default function RestrictedRoute() {
    const { token } = useAtomValue(authStorage)
    return token ? <Navigate to={urls.news} /> : <Outlet />
}
