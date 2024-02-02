import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { PacksList } from '@/feature/packs-list'

const privateRoutes: RouteObject[] = [{ element: <PacksList />, path: '/' }]
const publicRoutes: RouteObject[] = [{ element: <div>login</div>, path: '/login' }]

//123123
export const router = createBrowserRouter([
  ...publicRoutes,
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}

export function PrivateRoutes() {
  const isAuth = true

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}
