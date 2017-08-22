import { Component } from '@angular/core';
import { DatePipe } from '@angular/common'
import { App, AlertController, NavController, NavParams } from 'ionic-angular';

import { RegistroVisitaPage } from '../registroVisita/registroVisita';

@Component({
  templateUrl: 'visitasActuales.html'
})

export class VisitasActualesTab {
  public visitas: any;
    id_Tab = 2; //Tab de Visitas Actuales


  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public app: App, public navParams:NavParams) {
    this.cargarVisitasPrueba();
  }

  menu() {
    let alert = this.alertCtrl.create({
      title: 'Menu Principal',
      message: 'Estamos trabajando en su construccion.',
      buttons: ['Ok']
    });
    alert.present()
  }

  pageRegistrarVisita() {
    this.app.getRootNav().push(RegistroVisitaPage, {
      id_Tab: this.id_Tab
    });;
  }

  cargarVisitasPrueba() {
    this.visitas = [
      {
        nombre: "Gabriela",
        apellido: "Caballero",
        tipo_documento: "DNI",
        numero_documento: "38509890",
        fecha: new Date(),
        observaciones: "No existen",
      },
      {
        nombre: "Belen",
        apellido: "Valdivia",
        tipo_documento: "DNI",
        numero_documento: "38909878",
        fecha: new Date(),
        observaciones: "No existen",
      }
    ]
  }

}