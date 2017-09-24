import { Turno } from './turno.model';

export interface Reserva {
  id?: number;
  fecha: Date,
  observaciones: string,
  costo: number,
  estado: string
}