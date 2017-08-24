import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'visitasDetalle.html'

})
export class VisitasDetallePage {

  visitante: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.visitante = navParams.get("visitante");
  }

  dismiss() {
    this.navCtrl.pop();
  }


}