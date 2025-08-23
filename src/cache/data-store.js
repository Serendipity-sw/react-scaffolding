import { openDB } from 'idb'
import configJson from '../../package.json'

export class DataStore {
  static store
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
    this.store ||= await this.#initDB()
    const result = await this.store.get(this.#databaseStorageTableName, key)
    return result ? result.value : null
  }

  static SetItem = async (key, value) => {
    this.store ||= await this.#initDB()
    await this.store.put(this.#databaseStorageTableName, value, key)
  }

  static RemoveItem = async key => {
    this.store ||= await this.#initDB()
    await this.store.delete(this.#databaseStorageTableName, key)
  }
}
