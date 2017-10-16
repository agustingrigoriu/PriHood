import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NuevoOfrecimientoMapaPage } from '../nuevoOfrecimientoMapa/nuevoOfrecimientoMapa';

@Component({
  selector: 'nuevoOfrecimiento',
  templateUrl: 'nuevoOfrecimiento.html'
})

export class NuevoOfrecimientoPage {

  asientos: number = 1;
  esRecurrente: boolean = false;
  id_dia_semana: number = 1;

  constructor(public navCtrl: NavController) { }

  volver() {
    this.navCtrl.pop();
  }

  siguiente() {
    this.navCtrl.push(NuevoOfrecimientoMapaPage);
  }

  ionViewWillEnter() {
  }

}