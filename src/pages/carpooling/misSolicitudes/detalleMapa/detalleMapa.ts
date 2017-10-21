import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'detalleMapa',
  templateUrl: 'detalleMapa.html'
})

export class DetalleMapaPage {

  constructor(public navCtrl: NavController) { }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

}