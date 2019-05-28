import http from 'http'
import micro from 'micro'
import testListen from 'test-listen'
import got from 'got'
import { CookieJar } from 'tough-cookie'
import cookie from 'cookie'

describe('Cookies', () => {
  it('selects cookies', async () => {
    const server = new http.Server(
      micro((req, res) => {
        res.setHeader('set-cookie', cookie.serialize('message', 'yolo yolo'))
        res.end('')
      })
    )
    const url = await testListen(server)

    const cookieJar = new CookieJar()
    const res = await got.post(url, {
      cookieJar
    })
    console.log(res.headers)
  })
})