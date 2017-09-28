import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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
    public proveedor: NavParams) {
    this.publicacion = navParams.get("publicacion");
  }

  actualizar() {
    return this.ComunicacionService.getComentarios(this.publicacion.id).then(response => {
      if (response.error) {
        alert('No se lograron obtener publicaciones');
      } else {
        this.comentarios = response.data;
      }
    });
  }

  volver() {
    this.navCtrl.pop();
  }

  async comentar(comentario: Comentario) {
    try {
      const response = await this.ComunicacionService.comentar(this.publicacion.id, comentario);
      if (response.error) throw 'error';

      this.limpiarComentario();
      this.presentToast('Su calificación ha sido registrada.');
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