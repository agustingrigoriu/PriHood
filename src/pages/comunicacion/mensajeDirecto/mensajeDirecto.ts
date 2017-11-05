import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { Comentario } from '../../../app/models/comentario.model';
import { Publicacion } from '../../../app/models/publicacion.model';
import { ComunicacionService } from '../comunicacion.service';
import { LoginService } from '../../../services/login.service';

import { ChatBoxMensajePage } from './chatBoxMensaje/chatBoxMensaje';
import { NuevoMensajeDirectoPage } from './nuevoMensajeDirecto/nuevoMensajeDirecto';

@Component({
  selector: 'mensajeDirecto',
  templateUrl: 'mensajeDirecto.html'
})

export class MensajeDirectoPage {
  @ViewChild(Content) content: Content;

  private mensajesDirectos: any[] = [];
  private mensajeSeleccionado: Publicacion;
  private nombre_barrio;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ComunicacionService: ComunicacionService,
    public LoginService: LoginService,
    public proveedor: NavParams,
    public loadingController: LoadingController) {
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

  openChatBox(mensajeSeleccionado: Publicacion) {
    this.mensajeSeleccionado = mensajeSeleccionado;
    this.navCtrl.push(ChatBoxMensajePage, {
      mensajeSeleccionado: this.mensajeSeleccionado
    });;
  }

  nuevoMensajeDirecto() {
    this.navCtrl.push(NuevoMensajeDirectoPage);
  }

  actualizar() {
    const loading = this.loadingController.create();
    loading.present();
    this.nombre_barrio = this.LoginService.getSession().barrio.nombre;
    this.ComunicacionService.getMensajesDirectos().then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.mensajesDirectos = response.data;
      }
      loading.dismiss();
    });
  }

  alertaError() {
    const alertMessage = this.alertCtrl.create({
      title: 'Error',
      message: 'Problemas de conexión. Intente nuevamente',
      buttons: ['Ok']
    });
    alertMessage.present();
  }

  noHayMensajes() {
    return (this.mensajesDirectos.length === 0);
  }

  ionViewWillEnter() {
    this.actualizar();
  }

}