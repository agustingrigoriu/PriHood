import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../../services/api.request.service';

@Injectable()
export class RegistroVisitaService {
  constructor(protected request: ApiRequestService) { }

  registrarVisita(data) {
    return this.request.post<any>(`visitas`, data);
  }

}