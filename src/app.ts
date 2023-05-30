import bodyParser from 'body-parser'
import type { Express, NextFunction, Request, Response } from 'express'
import express from 'express'
import createError from 'http-errors'
import path from 'path'

import { fileStorageRegister } from '@/base'
import { morganLogger } from '@/middlewares'
import routes from '@/routes'
import { GlobalFileStorageConfig } from '@/shared'

const App: Express = express()

App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use(morganLogger)
App.use(bodyParser.json())
App.use(bodyParser.urlencoded({ extended: true }))

const storageFolder = GlobalFileStorageConfig.FILE_STORAGE_PATH

fileStorageRegister(storageFolder)

// Static files setup
App.use('/static', express.static(path.join(__dirname, './static')))
App.use(`/${storageFolder}`, express.static(path.join(__dirname, `../${storageFolder}`)))

// Init routes
routes.forEach((route) => {
  App.use(route.path, route.router)
})

// Catch 404 error
App.use((error: any, request: Request, response: Response, next: NextFunction) => {
  next(createError(404))
})

// Error handler
App.use((error: any, request: Request, response: Response) => {
  response.render('error')
})

export default App
