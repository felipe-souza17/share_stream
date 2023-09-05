import bcrypt from "bcryptjs"

export default async function validateUserLogin(password: string, hash: string) {
  const isChecked =  bcrypt.compare(password, hash)
  return isChecked
}