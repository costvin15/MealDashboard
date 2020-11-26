import express from "express"
import jwt from "jsonwebtoken"

import {
  Home,
  Auth,
  Meals,
} from "./controllers"

const routes = express.Router()
const VerifyJWT = (request, response, next) => {
  const authorization = request.headers.authorization

  if (!authorization) {
    return response.status(401).send({
      error: 'Nenhum token foi disponibilizado',
      success: false,
    })
  }
    
  const token = authorization.split(" ")[1]

  if (!token) {
    return response.status(401).send({
      error: 'Nenhum token foi disponibilizado',
      success: false,
    })
  }

  jwt.verify(token, process.env.PRIVATEKEY, (error, decoded) => {
    if (error) {
      console.log(error)
      return response.status(500).send({
        error: 'Não foi possível autenticar o token informado.',
        success: false,
      })
    }

    request.userid = decoded._id
    next()
  })
}

routes.get("/", Home.home)

routes.post("/auth/login", Auth.login)
routes.post("/auth/register", Auth.register)
routes.get("/meals/all", Meals.all)
routes.get("/meals/categories", Meals.categories)

export default routes
