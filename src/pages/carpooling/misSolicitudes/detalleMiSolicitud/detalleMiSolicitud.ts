import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'detalleMiSolicitud',
  templateUrl: 'detalleMiSolicitud.html'
})

export class DetalleMiSolicitudPage {

  constructor(public navCtrl: NavController) { }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

}