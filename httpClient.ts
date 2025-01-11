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

  verify = async () => {
    return true
  }

  readTextItem = async (key: string) => {
    // const responseBody = await this.getObjectBody(key)

    // return responseBody.transformToString()
    return 'readTextItem payload'
  }

  readItem = async (key: string) => {
    // const response = await this.getObjectBody(key)

    // return this.streamToBuffer(response as ReadableStream)
    return new ArrayBuffer(123123)
  }

  readToStream = async (key: string) => {
    // const responseBody = await this.getObjectBody(key)

    // return responseBody.transformToWebStream() as ReadableStream
    throw new Error('Not implemented')
  }

  exists = async (key: string) => {
    throw new Error('Not implemented')
  }

  writeTextItem = async (key: string, fileContent: string) => {
    throw new Error('Not implemented')
  }

  writeItem = async (key: string, fileContent: ArrayBuffer | string) => {
    throw new Error('Not implemented')
  }

  deleteItem = async (key: string) => {
    throw new Error('Not implemented')
  }

  deleteFolder = async (key: string) => {
    throw new Error('Not implemented')
  }

  // TODO: Unify all the client.list outputs
  // - currently this is S3 specific...
  list = async (key: string) => {
    throw new Error('Not implemented')
  }

  // private

  getObjectBody = async (key: string) => {
    // const objectParams = {
    //   Bucket: this.bucketName,
    //   Key: this.keyWithPrefix(key),
    // }
    // const getCommand = new GetObjectCommand(objectParams)
    // const response = await this.client.send(getCommand)

    // if (response.$metadata.httpStatusCode != 200 || !response.Body) {
    //   throw new Error(`Response failed (status: ${response.$metadata}) or didn't contain body`)
    // }

    // return response.Body

    return {}
  }
}

export { HttpClient }
