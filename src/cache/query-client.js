import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { DataStore } from './data-store'

export class QueryClientStore {
  static queryClient = new QueryClient()

  static InitAsyncStoragePersister = _ => {
    return createAsyncStoragePersister({
      storage: {
        getItem: DataStore.GetItem,
        setItem: DataStore.SetItem,
        removeItem: DataStore.RemoveItem
      }
    })
  }
}
