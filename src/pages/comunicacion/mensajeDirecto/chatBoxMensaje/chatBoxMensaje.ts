import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { ComunicacionService } from '../../comunicacion.service';

@Component({
  selector: 'chatBoxMensaje',
  templateUrl: 'chatBoxMensaje.html'
})

export class ChatBoxMensajePage {
  @ViewChild(Content) content: Content;

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

  ionViewWillEnter() {
  }

}