import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { ComunicacionService } from '../../comunicacion.service';
import { Publicacion } from '../../../../app/models/publicacion.model';

@Component({
  selector: 'nuevoMensajeDirecto',
  templateUrl: 'nuevoMensajeDirecto.html'
})

export class NuevoMensajeDirectoPage {
  @ViewChild(Content) content: Content;

  private mensajeDirecto: Publicacion = {
    titulo: '',
    texto: '',
    fecha: new Date()
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ComunicacionService: ComunicacionService,
    public proveedor: NavParams) {
  }

  volver() {
    this.navCtrl.pop();
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  async publicarMensajeDirecto(mensajeDirecto: Publicacion) {
    try {
      const response = await this.ComunicacionService.publicarMensajeDirecto(mensajeDirecto);
      if (response.error) throw 'error';
      this.presentToast('Su mensaje ha sido enviado.');
      this.volver();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Mensaje no enviado',
        message: 'No es posible enviar su mensaje',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

}