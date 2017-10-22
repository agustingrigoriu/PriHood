import { Viaje } from './viaje.model';
import { EstadoSolicitud } from './estadoSolicitud.model';

export interface SolicitudViaje {
  id?: number;
  id_residente: number;
  viaje: Viaje;
  estadoSolicitud: EstadoSolicitud;
  fecha: Date;
}

