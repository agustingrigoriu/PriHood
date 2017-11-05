import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { CarpoolingService } from '../carpooling.service';

@Component({
  selector: 'misOfrecimientos',
  templateUrl: 'misOfrecimientos.html'
})

export class MisOfrecimientosPage {

  private misOfrecimientosPendientes: any[];
  private misOfrecimientosAceptados: any[];
  private opcionSeleccionada: string;

  ofrecimientos: string = 'pendientes';

  constructor(public navCtrl: NavController, public CarpoolingService: CarpoolingService, public alertCtrl: AlertController, public toastCtrl: ToastController, public loadingController: LoadingController) { }

  actualizar() {
    this.misOfrecimientosPendientes = [];
    this.misOfrecimientosAceptados = [];

    const loading = this.loadingController.create();
    loading.present();

    this.CarpoolingService.getMisOfrecimientos().then(response => {
      if (response.error) {
        const alertMessage = this.alertCtrl.create({
          title: 'Error',
          message: 'Problemas de conexión. Intente nuevamente',
          buttons: ['Ok']
        });
        alertMessage.present();
      } else {
        for (let solcitudGrupo of response.data) {
          switch (solcitudGrupo.estado) {
            case 'Aceptada':
              this.misOfrecimientosAceptados = this.misOfrecimientosPendientes.concat(solcitudGrupo.grupo);
              break;
            case 'Pendiente':
              this.misOfrecimientosPendientes = solcitudGrupo.grupo;
              break;
          }
        }
      }
    })
    loading.dismiss();
  }

  ionViewWillEnter() {
    this.actualizar();
  }


  aceptarRechazarSolicitud(id_solicitud_viaje: number, estado_solicitud: string) {
    this.CarpoolingService.aceptarRechazarSolicitud(id_solicitud_viaje, estado_solicitud).then(response => {
      if (response.error) {
        this.presentToast('No se pudo realizar la operación seleccionada');
      } else {
        this.presentToast('Su elección se registró correctamente');
        this.actualizar();
      }
    });
  }

  confirmacionAceptarSolicitud(solicitud) {
    this.opcionSeleccionada = 'Aceptada';
    let confirm = this.alertCtrl.create({
      title: 'Confirmación de solicitud',
      message: 'Está seguro que desea aceptar la solicitud de ' + solicitud.nombre + '?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.aceptarRechazarSolicitud(solicitud.id, this.opcionSeleccionada)
          }
        }
      ]
    });
    confirm.present();
  }

  confirmacionRechazarSolicitud(solicitud) {
    this.opcionSeleccionada = 'Rechazada';
    let confirm = this.alertCtrl.create({
      title: 'Confirmación de solicitud',
      message: 'Está seguro que desea rechazar la solicitud de ' + solicitud.nombre + '?',
      buttons: [
        {
          text: 'No'
        },
        {
          text: 'Rechazar',
          handler: () => {
            this.aceptarRechazarSolicitud(solicitud.id, this.opcionSeleccionada)
          }
        }
      ]
    });
    confirm.present();
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