import {Router} from 'express'
import {Auth} from './controllers'

const routes = Router()
routes.use('/auth', Auth)

export default routes
