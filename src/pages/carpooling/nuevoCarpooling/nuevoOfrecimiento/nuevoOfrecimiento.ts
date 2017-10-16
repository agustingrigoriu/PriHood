import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'nuevoOfrecimiento',
  templateUrl: 'nuevoOfrecimiento.html'
})

export class NuevoOfrecimientoPage {

  constructor(public navCtrl: NavController) { }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

}