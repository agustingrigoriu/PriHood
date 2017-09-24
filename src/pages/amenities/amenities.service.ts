import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Proveedor } from '../../app/models/proveedor.model';
import { ComentarioProveedor } from '../../app/models/comentarioProveedor.model';
import { TipoAmenity } from '../../app/models/tipoAmenity.model';
import { Amenity } from '../../app/models/amenity.model';
import { MiReserva } from '../../app/models/miReserva.model';

@Injectable()
export class AmenitiesService {

  constructor(protected request: ApiRequestService) { }

  getTiposAmenities() {
    return this.request.get<TipoAmenity[]>(`tipos/amenities`);
  }

  getListaAmenities(idTipoAmenity: number, fecha: string) {
    return this.request.get<Amenity[]>(`amenities/${idTipoAmenity}/${fecha}`);
  }

  getTurnosAmenity(idAmenity: number, fecha: string) {
    return this.request.get<Amenity>(`turnos/${idAmenity}/${fecha}`);
  }

  reservarTurno(idTurno: number, data) {
    return this.request.post<any>(`turnos/${idTurno}/reservar`, data);
  }

  getReservas() {
    return this.request.get<MiReserva[]>(`turnos/reservas`);
  }

  cancelarReserva(id_reserva: number) {
    return this.request.put<any>(`turnos/reservas/${id_reserva}/cancelar`)
  }

}