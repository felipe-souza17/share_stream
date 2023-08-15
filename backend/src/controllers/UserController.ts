import UserModel from "../models/UserModel";
import { Response } from "express";

const getUser = async (request, response: Response) => {
  const userId = Number(request.params.user_id)

  try {
    const user = await UserModel.getUserByid(userId)

    if(!user) return response.status(404).json({message: "Usuário não encontrado"})

    return response.json(user)
  } catch(error) {
    return response.status(500).json({message: "Erro ao buscar usuário"})
  }
}

export default {getUser}