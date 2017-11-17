import { Component, ViewChild } from '@angular/core';
import { Content, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { EventosService } from '../eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EventosPage } from '../eventos';
import { Evento } from '../../../app/models/evento.model';


@Component({
  selector: 'registrarEvento',
  templateUrl: 'registrarEvento.html'
})

export class RegistrarEventoPage {
  @ViewChild(Content) content: Content;

  formEvento: FormGroup;
  private tipos_eventos: any[] = [];
  private userInfo;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public EventosService: EventosService,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController) {

    this.formEvento = formBuilder.group({
      id_tipo_evento: ['', Validators.compose([Validators.required])],
      titulo: ['', Validators.compose([Validators.maxLength(40), Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
      fecha: [new Date().toISOString(), Validators.compose([Validators.required])],
      hora_desde: ['', Validators.compose([Validators.required])],
      hora_hasta: [''],
      imagen: ['', Validators.compose([Validators.required])]
    });
  }

  registrarEvento() {
    const loading = this.loadingController.create();
    loading.present();

    this.EventosService.registrarEvento(this.formEvento.value).then(response => {
      if (response.error) {
        this.presentToast('No se pudo completar el registro del evento.');
      } else {
        this.presentToast('El evento se ha registrado correctamente.');
        this.navCtrl.setRoot(EventosPage);
      }
      loading.dismiss();
    });
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

  volver() {
    this.navCtrl.pop();
  }

  cargarTiposDeEvento() {
    const loading = this.loadingController.create();
    loading.present();
    this.EventosService.getTiposEventos().then(response => {
      if (response.error) {
        this.alertaError();
      } else {
        this.tipos_eventos = response.data;
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

  ionViewWillEnter() {
    this.cargarTiposDeEvento();
  }

}