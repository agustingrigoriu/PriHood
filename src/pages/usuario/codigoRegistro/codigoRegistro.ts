import { Component } from '@angular/core';
import { Platform, NavParams, ViewController, NavController, AlertController } from 'ionic-angular';
import { RegistroUsuarioPage } from '../registroUsuario/registroUsuario';

@Component({
  templateUrl: 'codigoRegistro.html'
})
export class CodigoRegistroPage {

  private codigoRegistro;

  constructor(public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public alertCtrl: AlertController) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  verificarCodigo() {
    if (this.codigoRegistro == '1234-5678') {
      let idBarrio = 1234;
      let idResidencia = 5678;
      this.pushRegistroUsuarioPage(idBarrio, idResidencia);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Código invalido',
        message: 'El código introducido no existe, inténtalo nuevamente o comunicate con el administrador de tu barrio.',
        buttons: ['Ok']
      });
      alert.present()
    }
  }

  pushRegistroUsuarioPage(idBarrio, idResidencia ) {
    this.navCtrl.push(RegistroUsuarioPage, {
      idBarrio: idBarrio,
      idResidencia: idResidencia
    });
  }


}