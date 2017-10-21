import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'misOfrecimientos',
  templateUrl: 'misOfrecimientos.html'
})

export class MisOfrecimientosPage {

  ofrecimientos: string = 'pendientes';

  constructor(public navCtrl: NavController) { }

  ionViewWillEnter() {
  }

}