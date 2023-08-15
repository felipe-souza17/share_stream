import UserModel from "../models/UserModel";
import { Request, Response } from "express";

const getUser = async (request, response: Response) => {
  const userId = Number(request.params.user_id)

  try {
    const user = await UserModel.getUserByid(userId)

    if(!user) return response.status(404).json({message: "Usuário não encontrado"})

    return response.json(user)
  } catch(error) {
    if(Number.isNaN(userId)) return response.status(400).json({message: "Id inválido, tente novamente com um valor numérico"})
    return response.status(500).json({message: "Erro ao buscar usuário"})
  }
}

const userLogin = async(request, response: Response) => {
  const { userEmail, userPassword } = request.query

  try {
    const user = await UserModel.userLogin(userEmail, userPassword)

    if(!user) return response.status(400).json({message: "Login inválido, verifique os campos e tente novamente"})
    return response.json(user)
  } catch (error) {
    return response.status(500).json({message: "Erro ao tentar logar"})
  }
}
export default {getUser, userLogin}