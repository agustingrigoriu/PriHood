import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

import { VisitanteService } from '../visitas.service';
import { VisitasPage } from '../visitas'

@Component({
  templateUrl: 'registroVisita.html'
})

export class RegistroVisitaPage {

  visita = {
    fecha_visita: new Date().toISOString(),
    id_tipo_visita: '1',//1 = "Tab Visitas Frecuentes" , 2 = "Tab Visitas Actuales"
    avatar: 'assets/img/pruebas/visitas/gabi.png'
  };

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams, private VisitanteService: VisitanteService,
    public toastCtrl: ToastController) {
    this.visita.id_tipo_visita = navParams.get("id_Tab") + '';
  }

  volver() {
    this.navCtrl.pop();
  }

  registrarVisita(visita) {
    if (this.esVisitaFrecuente()) {
      visita.fecha_visita = undefined;
    }
    this.VisitanteService.registrarVisita(visita).then(response => {
      if (response.error) {
        this.presentToast('No se pudo completar el registro de la visita.');
      } else {
        this.presentToast('La visita se ha registrado correctamente.');
        this.navCtrl.setRoot(VisitasPage);
      }
    });
  }

  esVisitaFrecuente() {
    return (this.visita.id_tipo_visita === '1');
  }

  fotoUpload() {
    let alert = this.alertCtrl.create({
      title: 'Imágen de visita',
      message: 'No es posible añadir una imagen a la visita',
      buttons: ['Ok']
    });
    alert.present()
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

}