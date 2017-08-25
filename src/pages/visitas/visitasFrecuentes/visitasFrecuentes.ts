import { Component } from '@angular/core';
import { App, AlertController, NavController, NavParams } from 'ionic-angular';

import { Visitante } from '../../../app/models/visitante.model'

import { VisitasDetallePage } from '../visitasDetalle/visitasDetalle';
import { RegistroVisitaPage } from '../registroVisita/registroVisita';
import { VisitanteService } from '../visitas.service'

@Component({
  templateUrl: 'visitasFrecuentes.html'
})

export class VisitasFrecuentesTab {
  private visitantes: any;
  private visitante: any;

  id_Tab = 1; //Tab de Visitas Frecuentes
  nombre_tipo_documento = ["DNI", "LE", "LC", "Otro"];

  constructor(public alertCtrl: AlertController, public app: App,
    public navParams: NavParams,
    private VisitanteService: VisitanteService,
    private navCtlr: NavController) {
  }

  ionViewWillEnter() {
    this.actualizar();
  }

  pageRegistrarVisita() {
    this.app.getRootNav().push(RegistroVisitaPage, {
      id_Tab: this.id_Tab
    });;
  }

  actualizar() {
    this.VisitanteService.getVisitas(this.id_Tab).then(response => {
      if (response.error) {
        alert('No se obtener las visitas registradas');
      } else {
        this.visitantes = response.data;
      }
    });
  }

  onSelectVisitante(visitante) {
    this.visitante = visitante;
    this.pageDetalleVisita();
  }

  pageDetalleVisita() {
    this.app.getRootNav().push(VisitasDetallePage, {
      visitante: this.visitante,
      id_Tab: this.id_Tab
    });;
  }

}