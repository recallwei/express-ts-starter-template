import multer from 'multer'

import { GlobalFileStorageConfig } from './config'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, GlobalFileStorageConfig.FILE_STORAGE_PATH)
  },
  filename(req, file, cb) {
    cb(null, `${file.filename}-${Date.now()}`)
  }
})

const upload = multer({ storage })

export { upload }
