import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'nuevaSolicitud',
  templateUrl: 'nuevaSolicitud.html'
})

export class NuevaSolicitudPage {

  constructor(public navCtrl: NavController) { }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

}