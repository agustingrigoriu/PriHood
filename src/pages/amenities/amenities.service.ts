import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';
import { Proveedor } from '../../app/models/proveedor.model';
import { ComentarioProveedor } from '../../app/models/comentarioProveedor.model';
import { TipoAmenity } from '../../app/models/tipoAmenity.model';
import { Amenity } from '../../app/models/amenity.model';

@Injectable()
export class AmenitiesService {

  constructor(protected request: ApiRequestService) { }

  getTiposAmenities() {
    return this.request.get<TipoAmenity[]>(`tipos/amenities`);
  }

  getListaAmenities(idTipoAmenity: number){
    return this.request.get<Amenity[]>(`amenities/${idTipoAmenity}`);
  }

}