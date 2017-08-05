import { Component } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'registroUsuario.html'

})

export class RegistroUsuarioPage {
  public idBarrio;
  public idResidencia;

  constructor(public navParams: NavParams, public alertCtrl: AlertController) {
    this.idBarrio = navParams.get("idBarrio");
    this.idResidencia = navParams.get("idResidencia");
  }

  registrarUsuario() {
    let alert = this.alertCtrl.create({
      title: 'Registro de usuario',
      message: 'Estamos trabajando en su construccion',
      buttons: ['Ok']
    });
    alert.present()
  }

}