import { Component } from '@angular/core';
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
        nombre: "Gabriela Caballero",
        dni: "38509890",
        horario: "Todo el dia",
        patente: "ASD 123",
        imagen: "assets/img/pruebas/fondoAzul.png"
      },
      {
        nombre: "Belen Valdivia",
        dni: "38509890",
        patente: "ASD 123",
        horario: "16:00 a 21:00 hs",
        imagen: "assets/img/pruebas/fondoAzul.png"
      },
      {
        nombre: "Belen Valdivia",
        dni: "38509890",
        patente: "ASD 123",
        horario: "16:00 a 21:00 hs",
        imagen: "assets/img/pruebas/fondoAzul.png"
      },
      {
        nombre: "Belen Valdivia",
        dni: "38509890",
        patente: "ASD 123",
        horario: "16:00 a 21:00 hs",
        imagen: "assets/img/pruebas/fondoAzul.png"
      }
    ]
  }

}