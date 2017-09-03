import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Voto } from '../../../app/models/voto.model';

import { ProveedorService } from '../proveedores.service';

@Component({
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
      alert('No se pudo obtener los comentarios')
    }
  }

  async votar(voto: Voto) {
    try {
      const response = await this.ProveedorService.votar(this.proveedor.id, voto);
      if (response.error) throw 'error';
      this.getComentarios();
    } catch (error) {
      alert('No se pudo registrar la valoración')
    }
  }

  ionViewWillEnter() {
    this.getComentarios();
  }
}