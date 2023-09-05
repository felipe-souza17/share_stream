import express, {Express} from 'express'
import user from './User'

const routes = (app: Express) => {
  app.route('/').get((req, res) => {
    res.status(200).send({
      message: "O servidor está rodando...",
      endpointDate: new Date()
    })
  })

  app.use(express.json(), user)
}

export default routes