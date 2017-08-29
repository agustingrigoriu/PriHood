import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { ProveedorService } from './proveedores.service';
import { RegistroProveedorPage } from './registroProveedor/registroProveedor';


@Component({
  selector: 'proveedores',
  templateUrl: 'proveedores.html'

})
export class ProveedoresPage {

  private tipos_servicio: any[] = [];
  private proveedores: any[] = [];
  private tipo_servicio: any;

  constructor(private ProveedorService: ProveedorService, public app: App) {
  }

  /*this.proveedores = [
    { id: "1", nombre: "Clima Pool Center", id_tipo_servicio: '1', telefono: '3514320098', direccion: 'Av. Bicentenario 2390', imagen: 'assets/img/pruebas/piscinas.png', descripcion: 'Nos dedicamos a mantenimiento, reparaciones, construcción y reformas de piscinas. Realizamos servicios de tratamiento del agua' },
    { id: "2", nombre: "Jardinería El Nogal", id_tipo_servicio: '2', telefono: '3514244400', direccion: 'Salta 420', imagen: 'assets/img/pruebas/jardineria.png', descripcion: 'Mantenimiento de espacios verdes en general, desmontes, desmalezados, poda de árboles, limpieza de terrenos baldíos' }
  ];*/

  pageRegistrarProveedor() {
    this.app.getRootNav().push(RegistroProveedorPage);
  }

  servicioSeleccionado(tipo_servicio) {
    this.ProveedorService.getProveedoresTipoServicio(tipo_servicio).then(response => {
      if (response.error) {
        alert('No se logró obtener los servicios');
      } else {
        this.proveedores = response.data;
      }
    });
  }

  actualizar(tipo_servicio) {
    if (tipo_servicio === undefined) {
      this.ProveedorService.getProveedores().then(response => {
        if (response.error) {
          alert('No se logró obtener los servicios');
        } else {
          this.proveedores = response.data;
        }
      });
    } else {
      this.servicioSeleccionado(tipo_servicio);

    }
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

  noHayProveedores() {
    return (this.proveedores.length === 0);
  }

  onInput(textoBuscado: any) {

  }

  ngOnInit() {
    this.cargarTiposDeServicio();
    this.actualizar(this.tipo_servicio);
  }

}