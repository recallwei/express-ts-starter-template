import fs from 'fs'

const generatedPath = '.env'
const envPath = '.env.production'

fs.stat(generatedPath, (error, stats) => {
  if (error) {
    fs.stat(envPath, (error, stats) => {
      if (error) {
        console.log('🚀[Bruce World]: .env.production file Not Found!')
      } else {
        fs.copyFile(envPath, generatedPath, (error) => {
          if (error) {
            console.log('🚀[Bruce World]: Something went wrong!')
          } else {
            console.log('🚀[Bruce World]: Generate successfully!')
          }
        })
      }
    })
  } else {
    console.log('🚀[Bruce World]: Already have a .env file, cannot generate again!')
  }
})
