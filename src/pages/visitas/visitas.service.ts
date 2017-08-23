import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Visitante } from '../../app/models/visitante.model';

@Injectable()
export class VisitanteService {
  constructor(protected request: ApiRequestService) { }

  registrarVisita(data) {
    return this.request.post<any>(`visitas`, data);
  }

  //Ver planteo de APIs
  getVisitas(idTipoVisita: Number){
    return this.request.get<Visitante[]>(`visitas/tipo-visita/${idTipoVisita}`);
  }

}