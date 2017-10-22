import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetalleMiSolicitudPage } from './detalleMiSolicitud/detalleMiSolicitud';
import { CarpoolingService } from '../carpooling.service';
import { Viaje } from '../../../app/models/viaje.model';

@Component({
  selector: 'misSolicitudes',
  templateUrl: 'misSolicitudes.html'
})

export class MisSolicitudesPage {
  public viajes: Viaje[];

  constructor(public navCtrl: NavController, public CarpoolingService: CarpoolingService) {
    this.viajes = [];
  }

  verDetalleSolicitud(viaje) {
    this.navCtrl.push(DetalleMiSolicitudPage, { viaje });
  }

  ionViewWillEnter() {
    this.actualizar();
  }

  async actualizar() {
    try {
      const response = await this.CarpoolingService.getMisSolicitudes();

      if (response.error) {
        throw 'error';
      }

      this.viajes = response.data;
    } catch (error) {
      alert('No se pudieron cargar las solicitudes.');
    }
  }
}