import { Component } from '@angular/core';
import { App, AlertController, NavController, NavParams} from 'ionic-angular';

import { VisitasDetallePage } from '../visitasDetalle/visitasDetalle';
import { RegistroVisitaPage } from '../registroVisita/registroVisita';
import { VisitanteService } from '../visitas.service'

@Component({
  templateUrl: 'visitasFrecuentes.html'
})

export class VisitasFrecuentesTab {
  private visitas: any;

  id_Tab = 1; //Tab de Visitas Frecuentes

  constructor(public alertCtrl: AlertController, public app: App, 
  public navParams: NavParams,
  private VisitanteService: VisitanteService) {
    this.cargarVisitasPrueba();
  }

  pageRegistrarVisita() {
    this.app.getRootNav().push(RegistroVisitaPage, {
      id_Tab: this.id_Tab
    });;
  }

  actualizar() {
    const id_residente = 1; //Ver planteo de api
    this.VisitanteService.getVisitas(id_residente, 1).then(response => {
      if (response.error) {
        alert('No se obtener las visitas registradas');
      } else {
        this.visitas = response.data;
      }
    });
  }

  cargarVisitasPrueba() {
    this.visitas = [
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