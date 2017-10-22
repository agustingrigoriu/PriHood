import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { CarpoolingService } from '../../carpooling.service';
import { Viaje } from '../../../../app/models/viaje.model';

@Component({
  selector: 'detalleMiSolicitud',
  templateUrl: 'detalleMiSolicitud.html'
})

export class DetalleMiSolicitudPage {

  public viaje: Viaje;

  constructor(
    public navCtrl: NavController,
    public paramsCtrl: NavParams,
    public CarpoolingService: CarpoolingService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {
    this.viaje = <Viaje>(paramsCtrl.get('viaje'));
  }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

  solicitarViajeConfirmar() {
    const confirm = this.alertCtrl.create({
      title: '¿Solicitar compartir el viaje?',
      message: `Te avisaremos cuando ${this.viaje.resitente} acepte tu solicitud.`,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Solicitar',
          handler: () => {
            this.solicitarViaje();
          }
        }
      ]
    });
    confirm.present();
  }

  async solicitarViaje() {
    try {
      const response = await this.CarpoolingService.registrarSolicitud(this.viaje);

      if (response.error) {
        throw 'error';
      }

      const toast = this.toastCtrl.create({
        message: 'Se creó la solicitud de viaje correctamente.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

      this.navCtrl.popToRoot();
    } catch (error) {
      alert('No se pudo solicitar el viaje.');
    }
  }

}