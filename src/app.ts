import bodyParser from 'body-parser'
import type { Express } from 'express'
import express from 'express'
import path from 'path'

import { fileStorageRegister } from '@/base'
import { internalServerErrorHandler, morganLogger, notFoundHandler } from '@/middlewares'
import routes from '@/routes'
import { GlobalFileStorageConfig } from '@/shared'

const App: Express = express()

App.use(morganLogger)
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
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

// 404 handler
App.use(notFoundHandler)

// Error handler
App.use(internalServerErrorHandler)

export default App
