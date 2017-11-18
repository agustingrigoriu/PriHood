import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';

import { TipoEvento } from '../../app/models/tipoEvento.model';
import { Evento } from '../../app/models/evento.model';
import { AsistenciaEvento } from '../../app/models/asistenciaEvento.model';
import { ComentarioEvento } from '../../app/models/comentarioEvento.model';

@Injectable()
export class EventosService {

  constructor(protected request: ApiRequestService) { }

  getEventos() {
    return this.request.get<Evento[]>(`eventos`);
  }

  registrarEvento(data) {
    return this.request.post<any>(`eventos`, data);
  }

  getTiposEventos() {
    return this.request.get<TipoEvento[]>(`tipos/eventos`);
  }

  getAsistenciaEvento(id_evento: Number) {
    return this.request.get<AsistenciaEvento[]>(`eventos/asistencias/${id_evento}`);
  }

  getComentarios(id_evento: Number) { 
    return this.request.get<ComentarioEvento[]>(`eventos/comentarios/${id_evento}`);
  }

  comentar(id_evento, data) {
    return this.request.post<any>(`eventos/${id_evento}/comentar`, data);
  }

  confirmarAsistencia(id_evento: Number) {
    return this.request.post<any>(`eventos/asistencias/${id_evento}`);
  }

  cancelarAsistencia(id_evento: Number) {
    return this.request.delete<any>(`eventos/asistencias/${id_evento}`);
  }
}