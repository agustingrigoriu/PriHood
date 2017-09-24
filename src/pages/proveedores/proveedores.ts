import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProveedorService } from './proveedores.service';
import { RegistroProveedorPage } from './registroProveedor/registroProveedor';
import { ValorarProveedorPage } from './valorarProveedor/valorarProveedor';


@Component({
  selector: 'proveedores',
  templateUrl: 'proveedores.html'

})
export class ProveedoresPage {

  private tipos_servicio: any[] = [];
  private proveedores: any[] = [];
  private tipo_servicio: any;
  private proveedorSeleccionado: any;

  constructor(private ProveedorService: ProveedorService, public navCtrl: NavController) {}

  pageRegistrarProveedor() {
    this.navCtrl.push(RegistroProveedorPage);
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

  onSelectProveedor(proveedorSeleccionado) {

    this.proveedorSeleccionado = proveedorSeleccionado;
    this.pageValorarProveedor();
  }

  pageValorarProveedor() {
    this.navCtrl.push(ValorarProveedorPage, {
      proveedor: this.proveedorSeleccionado
    });;
  }

  onInput(textoBuscado: any) {
  }

  ngOnInit() {
    this.cargarTiposDeServicio();
    this.actualizar(this.tipo_servicio);
  }

}