import homeRouter from './home'
import loginRouter from './login'
import settingsRouter from './settings'
import userRouter from './users'

const routes = [
  {
    path: '/',
    router: homeRouter
  },
  {
    path: '/login',
    router: loginRouter
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
