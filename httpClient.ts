import axios from 'axios'
import { ConnectionClient } from '@diograph/diograph/types'

class HttpClient implements ConnectionClient {
  address: string
  type: string

  constructor(address: string) {
    if (!address) {
      throw new Error('Please provide address for new HttpClient()')
    }
    this.address = address
    this.type = this.constructor.name
  }

  private resolveUrl(url: string): string {
    return `${this.address}/${url}`
  }

  verify = async () => {
    try {
      const response = await axios.get(this.address)
      return response.status >= 200 && response.status < 300
    } catch (error) {
      throw new Error(`Failed to verify address: ${this.address}`)
    }
  }

  exists = async (url: string) => {
    try {
      const response = await axios.head(this.resolveUrl(url))
      return response.status === 200
    } catch (error) {
      return false
    }
  }

  readTextItem = async (url: string) => {
    const response = await axios.get(this.resolveUrl(url), { responseType: 'text' })
    return response.data
  }

  readItem = async (url: string) => {
    const response = await axios.get(this.resolveUrl(url), { responseType: 'arraybuffer' })
    return response.data
  }

  readToStream = async (url: string) => {
    const response = await axios.get(this.resolveUrl(url), { responseType: 'stream' })
    return response.data
  }

  writeTextItem = async (url: string, fileContent: string) => {
    throw new Error('HttpClient supports only read operations')
  }

  writeItem = async (url: string, fileContent: ArrayBuffer | string) => {
    throw new Error('HttpClient supports only read operations')
  }

  deleteItem = async (url: string) => {
    throw new Error('HttpClient supports only read operations')
  }

  deleteFolder = async (url: string) => {
    throw new Error('HttpClient supports only read operations')
  }

  list = async (url: string) => {
    throw new Error("HttpClient doesn't support list operation")
  }
}

export { HttpClient }
