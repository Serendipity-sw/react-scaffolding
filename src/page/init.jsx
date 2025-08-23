import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Routers } from '../router'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { QueryClientStore } from '../cache/query-client'

export default _ => {
  return (
    <PersistQueryClientProvider
      client={QueryClientStore.queryClient}
      persistOptions={{
        persister: QueryClientStore.InitAsyncStoragePersister()
      }}
    >
    <Suspense>
      <RouterProvider router={Routers} />
    </Suspense>
    </PersistQueryClientProvider>
  )
}
