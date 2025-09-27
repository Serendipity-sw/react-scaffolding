import { openDB } from 'idb'
import configJson from '../../package.json'

export class DataStore {
  static #databaseStorageTableName = 'request-api'

  static #initDB = _ => {
    const tableName = this.#databaseStorageTableName
    return openDB(
      INDEXED_DB_STORE_KEY,
      parseFloat(configJson.version.split('.').slice(0, 2).join('.')),
      {
        upgrade(db) {
          db.createObjectStore(tableName, {
            keyPath: 'key',
            autoIncrement: false
          })
        }
      }
    )
  }

  static GetItem = async key => {
    const db = await this.#initDB()
    const readTx = db.transaction(this.#databaseStorageTableName, 'readonly')
    const readStore = readTx.objectStore(this.#databaseStorageTableName)
    const result = await readStore.get(key)
    await readTx.done
    return result ? result.value : null
  }

  static SetItem = async (key, value) => {
    const db = await this.#initDB()
    const writeTx = db.transaction(this.#databaseStorageTableName, 'readwrite')
    const writeStore = writeTx.objectStore(this.#databaseStorageTableName)
    await writeStore.put({ value, key })
    await writeTx.done
  }

  static RemoveItem = async key => {
    const db = await this.#initDB()
    const tx = db.transaction(this.#databaseStorageTableName, 'readwrite')
    const store = tx.objectStore(this.#databaseStorageTableName)
    await store.delete(key)
    await tx.done
  }
}
