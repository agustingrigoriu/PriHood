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
  private visitantes: any;

  id_Tab = 2; //Tab de Visitas Actuales
  nombre_tipo_documento = ["DNI", "LE", "LC", "Otro"];

  constructor(public navCtrl: NavController, public app: App,
    public navParams: NavParams, private VisitanteService: VisitanteService) {
  }

  pageRegistrarVisita() {
    this.app.getRootNav().push(RegistroVisitaPage, {
      id_Tab: this.id_Tab
    });;
  }

  ionViewWillEnter() {
    this.actualizar();
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

}