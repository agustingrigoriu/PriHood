import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavParams, AlertController } from 'ionic-angular';
import { Residencia } from '../../../app/models/residencia.model'
import { Barrio } from '../../../app/models/barrio.model'

@Component({
  templateUrl: 'registroUsuario.html'

})

export class RegistroUsuarioPage {
  public barrio: Barrio;
  public residencia: Residencia;

  constructor(public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.barrio = navParams.get("barrio");
    this.residencia = navParams.get("residencia");
    this.presentToast();
  }

  registrarUsuario() {
    let alert = this.alertCtrl.create({
      title: 'Registro de usuario',
      message: 'Estamos trabajando en su construccion',
      buttons: ['Ok']
    });
    alert.present()
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Código de verificación correcto',
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}