import { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'

const Index = lazy(_ => import('../page/index'))

export const Routers = createHashRouter([
  {
    path: '/',
    element: <Index />
  }
])
