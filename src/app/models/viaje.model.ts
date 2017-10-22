import { Trayecto } from './trayecto.model';

export interface Viaje {
  id?: number,
  autoAsientos?: number,
  autoColor?: string,
  autoModelo?: string,
  autoPatente?: string,
  destino?: string,
  fecha?: Date,
  idDiaSemana?: number,
  observaciones?: string
  saleBarrio?: boolean,
  tipo?: string,
  nombreBarrio?: string,
  resitente?: string,
  trayectos?: Trayecto[]
}