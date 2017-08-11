import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../../services/api.request.service';
import { Barrio } from '../../../app/models/barrio.model'
import { Residencia } from '../../../app/models/residencia.model'

@Injectable()
export class CodigoRegistroService {
  constructor(protected request: ApiRequestService) { }

  verificarCodigo(data) {
    return this.request.post<Residencia>(`residencias/codigo`, data);
  }

}