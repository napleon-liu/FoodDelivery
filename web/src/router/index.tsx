import { Outlet, createBrowserRouter } from 'react-router-dom'

// import { Navigate } from 'react-router-dom'

import Enter from '@/pages/Enter'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import User from '@/pages/User'

import CustomerHome from '@/pages/User/Customer/CustomerHome'
import CustomerOrder from '@/pages/User/Customer/CustomerOrder'
import Panel from '@/pages/User/Employee/Panel'
import Dish from '@/pages/User/Employee/Dish'
import EmployeeOrder from '@/pages/User/Employee/EmployeeOrder'
import RiderOrder from '@/pages/User/Rider/RiderOrder'

import NotFound404 from '@/pages/NotFound404'
import RouteGuard from '@/components/RouteGuard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouteGuard />
  },
  {
    path: '/enter',
    element: <Enter />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/user',
    element: (
      <RouteGuard>
        <User />
      </RouteGuard>
    ),
    children: [
      {
        path: 'customer',
        element: <Outlet />,
        children: [
          {
            path: 'home',
            element: <CustomerHome />
          },
          {
            path: 'order',
            element: <CustomerOrder />
          }
        ]
      },
      {
        path: 'employee',
        element: <Outlet />,
        children: [
          {
            path: 'panel',
            element: <Panel />
          },
          {
            path: 'dish',
            element: <Dish />
          },
          { path: 'order', element: <EmployeeOrder /> }
        ]
      },
      {
        path: 'rider',
        element: <Outlet />,
        children: [{ path: 'order', element: <RiderOrder /> }]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound404 />
  }
])

export default router
