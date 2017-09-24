import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Voto } from '../../../app/models/voto.model';

import { ProveedorService } from '../proveedores.service';

@Component({
  selector: 'valorarProveedor',
  templateUrl: 'valorarProveedor.html'
})

export class ValorarProveedorPage {

  private tipos_servicio: any[] = [];
  private proveedor: any;
  private comentarios: any[];
  private voto: Voto = {
    comentario: '',
    rating: 3
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ProveedorService: ProveedorService) {
    this.proveedor = navParams.get("proveedor");
  }

  volver() {
    this.navCtrl.pop();
  }

  async getComentarios() {
    try {
      const response = await this.ProveedorService.getComentarios(this.proveedor.id);
      if (response.error) throw 'error';
      this.comentarios = response.data;
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Sin conexión',
        message: 'No se pudo cargar los comentarios de este servicio',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  async votar(voto: Voto) {
    try {
      const response = await this.ProveedorService.votar(this.proveedor.id, voto);
      if (response.error) throw 'error';
      this.getComentarios();
      this.presentToast('Su calificación ha sido registrada.');
      this.limpiarVoto();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Calificación no registrada',
        message: 'No es posible calificar nuevamente a este servicio',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  ionViewWillEnter() {
    this.getComentarios();
  }

  limpiarVoto() {
    this.voto.comentario = '';
    this.voto.rating = 3;
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