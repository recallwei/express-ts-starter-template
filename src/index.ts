import figlet from 'figlet'
import http from 'http'

import { batchPrimaryLog, getCurrentTime, GlobalAppConfig, GlobalConfig } from '@/shared'

import App from './app'

const { PORT } = GlobalConfig

App.set('port', PORT)

const Server = http.createServer(App)

const showAppInitLog = (port: string) => {
  figlet('Hello World!!', (err, data) => {
    if (err) {
      console.log('Something went wrong...')
      console.dir(err)
      return
    }
    console.log(data)
  })

  batchPrimaryLog([
    `[${GlobalAppConfig.APP_NAME} - ${getCurrentTime('HH:mm:ss')}] Server is running on port ${port}`,
    `[${GlobalAppConfig.APP_NAME} - ${getCurrentTime('HH:mm:ss')}] v${GlobalAppConfig.APP_VERSION}`
  ])
}

Server.listen(PORT, () => {
  const serverInfo = Server.address()
  let port = ''
  if (serverInfo) {
    if (typeof serverInfo !== 'string') {
      port = serverInfo.port.toString()
    } else {
      port = serverInfo
    }
  }

  showAppInitLog(port)
})
