import type { Express } from 'express'
import express from 'express'

import { GlobalConfig } from '@/shared'
// import type { Express, NextFunction, Request, Response } from 'express'

class Server {
  private app: Express

  private port: number

  constructor(port: number) {
    this.app = express()
    this.port = port
  }

  // public start() {
  //   this.app.listen(this.port, () => {
  //     console.log(`Server is listening on port ${this.port}`)
  //   })
  // }

  private beforeRoutesInit() {
    console.log('inject middlewares before routes init')
    // console.log(this.app)
  }

  private afterRoutesInit() {
    console.log('add utils after routes init')
    // console.log(this.app)
  }

  public onReady() {
    this.beforeRoutesInit()
    this.afterRoutesInit()
    Server.showBanner()
  }

  private static showBanner() {
    switch (GlobalConfig.ENVIRONMENT) {
      case 'development':
        console.log(`
        🚀[server]: Server is running on port ${GlobalConfig.PORT}\n
        dev env
        `)
        break
      case 'production':
        console.log(`
        🚀[server]: Server is running on port ${GlobalConfig.PORT}\n
        prod env
        `)
        break
      case 'test':
        console.log(`
        🚀[server]: Server is running on port ${GlobalConfig.PORT}\n
        test env
        `)
        break
      default:
        break
    }
  }
}

export { Server }
