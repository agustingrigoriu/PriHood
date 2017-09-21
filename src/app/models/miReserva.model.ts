import { Reserva } from './reserva.model';
import { Turno } from './turno.model';
import { Amenity } from './amenity.model';

export interface MiReserva {
  reserva: Reserva,
  turno: Turno,
  amenity: Amenity
}