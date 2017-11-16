import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { VisitanteService } from '../visitas.service';
import { VisitasPage } from '../visitas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: 'registroVisita.html'
})

export class RegistroVisitaPage {

  formVisita: FormGroup;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams, private VisitanteService: VisitanteService,
    public toastCtrl: ToastController,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder) {
    const id_tv = navParams.get("id_Tab") + '';

    this.formVisita = formBuilder.group({
      id_tipo_visita: [id_tv],
      avatar: [],
      nombre: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      apellido: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      id_tipo_documento: ['', Validators.compose([Validators.required])],
      numero_documento: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[0-9]*'), Validators.required])],
      patente: ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[a-zA-Z0-9]*')])],
      observaciones: [''],
      fecha_visita: [new Date().toISOString()]
    });
  }

  volver() {
    this.navCtrl.pop();
  }

  registrarVisita() {
    const loading = this.loadingController.create();
    loading.present();
    
    this.VisitanteService.registrarVisita(this.formVisita.value).then(response => {
      if (response.error) {
        this.presentToast('No se pudo completar el registro de la visita.');
      } else {
        this.presentToast('La visita se ha registrado correctamente.');
        this.navCtrl.setRoot(VisitasPage);
      }
      loading.dismiss();
    });
  }

  esVisitaFrecuente() {
    return (this.formVisita.value.id_tipo_visita === '1');
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