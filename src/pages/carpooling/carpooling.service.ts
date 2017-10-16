import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';

@Injectable()
export class CarpoolingService {

  constructor(protected request: ApiRequestService) { }

}