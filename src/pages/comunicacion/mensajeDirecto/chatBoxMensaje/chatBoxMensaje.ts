import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Comentario } from '../../../../app/models/comentario.model';

import { ComunicacionService } from '../../comunicacion.service';

@Component({
  selector: 'chatBoxMensaje',
  templateUrl: 'chatBoxMensaje.html'
})

export class ChatBoxMensajePage {
  @ViewChild(Content) content: Content;

  public by_me: boolean = false;
  public mensaje;
  public comentarios: Comentario[];
  private comentario: Comentario = {
    texto: '',
    fecha: new Date()
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ComunicacionService: ComunicacionService,
    public proveedor: NavParams) {
    this.mensaje = navParams.get("mensajeSeleccionado");
  }

  actualizar() {
    return this.ComunicacionService.getComentarios(this.mensaje.id).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.comentarios = response.data;
      }
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

  async comentar(comentario: Comentario) {
    try {
      const response = await this.ComunicacionService.comentar(this.mensaje.id, comentario);
      if (response.error) throw 'error';

      this.limpiarComentario();
      this.presentToast('Su mensaje ha sido enviado.');
      await this.actualizar();
      this.scrollBottom();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Mensaje no enviado',
        message: 'No es posible enviar su mensaje. Intente nuevamente',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
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

  limpiarComentario() {
    this.comentario.texto = '';
  }

  ionViewWillEnter() {
    this.actualizar();

  }

}