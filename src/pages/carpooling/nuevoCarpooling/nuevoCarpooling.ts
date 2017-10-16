import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NuevaSolicitudPage } from './nuevaSolicitud/nuevaSolicitud';
import { NuevoOfrecimientoPage } from './nuevoOfrecimiento/nuevoOfrecimiento';

@Component({
  selector: 'nuevoCarpooling',
  templateUrl: 'nuevoCarpooling.html'
})

export class NuevoCarpoolingPage {

  constructor(public navCtrl: NavController) { }

  openNuevoOfrecimiento() {
    this.navCtrl.push(NuevoOfrecimientoPage);
  }

  openNuevaSolicitud() {
    this.navCtrl.push(NuevaSolicitudPage);
  }

  ionViewWillEnter() {
  }

}