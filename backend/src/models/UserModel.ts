import User from '../@types/UserType'
import db from '../db/config'

const getUserByid = async (userId: number) => {
  const idUser = userId
  const getUserByIdQuery = "select * from usuarios where id_usuario = $1"
  const searchedUser: User[] = (await db.query(getUserByIdQuery, [idUser])).rows
  
  if(searchedUser.length === 0) return null
  return searchedUser
}

const userLogin = async (userEmail: string, userPassword: string) => {
  const emailUser = userEmail
  const passwordUser = userPassword
  const userLoginQuery = "select id_usuario, login_usuario, email_usuario from usuarios where email_usuario = $1 and senha_usuario = $2"
  const doUserLogin: User[] = (await db.query(userLoginQuery, [emailUser, passwordUser])).rows
  
  if(doUserLogin.length === 0) return null
  return doUserLogin
}

export default {
  getUserByid,
  userLogin
}