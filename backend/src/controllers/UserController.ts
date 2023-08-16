import User from "../@types/UserType";
import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";

const getUser = async (request: any, response: Response) => {
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

const userLogin = async(request: any, response: Response) => {
  const { userEmail, userPassword } = request.query

  try {
    const user = await UserModel.userLogin(userEmail, userPassword)

    if(!user) return response.status(400).json({message: "Login inválido, verifique os campos e tente novamente"})
    return response.json(user)
  } catch (error) {
    return response.status(500).json({message: "Erro ao tentar logar"})
  }
}

const registerUser = async (request: any, response: Response) => {
  const requestParams: User = request.body

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(requestParams.senha_usuario, salt);
  const userPassword = hash

  const registerUserData: User = {
    nome_usuario: requestParams.nome_usuario,
    login_usuario: requestParams.login_usuario.toLowerCase(),
    senha_usuario: userPassword,
    email_usuario: requestParams.email_usuario,
    biografia_usuario: requestParams.biografia_usuario,
    data_nascimento_usuario: requestParams.data_nascimento_usuario,
    celular_usuario: requestParams.celular_usuario
  }
  
  try {
    const user = await UserModel.createUser(registerUserData)

    if(!user) return response.status(400).json({message: "Erro ao tentar cadastrar"})
    return response.status(201).json(user)
  } catch (error) {
    console.log(error)
    return response.status(500).json({message: "Erro interno no servidor ao tentar cadastrar"})
  }
} 

export default {getUser, userLogin, registerUser}