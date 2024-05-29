import request from 'supertest'
import app from '../app'

describe('GET /example', () => {
  it('responds with expected JSON object', async () => {
    const response = await request(app).get('/example')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'OK',
      result: 'Hello World!',
    })
  })
})
