export interface Usuario {
  id?: number;
  email: string;
  password: string;
  avatar: number;
  perfil: PerfilUsuario;
  //nombre de Usuario no deberia ir
}
