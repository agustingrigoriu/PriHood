import { Turno } from './turno.model';

export interface Amenity {
  id: number;
  ubicacion: string;
  nombre: string;
  descripcion: string;
  telefono: string;
  id_tipo_amenity: number;
  id_barrio: number;
  turnos?: Turno[];
}
