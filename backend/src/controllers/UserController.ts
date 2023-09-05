import User from "../@types/UserType";
import UserModel from "../models/UserModel";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";
import passwordEncriptyon from "../utils/passwordEncryption";
import validateUserLogin from "../utils/validateUserLogin";

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

const userLogin = async(request: Request, response: Response) => {
  const { userEmail, userPassword } = request.body

  
  try {
    const user: User[] | null = await UserModel.userLogin(userEmail)
    
    
    if(!user) return response.status(400).json({message: "Login inválido, verifique os campos e tente novamente"})

    if(await validateUserLogin(userPassword, String(user[0].senha_usuario))) return response.json({
      id_usuario: user[0].id_usuario,
      login_usuario: user[0].login_usuario,
      email_usuario: user[0].email_usuario
    })
    response.status(400).json({message: "Senha incorreta, tente novamente!"})
  } catch (error) {
    console.log(error)
    return response.status(500).json({message: "Erro ao tentar logar"})
  }
}

const registerUser = async (request: Request, response: Response) => {
  const requestParams: User = request.body

  const registerUserData: User = {
    nome_usuario: requestParams.nome_usuario,
    login_usuario: requestParams.login_usuario.toLowerCase(),
    senha_usuario: await passwordEncriptyon(String(requestParams.senha_usuario)),
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

const editUser = async (request: Request, response: Response) => {
  const { id_usuario, nome_usuario, login_usuario, email_usuario, biografia_usuario, data_nascimento_usuario, celular_usuario }: User = request.body

  const editUserData: User = {
    id_usuario: Number(id_usuario),
    nome_usuario: nome_usuario,
    login_usuario: login_usuario,
    email_usuario: email_usuario,
    biografia_usuario: biografia_usuario,
    celular_usuario: celular_usuario
  }
  try {
    const user = await UserModel.editUser(editUserData)

    if(!user) return response.status(400).json({message: "Erro ao tentar editar"})
    return response.status(200).json(user)
  } catch (error) {
    console.log(error)
    return response.status(500).json({message: "Erro interno no servidor ao tentar editar"})
  }
}

const activeProfile = async(request: Request, response: Response
  ) => {

    const { id_usuario, usuario_ativo}: User = request.body

    try {
      const user = await UserModel.activeProfile(Boolean(usuario_ativo), Number(id_usuario))

      if(!user) return response.status(400).json({message: `Erro ao tentar ${Boolean(usuario_ativo) ? 'ativar' : 'desativar'} o usuário`})
      return response.status(200).json(user)
    } catch (error) {
      console.log(error)
      return response.status(400).json({message: `Erro interno no servidor ao tentar ${Boolean(usuario_ativo) ? 'ativar' : 'desativar'} o usuário`})
    }
  }

export default {getUser, userLogin, registerUser, editUser, activeProfile}