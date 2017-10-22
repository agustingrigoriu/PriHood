import { Component } from '@angular/core';
import { App, AlertController, NavController, NavParams } from 'ionic-angular';

import { DatePipe } from '@angular/common';
import { VisitasDetallePage } from '../visitasDetalle/visitasDetalle';
import { RegistroVisitaPage } from '../registroVisita/registroVisita';
import { VisitanteService } from '../visitas.service'

@Component({
  templateUrl: 'visitasActuales.html'
})

export class VisitasActualesTab {
  private visitantes: any[] = [];
  private visitante: any;
  private loading: boolean = true;

  id_Tab = 2; //Tab de Visitas Actuales
  nombre_tipo_documento = ["DNI", "LE", "LC", "Otro"];

  constructor(public navCtrl: NavController, public app: App,
    public navParams: NavParams, private VisitanteService: VisitanteService, public alertCtrl: AlertController) {
  }

  pageRegistrarVisita() {
    this.navCtrl.push(RegistroVisitaPage, {
      id_Tab: this.id_Tab
    });;
  }

  ionViewWillEnter() {
    this.actualizar();
  }

  actualizar() {
    this.loading = true;
    this.VisitanteService.getVisitas(this.id_Tab).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.visitantes = response.data;
        this.loading = false;
      }
    });
  }

  alertaError() {
    const alertMessage = this.alertCtrl.create({
      title: 'Error',
      message: 'Problemas de conexión. Intente nuevamente',
      buttons: ['Ok']
    });
    alertMessage.present();
  }

  onSelectVisitante(visitante) {
    this.visitante = visitante;
    this.pageDetalleVisita();
  }

  pageDetalleVisita() {
    this.navCtrl.push(VisitasDetallePage, {
      visitante: this.visitante,
      id_Tab: this.id_Tab
    });;
  }

  noHayVisitas() {
    return (!this.loading && this.visitantes.length === 0);
  }

}