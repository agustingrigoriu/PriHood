import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NuevoOfrecimientoMapaPage } from '../nuevoOfrecimientoMapa/nuevoOfrecimientoMapa';

import { Viaje } from '../../viaje.model';

@Component({
  selector: 'nuevoOfrecimiento',
  templateUrl: 'nuevoOfrecimiento.html'
})

export class NuevoOfrecimientoPage {

  viaje: Viaje;
  esRecurrente: boolean = false;

  constructor(public navCtrl: NavController) {
    this.viaje = {};
  }

  volver() {
    this.navCtrl.pop();
  }

  siguiente() {
    if (this.esRecurrente) {
      this.viaje.fecha = null;
    } else {
      this.viaje.idDiaSemana = null;
    }

    this.navCtrl.push(NuevoOfrecimientoMapaPage, { viaje: this.viaje });
  }

  ionViewWillEnter() {
  }

}