import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Comentario } from '../../../app/models/comentario.model';
import { ComunicacionService } from '../comunicacion.service';

import { ChatBoxMensajePage } from './chatBoxMensaje/chatBoxMensaje';
import { NuevoMensajeDirectoPage } from './nuevoMensajeDirecto/nuevoMensajeDirecto';

@Component({
  selector: 'mensajeDirecto',
  templateUrl: 'mensajeDirecto.html'
})

export class MensajeDirectoPage {
  @ViewChild(Content) content: Content;

  private mensajesDirectos;

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

  scrollBottom() {
    setTimeout(() => this.content.scrollToBottom(300), 300);
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  openChatBox() {
    this.navCtrl.push(ChatBoxMensajePage);
  }

  nuevoMensajeDirecto() {
    this.navCtrl.push(NuevoMensajeDirectoPage);
  }

  actualizar() {
    this.ComunicacionService.getMensajesDirectos().then(response => {
      if (response.error) {
        alert('No se lograron obtener publicaciones');
      } else {
        this.mensajesDirectos = response.data;
      }
    });
  }

  ionViewWillEnter() {
    this.actualizar();
  }

}