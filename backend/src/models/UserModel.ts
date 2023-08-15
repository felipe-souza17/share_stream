import User from '../@types/UserType'
import db from '../db/config'

const getUserByid = async (userId: number) => {
  const idUser = userId
  const getUserByIdQuery = "select * from usuarios where id_usuario = $1"
  const searchedUser: User[] = (await db.query(getUserByIdQuery, [idUser])).rows
  
  if(searchedUser.length === 0) return null
  return searchedUser
}

export default {
  getUserByid
}