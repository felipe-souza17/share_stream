import { Response } from "express";
import defaultError from "./defaultError";

export default function notFound(res: Response,message = "Página não encontrada") {
  const error = defaultError(res, message, 404)

  return error;
}