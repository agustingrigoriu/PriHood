import { Barrio } from './barrio.model';

export interface Residencia {
  id?: number;
  nombre: string;
  ubicacion: string;
  codigo: string;
  idBarrioNavigation?: Barrio;
}
