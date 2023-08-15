import express from "express";

import db from './db/config'
import routes from "./routes";
import handle404 from "./middlewares/handle404";

const app = express()

app.use(express.json())

routes(app)

app.use(handle404)

export default app