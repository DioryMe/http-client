import axios from 'axios'
import { ConnectionClient } from '@diograph/diograph/types'

class HttpClient implements ConnectionClient {
  address: string
  type: string
  token?: string

  constructor(address: string, token?: string) {
    if (!address) {
      throw new Error('Please provide address for new HttpClient()')
    }
    this.address = address
    this.type = this.constructor.name
    this.token = token
  }

  private resolveUrl(url: string): string {
    return `${this.address}/${url}`
  }

  verify = async () => {
    console.log(`HttpClient verify (${this.address})`)
    try {
      const response = await this.exists(`${this.address}/diograph.json`)
      return response
    } catch (error: any) {
      throw new Error(`Failed to verify address: ${this.address}, ${error.message}`)
    }
  }

  exists = async (url: string) => {
    console.log(`HttpClient exists (${url})`)
    try {
      const response = await axios.head(this.resolveUrl(url))
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  readTextItem = async (url: string) => {
    console.log(`HttpClient read text item with auth header (${url})`)
    const response = await axios.get(this.resolveUrl(url), {
      headers: this.token ? { Authorization: this.token } : {},
      responseType: 'text',
    })
    return response.data
  }

  readItem = async (url: string) => {
    console.log(`HttpClient read item with auth header (${url})`)
    const response = await axios.get(this.resolveUrl(url), {
      headers: this.token ? { Authorization: this.token } : {},
      responseType: 'arraybuffer',
    })
    return response.data
  }

  readToStream = async (url: string) => {
    console.log(`HttpClient read to stream (${url})`)
    const response = await axios.get(this.resolveUrl(url), { responseType: 'stream' })
    return response.data
  }

  writeTextItem = async (url: string, fileContent: string) => {
    throw new Error('HttpClient supports only read operations: writeTextItem')
  }

  writeItem = async (url: string, fileContent: ArrayBuffer | string) => {
    // TODO: Prevent @diograph/diograph to call saveRoom() if nothing has changed
    // - this prevents supporting this kind of read-only clients
    // throw new Error(`HttpClient supports only read operations: writeItem (${url})`)
    console.log(`HttpClient supports only read operations: writeItem (${url}) `)
    return true
  }

  deleteItem = async (url: string) => {
    throw new Error(`HttpClient supports only read operations: deleteItem (${url})`)
  }

  deleteFolder = async (url: string) => {
    throw new Error(`HttpClient supports only read operations: deleteFolder (${url})`)
  }

  list = async (url: string) => {
    throw new Error(`HttpClient doesn't support list operation (${url})`)
  }
}

export { HttpClient }
