import bodyParser from 'body-parser'
import chalk from 'chalk'
import Debug from 'debug'
import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import http from 'http'
import createError from 'http-errors'
import logger from 'morgan'
import morgan from 'morgan'
import path from 'path'

import routes from '@/routes'
import { GlobalAppConfig, GlobalConfig } from '@/shared'

class Server {
  private app: Express

  private port: number

  server?: http.Server

  private debug: Debug.Debugger = Debug(`${GlobalAppConfig.APP_NAME}:server`)

  constructor() {
    this.app = express()
    this.port = GlobalConfig.PORT
  }

  private beforeRoutesInit() {
    // Load middleware
    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('tiny'))
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: true }))

    // Static files setup
    this.app.use('/public', express.static(path.join(__dirname, '@/public')))
    this.app.use('/static', express.static(path.join(__dirname, '@/static')))
  }

  private routesInit() {
    routes.forEach((route) => {
      this.app.use(route.path, route.router)
    })
  }

  private afterRoutesInit() {
    // Catch 404 error
    this.app.use((error: any, request: Request, response: Response, next: NextFunction) => {
      next(createError(404))
    })

    // Error handler
    this.app.use((error: any, request: Request, response: Response) => {
      // console.log(response)
      // console.log(error)
      // response.locals.message = error.message
      // response.locals.error = request.app.get('env') === 'development' ? error : {}
      // response.status(error.status || 500)
      response.render('error')
    })

    this.app.set('port', this.port)
    this.server = http.createServer(this.app)
    this.server.listen(this.port, () => {
      Server.showBanner()
    })
  }

  public init() {
    this.beforeRoutesInit()
    this.routesInit()
    this.afterRoutesInit()
  }

  private static showBanner() {
    console.log(
      chalk.green(`
[${GlobalAppConfig.APP_NAME}] Server is running on port ${GlobalConfig.PORT}
[${GlobalAppConfig.APP_NAME}] v${GlobalAppConfig.APP_VERSION}
`)
    )
  }
}

const startServer = () => {
  const server = new Server()
  server.init()
}

export { Server, startServer }
