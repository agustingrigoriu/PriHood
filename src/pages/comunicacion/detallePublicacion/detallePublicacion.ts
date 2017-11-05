import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';

import { Comentario } from '../../../app/models/comentario.model';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'detallePublicacion',
  templateUrl: 'detallePublicacion.html'
})

export class DetallePublicacionPage {
  @ViewChild(Content) content: Content;

  public publicacion;
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
    public proveedor: NavParams,
    public loadingController: LoadingController) {
    this.publicacion = navParams.get("publicacion");
  }

  actualizar() {
    const loading = this.loadingController.create();
    loading.present();
    return this.ComunicacionService.getComentarios(this.publicacion.id).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.comentarios = response.data;
      }
      loading.dismiss();
    });
  }

  volver() {
    this.navCtrl.pop();
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
      const response = await this.ComunicacionService.comentar(this.publicacion.id, comentario);
      if (response.error) throw 'error';

      this.limpiarComentario();
      this.presentToast('Su comentario ha sido registrado.');
      await this.actualizar();
      this.scrollBottom();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Comentario no registrado',
        message: 'No es posible registrar su comentario',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  scrollBottom() {
    setTimeout(() => this.content.scrollToBottom(300), 300);
  }

  limpiarComentario() {
    this.comentario.texto = '';
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
    this.actualizar();
  }



}