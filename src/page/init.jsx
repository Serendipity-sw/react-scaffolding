import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Routers } from '../router'
export default _ => {
  return (
    <Suspense>
      <RouterProvider router={Routers} />
    </Suspense>
  )
}
