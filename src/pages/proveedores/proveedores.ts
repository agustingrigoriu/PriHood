import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
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

  constructor(private ProveedorService: ProveedorService, public navCtrl: NavController, public alertCtrl: AlertController, public loadingController: LoadingController) { }

  pageRegistrarProveedor() {
    this.navCtrl.push(RegistroProveedorPage);
  }

  servicioSeleccionado(tipo_servicio) {
    const loading = this.loadingController.create();
    loading.present();
    this.ProveedorService.getProveedoresTipoServicio(tipo_servicio).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.proveedores = response.data;
      }
      loading.dismiss();
    });
  }

  actualizar(tipo_servicio) {
    if (tipo_servicio === undefined) {
      this.ProveedorService.getProveedores().then(response => {
        if (response.error) {
          this.alertaError();
        } else {
          this.proveedores = response.data;
        }
      });
    } else {
      this.servicioSeleccionado(tipo_servicio);
    }
  }

  cargarTiposDeServicio() {
    const loading = this.loadingController.create();
    loading.present();
    this.ProveedorService.getTiposServicios().then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.tipos_servicio = response.data;
      }
      loading.dismiss();
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

  alertaError() {
    const alertMessage = this.alertCtrl.create({
      title: 'Error',
      message: 'Problemas de conexión. Intente nuevamente',
      buttons: ['Ok']
    });
    alertMessage.present();
  }

  onInput(textoBuscado: any) {
  }

  ngOnInit() {
    this.cargarTiposDeServicio();
    this.actualizar(this.tipo_servicio);
  }

}