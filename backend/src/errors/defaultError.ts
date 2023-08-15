import { Response } from 'express'
import IDefaultError from '../@types/ErrorsType'

export default function defaultError(res: Response, message = "Ocorreu um erro interno no servidor", status = 500): IDefaultError{
  const error: IDefaultError  = {
    message,
    status
  }

  res.status(error.status).send({
    message: error.message,
  })

  return error
}