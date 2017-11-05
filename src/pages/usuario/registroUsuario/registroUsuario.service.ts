import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../../services/api.request.service';

@Injectable()
export class RegistroUsuarioService {
  constructor(protected request: ApiRequestService) { }

  registrarUsuario(data) {
    return this.request.post<any>(`usuarios/residente`, data);
  }
}