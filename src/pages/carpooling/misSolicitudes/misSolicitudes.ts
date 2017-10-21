import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetalleMiSolicitudPage } from './detalleMiSolicitud/detalleMiSolicitud';

@Component({
  selector: 'misSolicitudes',
  templateUrl: 'misSolicitudes.html'
})

export class MisSolicitudesPage {

  constructor(public navCtrl: NavController) { }

  verDetalleSolicitud() { 
    this.navCtrl.push(DetalleMiSolicitudPage);
  }

  ionViewWillEnter() {
  }

}