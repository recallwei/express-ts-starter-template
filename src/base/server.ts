import bodyParser from 'body-parser'
import type { Express } from 'express'
import express from 'express'
import logger from 'morgan'

import { GlobalConfig } from '@/shared'
// import type { Express, NextFunction, Request, Response } from 'express'

class Server {
  private app: Express

  private port: number

  constructor() {
    this.app = express()
    this.port = GlobalConfig.PORT
  }

  // public start() {
  //   this.app.listen(this.port, () => {
  //     console.log(`Server is listening on port ${this.port}`)
  //   })
  // }

  private beforeRoutesInit() {
    // Load middleware
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  private routesInit() {
    // Load routes
    this.app.use('/auth/github', authGitHubRouter)
  }

  private afterRoutesInit() {
    console.log('add utils after routes init')
    // console.log(this.app)
  }

  public onReady() {
    this.beforeRoutesInit()
    this.routesInit()
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
