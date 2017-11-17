import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ComentarioEvento } from '../../../app/models/comentarioEvento.model';
import { EventosService } from '../eventos.service';
import { AsistenciaEvento } from '../../../app/models/asistenciaEvento.model';

@Component({
  selector: 'asistenciaEvento',
  templateUrl: 'asistenciaEvento.html'
})

export class AsistenciaEventoPage {
  @ViewChild(Content) content: Content;

  public evento;
  public asistentes: AsistenciaEvento[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public EventosService: EventosService,
    public loadingController: LoadingController) {
    this.evento = navParams.get("evento");
  }

  volver() {
    this.navCtrl.pop();
  }

  actualizar() {
    const loading = this.loadingController.create();
    loading.present();
    this.EventosService.getAsistenciaEvento(this.evento.id_evento).then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.asistentes = response.data;
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

  noHayAsistentes() {
    return (this.asistentes.length === 0);
  }

  ionViewWillEnter() {
    this.actualizar();
  }

}