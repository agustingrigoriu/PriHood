import { Usuario } from './usuario.model';
import { Barrio } from './barrio.model';

export interface Login {
  token: string,
  usuario: Usuario
  barrio: Barrio
}