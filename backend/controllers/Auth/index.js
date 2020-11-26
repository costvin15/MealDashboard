import {Router} from 'express'

export const routes = Router()

routes.post('/login', (request, response) => response.json({
  success: true
}))

export default routes
