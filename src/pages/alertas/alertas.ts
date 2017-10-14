import { Component } from '@angular/core';
import { AlertasService } from './alertas.service'
import { NavController, AlertController, ToastController, App } from 'ionic-angular';
import { TipoAlerta } from '../../app/models/tipoAlerta.model'
import { Alerta } from '../../app/models/alerta.model'

@Component({
  selector: 'alertas',
  templateUrl: 'alertas.html'
})

export class AlertasPage {

  private tipos_alertas: any[] = [];

  constructor(private AlertasService: AlertasService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, ) {
  }

  async getTiposAlertas() {
    try {
      const response = await this.AlertasService.getTiposAlertas();
      if (response.error) throw 'error';
      this.tipos_alertas = response.data;
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Sin conexión',
        message: 'No se pudieron obtener las alertas',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  sendAlerta(tipoAlerta: TipoAlerta) {
    const alerta = {
      idTipoAlerta: tipoAlerta.id, 
      descripcion: ''
    };
    this.AlertasService.generarAlerta(alerta).then(response => {
      if (response.error) {
        this.presentToast('No se pudo emitir la alerta.');
      } else {
        this.presentToast('Su alerta se emitió correctamente.');
      }
    })
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  mensajeAdvertencia() {
    const toast = this.toastCtrl.create({
      message: 'Advertencia! Si emite una alerta se notificará inmediatamente a la seguridad del barrio para que actúe al respecto. No emita una alerta de manera innecesaria',
      duration: 5000,
      position: 'bottom',
    });
    toast.present();
  }

  confirmacionAlerta(tipoAlerta: TipoAlerta) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmación de Alerta',
      message: 'Está seguro que desea emitir una alerta de ' + tipoAlerta.descripcion + '?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Alertar',
          handler: () => {
            this.sendAlerta(tipoAlerta);
          }
        }
      ]
    });
    confirm.present();
  }

  ionViewWillEnter() {
    this.getTiposAlertas();
    this.mensajeAdvertencia();
  }

}