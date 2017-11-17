import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ToastController } from 'ionic-angular';

import { Evento } from '../../app/models/evento.model';
import { DetalleEventoPage } from './detalleEvento/detalleEvento';
import { AsistenciaEventoPage } from './asistenciaEvento/asistenciaEvento';
import { RegistrarEventoPage } from './registrarEvento/registrarEvento';
import { EventosService } from './eventos.service';

@Component({
  selector: 'eventos',
  templateUrl: 'eventos.html'

})
export class EventosPage {

  private eventos: any[] = [];
  private eventoSeleccionado: any;

  constructor(private EventosService: EventosService,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingController: LoadingController) { }

  registrarEventoPage() {
    this.navCtrl.push(RegistrarEventoPage);;
  }

  comentariosEvento(eventoSeleccionado: any) {
    this.eventoSeleccionado = eventoSeleccionado;
    this.navCtrl.push(DetalleEventoPage, {
      evento: this.eventoSeleccionado
    });;
  }

  actualizar() {
    const loading = this.loadingController.create();
    loading.present();
    this.EventosService.getEventos().then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.eventos = response.data;
      }
      loading.dismiss();
    });
  }

  alertaError() {
    const alertMessage = this.alertCtrl.create({
      title: 'Error',
      message: 'Problemas de conexión. Intente nuevamente',
      buttons: ['Ok']
    });
    alertMessage.present();
  }

  asistenEvento(eventoSeleccionado: any) {
    this.eventoSeleccionado = eventoSeleccionado;
    this.navCtrl.push(AsistenciaEventoPage, {
      evento: this.eventoSeleccionado
    });;
  }

  confirmarAsistencia(eventoSeleccionado: any) {
    this.eventoSeleccionado = eventoSeleccionado;
    let confirm = this.alertCtrl.create({
      title: 'Confirmación de asistencia',
      message: '¿Confirma su asistencia al evento ' + eventoSeleccionado.titulo + '?',
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.asistir(eventoSeleccionado.id_evento);
          }
        }
      ]
    });
    confirm.present();
  }

  async asistir(id_evento: number) {
    try {
      const response = await this.EventosService.confirmarAsistencia(id_evento);
      if (response.error) throw 'error';
      this.presentToast('Se ha confirmado su asistencia.');
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Asistencia no confirmada',
        message: 'No es posible confirmar su asistencia',
        buttons: ['Ok']
      });
      alertMessage.present();
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


  ionViewWillEnter() {
    this.actualizar();
  }

}