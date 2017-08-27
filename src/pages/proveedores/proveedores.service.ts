import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Proveedor } from '../../app/models/proveedor.model';

@Injectable()
export class ProveedorService {
  constructor(protected request: ApiRequestService) { }

  registrarProveedor(data) {
    return this.request.post<any>(`proveedores`, data);
  }

}