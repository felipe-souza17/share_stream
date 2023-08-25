import User from '../@types/UserType'
import db from '../db/config'

const getUserByid = async (userId: number) => {
  const idUser = userId
  const getUserByIdQuery = "select * from usuarios where id_usuario = $1"
  const searchedUser: User[] = (await db.query(getUserByIdQuery, [idUser])).rows
  
  if(searchedUser.length === 0) return null
  return searchedUser
}

const userLogin = async (userEmail: string) => {
  const emailUser = userEmail
  const userLoginQuery = "select id_usuario, login_usuario, email_usuario, senha_usuario from usuarios where email_usuario = $1"
  const doUserLogin: User[] = (await db.query(userLoginQuery, [emailUser])).rows
  
  if(doUserLogin.length === 0) return null
  return doUserLogin
}

const createUser = async (params: User) => {
  const newUser = Object.values(params)
  console.log(newUser)
  const createUserQuery = "insert into usuarios(nome_usuario, login_usuario, senha_usuario, email_usuario, biografia_usuario, data_nascimento_usuario, data_cadastro_usuario, data_login_usuario, celular_usuario, usuario_ativo) values($1, $2, $3, $4, $5, $6, localtimestamp, localtimestamp, $7, true) returning id_usuario, nome_usuario, login_usuario, senha_usuario, email_usuario, biografia_usuario, data_nascimento_usuario, data_cadastro_usuario, data_login_usuario, celular_usuario"

  const createdUser = (await db.query(createUserQuery, newUser)).rows

  if(createdUser.length === 0) return null
  return createdUser
}

export default {
  getUserByid,
  userLogin,
  createUser
}