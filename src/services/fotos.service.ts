import { Injectable } from '@angular/core';
import { ApiRequestService } from './api.request.service';
import { Usuario } from '../app/models/usuario.model';
import { Login } from '../app/models/login.model';

@Injectable()
export class FotosService {
  constructor(private api: ApiRequestService) { }

  cargar(file: File) {
    return this.api.upload<string>('fotos/cargar', {}, file, 'file');
  }
}