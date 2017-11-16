import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProveedorService } from '../proveedores.service';
import { ProveedoresPage } from '../proveedores'


@Component({
  templateUrl: 'registroProveedor.html'
})

export class RegistroProveedorPage {

  private tipos_servicio: any[] = [];

  formProveedor: FormGroup;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public ProveedorService: ProveedorService,
    public formBuilder: FormBuilder) {

    this.formProveedor = formBuilder.group({
      id_tipo_servicio: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      telefono: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[0-9]*'), Validators.required])],
      direccion: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      avatar: ['']
    });
  }

  volver() {
    this.navCtrl.pop();
  }

  registrarProveedor() {
    this.ProveedorService.registrarProveedor(this.formProveedor.value).then(response => {
      if (response.error) {
        this.presentToast('No se pudo completar el registro del servicio.');
      } else {
        this.presentToast('El servicio se ha registrado correctamente.');
        this.navCtrl.setRoot(ProveedoresPage);
      }
    });
  }

  //hardcodeo solo para mostrar en presentacion y que va a quedar por siempre
  cambiarImagen(id_tipo_servicio) {
    switch (id_tipo_servicio) {
      case '1': this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/piscinas.png');
        break;
      case '2': this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/jardineria.png');
        break;
      case '3': this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/plomero.png');
        break;
      case '4': this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/gasista.png');
        break;
      case '5': this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/fumigacion.png');
        break;
      case '6': this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/otros.png');
        break;
      default: this.formProveedor.controls['avatar'].setValue('assets/img/pruebas/proveedores/piscinas.png');
        break;
    }

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
        const alertMessage = this.alertCtrl.create({
          title: 'Sin conexión',
          message: 'No se pudo cargar los servicios',
          buttons: ['Ok']
        });
        alertMessage.present();
      } else {
        this.tipos_servicio = response.data;
      }
    });
  }

  servicioSeleccionado(tipo_servicio) {
    this.formProveedor.value.id_tipo_servicio = tipo_servicio;
    this.cambiarImagen(tipo_servicio);
  }

  ngOnInit() {
    this.cargarTiposDeServicio();
  }

}