import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

import { ProveedorService } from '../proveedores.service';
import { ProveedoresPage } from '../proveedores'


@Component({
  templateUrl: 'registroProveedor.html'
})

export class RegistroProveedorPage {

  private tipos_servicio: any[] = [];

  proveedor = {
    id_tipo_servicio: '',
    cantidad_votos: 1,
    avatar: 'assets/img/pruebas/proveedores/piscinas.png'
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public ProveedorService: ProveedorService) {
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
    //completar con alert
  }

  //hardcodeo solo para mostrar en presentacion
  cambiarImagen(id_tipo_servicio) {
    console.log(id_tipo_servicio);
    switch (id_tipo_servicio) {
      case '1': this.proveedor.avatar = 'assets/img/pruebas/proveedores/piscinas.png';
        break;
      case '2': this.proveedor.avatar = 'assets/img/pruebas/proveedores/jardineria.png';
        break;
      case '3': this.proveedor.avatar = 'assets/img/pruebas/proveedores/plomero.png';
        break;
      case '4': this.proveedor.avatar = 'assets/img/pruebas/proveedores/gasista.png';
        break;
      case '5': this.proveedor.avatar = 'assets/img/pruebas/proveedores/fumigacion.png';
        break;
      default: this.proveedor.avatar = 'assets/img/pruebas/proveedores/piscinas.png';
        break;
    }
    console.log(this.proveedor.avatar);

  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  cargarTiposDeServicio() {
    this.ProveedorService.getTiposServicios().then(response => {
      if (response.error) {
        alert('No se logró obtener los tipos de servicios');
      } else {
        this.tipos_servicio = response.data;
      }
    });
  }

  servicioSeleccionado(tipo_servicio) {
    this.proveedor.id_tipo_servicio = tipo_servicio;
    this.cambiarImagen(this.proveedor.id_tipo_servicio);
  }

  ngOnInit() {
    this.cargarTiposDeServicio();
  }

}