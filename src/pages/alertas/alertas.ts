import { Component } from '@angular/core';
import { AlertasService } from './alertas.service'
import { NavController, AlertController, App } from 'ionic-angular';
import { TipoAlerta } from '../../app/models/tipoAlerta.model'

@Component({
  selector: 'alertas',
  templateUrl: 'alertas.html'
})

export class AlertasPage {

  private tipos_alertas: any[] = [];

  constructor(private AlertasService: AlertasService,
    public alertCtrl: AlertController) {
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
  }

  mensajeAdvertencia() {
    const alertMessage = this.alertCtrl.create({
      title: 'Advertencia!',
      message: 'Si emite una alerta se notificará inmediatamente a la seguridad del barrio para que actúe al respecto. No emita una alerta de manera innecesaria',
      buttons: ['Ok']
    });
    alertMessage.present();
  }

  confirmacionAlerta(tipoAlerta: TipoAlerta) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmación de Alerta',
      message: 'Está seguro que desea emitir la alerta?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Alertar',
          handler: () => {
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