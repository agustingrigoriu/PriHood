import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';

@Component({
  templateUrl: 'visitasDetalle.html'

})
export class VisitasDetallePage {

  visitante: any;
  id_Tipo_Visita: number;
  nombre_tipo_documento = ["DNI", "LE", "LC", "Otro"];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.visitante = navParams.get("visitante");
    this.id_Tipo_Visita = navParams.get("id_Tab");
  }

  dismiss() {
    this.navCtrl.pop();
  }

  esVisitanteFrecuente() {
    if (this.id_Tipo_Visita = 1) return true
    else return false;
  }


}