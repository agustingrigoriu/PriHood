import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { RegistroProveedorPage } from './registroProveedor/registroProveedor';


@Component({
  selector: 'proveedores',
  templateUrl: 'proveedores.html'

})
export class ProveedoresPage {

  private tipos_servicio: any[] = [];
  private proveedores: any[] = [];


  constructor(public app: App) {
    this.cargaPrueba();
  }

  cargaPrueba() {
    this.tipos_servicio = [
      { id: "1", nombre: "Piscinas" },
      { id: "2", nombre: "Jardinería" },
      { id: "3", nombre: "Plomería" },
      { id: "4", nombre: "Gasista" },
      { id: "5", nombre: "Fumigación" },
      { id: "6", nombre: "Otros" }
    ];

    this.proveedores = [
      { id: "1", nombre: "Clima Pool Center", id_tipo_servicio: '1', telefono: '3514320098', direccion: 'Av. Bicentenario 2390', imagen: 'assets/img/pruebas/piscinas.png', descripcion: 'Nos dedicamos a mantenimiento, reparaciones, construcción y reformas de piscinas. Realizamos servicios de tratamiento del agua' },
      { id: "2", nombre: "Jardinería El Nogal", id_tipo_servicio: '2', telefono: '3514244400', direccion: 'Salta 420', imagen: 'assets/img/pruebas/jardineria.png', descripcion: 'Mantenimiento de espacios verdes en general, desmontes, desmalezados, poda de árboles, limpieza de terrenos baldíos' }
    ];
  }

  pageRegistrarProveedor() {
    this.app.getRootNav().push(RegistroProveedorPage);
  }

}