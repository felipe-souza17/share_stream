import { NextFunction, Response } from "express"
import notFound from "../errors/notFound"

export default function handle404(req: any, res: Response, next: NextFunction) {
  const error404 = notFound(res)
  
  next(error404)
}