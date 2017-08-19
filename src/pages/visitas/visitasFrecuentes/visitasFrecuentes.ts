import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'visitasFrecuentes.html'
})

export class VisitasFrecuentesTab {
  public visitas: any;

  constructor(public alertCtrl: AlertController) {
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

  agregarVisita() {
    let alert = this.alertCtrl.create({
      title: 'Agregar visita frecuente',
      message: 'Estamos trabajando en su construccion.',
      buttons: ['Ok']
    });
    alert.present()
  }

  cargarVisitasPrueba() {
    this.visitas = [
      {
        nombre: "Agustin Gregorieu",
        dni: "38509890",
        horario: "Todo el dia",
        patente: "ASD 123",
        imagen: "assets/img/pruebas/ronaldo.png"
      },
      {
        nombre: "Patricio Perez",
        dni: "38509890",
        patente: "ASD 123",
        horario: "16:00 a 21:00 hs",
        imagen: "assets/img/pruebas/messi.png"
      },
      {
        nombre: "Patricio Perez",
        dni: "38509890",
        patente: "ASD 123",
        horario: "16:00 a 21:00 hs",
        imagen: "assets/img/pruebas/messi.png"
      }
    ]
  }


}