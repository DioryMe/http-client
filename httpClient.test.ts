import { HttpClient } from './httpClient'

describe('do stuff', () => {
  describe('readItem', () => {
    let client: HttpClient
    beforeEach(() => {
      client = new HttpClient('asdf')
    })
    it('two with /', async () => {
      const response = await client.readTextItem('asdf')
      expect(response).toEqual('readTextItem payload')
    })
  })
})
