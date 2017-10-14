import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { TipoAlerta } from '../../app/models/tipoAlerta.model'

@Injectable()
export class AlertasService {

  constructor(protected request: ApiRequestService) { }

  getTiposAlertas() {
    return this.request.get<TipoAlerta[]>(`tipos/alertas`);
  }

  generarAlerta(data) {
    return this.request.post<any>(`alertas`, data);
  }
}