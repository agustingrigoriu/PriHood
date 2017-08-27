import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

import { ProveedorService } from '../proveedores.service';
import { ProveedoresPage } from '../proveedores'


@Component({
  templateUrl: 'registroProveedor.html'
})

export class RegistroProveedorPage {

  proveedor = {
    avatar: 'assets/img/pruebas/piscinas.png'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public ProveedorService: ProveedorService ) {
  }

  volver() {
    this.navCtrl.pop();
  }

  registrarProveedor(proveedor) {
    this.ProveedorService.registrarProveedor(proveedor).then(response => {
      if (response.error) {
        this.presentToast('No se pudo completar el registro del servicio.');
      } else {
        this.presentToast('El servicio se ha registrado correctamente.');
        this.navCtrl.setRoot(ProveedoresPage);
      }
    });
  }

  uploadImage() {
    console.log("asdasdas");
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