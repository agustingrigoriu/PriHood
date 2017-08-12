import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../../services/api.request.service';
import { Barrio } from '../../../app/models/barrio.model';
import { Residencia } from '../../../app/models/residencia.model';
import { Persona } from '../../../app/models/persona.model';
import { Residente } from '../../../app/models/residente.model';
import { Usuario } from '../../../app/models/usuario.model';

@Injectable()
export class RegistroUsuarioService {
  constructor(protected request: ApiRequestService) { }

  registrarUsuario(data) {
    return this.request.post<any>(`usuarios/usuarioresidente`, data);
  }

}