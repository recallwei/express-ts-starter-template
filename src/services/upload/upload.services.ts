// export const processUploadFile = async (file: File): Promise<Upload> => {}

export const logFileInfo = (file: Express.Multer.File) => {
  const { mimetype, originalname, size, path } = file
  console.log('Mime Type: %s', mimetype)
  console.log('Original Name: %s', originalname)
  console.log('File Size: %s', size)
  console.log('File Path: %s', path)
}
