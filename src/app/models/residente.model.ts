import { Persona } from './persona.model';
import { Residencia } from './residencia.model';
import { Usuario } from './usuario.model';

export interface Residente {
  id?: number;
  persona: Persona;
  residencia: Residencia;
  usuario: Usuario;
  //fechaIngreso?
  
}
