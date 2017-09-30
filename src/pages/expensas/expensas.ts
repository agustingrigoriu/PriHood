import { Component } from '@angular/core';
import { ExpensasService } from './expensas.service';

import { Expensa } from '../../app/models/expensa.model';

@Component({
  selector: 'expensas',
  templateUrl: 'expensas.html'
})

export class ExpensasPage {

  private expensas: any[];

  constructor(private ExpensasService: ExpensasService) {
  }

  actualizar() {
    this.ExpensasService.getExpensas().then(response => {
      if (response.error) {
        alert('No se lograron obtener las expensas');
      } else {
        this.expensas = response.data;
      }
    });
  }

  noHayPublicaciones() {
    return (this.expensas.length === 0);
  }

  openExpensa(expensa: Expensa){
    window.open(expensa.url_expensa, '_blank');
  }

  downloadExpensa(expensa: Expensa){
  }

  ionViewWillEnter() {
    this.actualizar();
  }

}