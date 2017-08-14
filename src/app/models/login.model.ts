import { Usuario } from './usuario.model';

export interface Login {
  token: string,
  usuario: Usuario
}