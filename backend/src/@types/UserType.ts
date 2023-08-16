export default interface User {
  id_usuario?: number,
  nome_usuario: string,
  login_usuario: string,
  senha_usuario: string,
  email_usuario: string,
  biografia_usuario: string,
  data_nascimento_usuario: string,
  data_cadastro_usuario?: string,
  data_login_usuario?: string,
  celular_usuario: string,
  usuario_ativo?: boolean
}