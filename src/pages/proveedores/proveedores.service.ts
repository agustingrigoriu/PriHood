import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Proveedor } from '../../app/models/proveedor.model';
import { ComentarioProveedor } from '../../app/models/comentarioProveedor.model';
import { TipoServicio } from '../../app/models/tipoServicio.model';

@Injectable()
export class ProveedorService {
  constructor(protected request: ApiRequestService) { }

  registrarProveedor(data) {
    return this.request.post<any>(`proveedores`, data);
  }

  getProveedores() {
    return this.request.get<Proveedor[]>(`proveedores`);
  }

  getProveedoresTipoServicio(idTipoServicio: Number) {
    return this.request.get<Proveedor[]>(`proveedores/${idTipoServicio}`);
  }

  getTiposServicios() {
    return this.request.get<TipoServicio[]>(`tipos/servicio`);
  }

  getComentarios(idProveedor) {
    return this.request.get<ComentarioProveedor[]>(`proveedores/${idProveedor}/comentarios`);
  }

  votar(id_proveedor, data){
    return this.request.post<any>(`proveedores/${id_proveedor}/votar`, data);
  }
}