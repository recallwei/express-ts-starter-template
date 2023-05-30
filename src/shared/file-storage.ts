import multer from 'multer'

import { GlobalFileStorageConfig } from './config'

const baseStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, GlobalFileStorageConfig.FILE_STORAGE_PATH)
  },
  filename(req, file, cb) {
    cb(null, `${file.filename}-${Date.now()}`)
  }
})

const baseUpload = multer({ storage: baseStorage })

export { baseUpload }
