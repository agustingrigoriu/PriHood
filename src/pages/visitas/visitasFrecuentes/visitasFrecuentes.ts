import { Component } from '@angular/core';
import { App, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';

import { Visitante } from '../../../app/models/visitante.model'

import { VisitasDetallePage } from '../visitasDetalle/visitasDetalle';
import { RegistroVisitaPage } from '../registroVisita/registroVisita';
import { VisitanteService } from '../visitas.service'

@Component({
  templateUrl: 'visitasFrecuentes.html'
})

export class VisitasFrecuentesTab {
  private visitantes: any[] = [];
  private visitante: any;
  private cargando: boolean = true;

  id_Tab = 1; //Tab de Visitas Frecuentes
  nombre_tipo_documento = ["DNI", "LE", "LC", "Otro"];

  constructor(public alertCtrl: AlertController, public app: App,
    public navParams: NavParams,
    private VisitanteService: VisitanteService,
    private navCtlr: NavController,
    private loadingController: LoadingController) {
  }

  ionViewWillEnter() {
    this.actualizar();
  }

  pageRegistrarVisita() {
    this.navCtlr.push(RegistroVisitaPage, {
      id_Tab: this.id_Tab
    });;
  }

  actualizar() {
    const loading = this.loadingController.create();
    loading.present();
    this.cargando = true;
    this.VisitanteService.getVisitas(this.id_Tab).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.visitantes = response.data;
        this.cargando = false;
      }
      loading.dismiss();

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
    this.navCtlr.push(VisitasDetallePage, {
      visitante: this.visitante,
      id_Tab: this.id_Tab
    });;
  }

  noHayVisitas() {
    return (!this.cargando && this.visitantes.length === 0);
  }

}