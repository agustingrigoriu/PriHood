import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ExpensasService } from './expensas.service';

import { Expensa } from '../../app/models/expensa.model';

@Component({
  selector: 'expensas',
  templateUrl: 'expensas.html'
})

export class ExpensasPage {

  private expensas: any[];

  constructor(private ExpensasService: ExpensasService, public alertCtrl: AlertController,) {
  }

  actualizar() {
    this.ExpensasService.getExpensas().then(response => {
      if (response.error) {
        const alertMessage = this.alertCtrl.create({
          title: 'Error',
          message: 'Problemas de conexión. Intente nuevamente',
          buttons: ['Ok']
        });
        alertMessage.present();
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