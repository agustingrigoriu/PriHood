import { Injectable } from '@angular/core';
import { ApiRequestService } from '../../services/api.request.service';

@Injectable()
export class ExpensasService {

  constructor(protected request: ApiRequestService) { }

  getExpensas() {
    return this.request.get<any>(`expensas`);
  }

}