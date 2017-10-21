import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Viaje } from './viaje.model';
import { Trayecto } from './trayecto.model';

@Injectable()
export class CarpoolingService {

  constructor(protected request: ApiRequestService) { }

  registrarViaje(viaje: Viaje, trayectos: Trayecto[]) {
    return this.request.post<Viaje>(`carpooling`, { viaje, trayectos });
  }
}