import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';

@Injectable()
export class ComunicacionService {

  constructor(protected request: ApiRequestService) { }

  getPublicaciones() {
    return this.request.get<any>(`publicaciones/listado`);
  }

  getComentarios(id_publicacion) {
    return this.request.get<any>(`publicaciones/comentarios/${id_publicacion}`);
  }

}