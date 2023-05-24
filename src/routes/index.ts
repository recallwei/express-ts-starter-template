import homeRouter from './home'
import settingsRouter from './settings'
import userRouter from './users'

const routes = [
  {
    path: '/',
    router: homeRouter
  },
  {
    path: '/users',
    router: userRouter
  },
  {
    path: '/settings',
    router: settingsRouter
  }
]

export default routes
