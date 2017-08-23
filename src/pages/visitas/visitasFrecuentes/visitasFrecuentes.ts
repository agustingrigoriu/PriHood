import { Component } from '@angular/core';
import { App, AlertController, NavController, NavParams } from 'ionic-angular';

import { VisitasDetallePage } from '../visitasDetalle/visitasDetalle';
import { RegistroVisitaPage } from '../registroVisita/registroVisita';
import { VisitanteService } from '../visitas.service'

@Component({
  templateUrl: 'visitasFrecuentes.html'
})

export class VisitasFrecuentesTab {
  private visitantes: any;

  id_Tab = 1; //Tab de Visitas Frecuentes
  nombre_tipo_documento = ["DNI", "LE", "LC", "Otro"];


  constructor(public alertCtrl: AlertController, public app: App,
    public navParams: NavParams,
    private VisitanteService: VisitanteService) {
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
    this.VisitanteService.getVisitas(1).then(response => {
      if (response.error) {
        alert('No se obtener las visitas registradas');
      } else {
        this.visitantes = response.data;
      }
    });
  }

  cargarVisitasPrueba() {
    this.visitantes = [
      {
        nombre: "Agustin",
        apellido: "Gregorieu",
        tipo_documento: "DNI",
        numero_documento: "38509890",
        patente: "ASD 123",
        imagen: "assets/img/pruebas/ronaldo.png",
        observaciones: "No existen observaciones"
      },
      {
        nombre: "Patricio",
        apellido: "Perez",
        tipo_documento: "DNI",
        numero_documento: "38650209",
        patente: "FJA 999",
        imagen: "assets/img/pruebas/messi.png",
        observaciones: "No existen observaciones"
      },
      {
        nombre: "Patricio",
        apellido: "Perez",
        tipo_documento: "DNI",
        numero_documento: "38650209",
        patente: "FJA 999",
        imagen: "assets/img/pruebas/messi.png",
        observaciones: "No existen observaciones"
      }
    ]
  }




}