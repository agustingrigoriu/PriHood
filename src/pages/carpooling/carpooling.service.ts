import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Viaje } from '../../app/models/viaje.model';
import { Trayecto } from '../../app/models/trayecto.model';
import { SolicitudViaje } from '../../app/models/solicitudViaje.model';

@Injectable()
export class CarpoolingService {

  constructor(protected request: ApiRequestService) { }

  registrarSolicitud(viaje: Viaje) {
    return this.request.post<any>(`carpooling/solicitar_viaje/${viaje.id}`);
  }

  registrarViaje(viaje: Viaje, trayectos: Trayecto[]) {
    return this.request.post<Viaje>(`carpooling`, { viaje, trayectos });
  }

  getViajes(fecha) {
    return this.request.get<Viaje[]>(`carpooling/viajes/${fecha}`);
  }

  getMisOfrecimientos() {
    return this.request.get<any[]>(`carpooling/ofrecimientos`);
  }

  getMisSolicitudes() {
    return this.request.get<Viaje[]>(`carpooling/solicitudes`);
  }

  aceptarRechazarSolicitud(id_solicitud_viaje: number, estado_solicitud: string) {
    return this.request.post<any>(`carpooling/ofrecimientos/${id_solicitud_viaje}`, { estado_solicitud });
  }

}