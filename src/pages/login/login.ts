import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NoRegistradoPage } from '../usuario/noRegistrado/noRegistrado'
import { MenuPage } from '../menu/menu'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  pushPageNoRegistrado() {
    this.navCtrl.push(NoRegistradoPage);
  }

  pushPageMenu(nombreUsuario: any, passwordUsuario: any) {
    if (nombreUsuario == 'lucas' && passwordUsuario == '123456') {
      this.navCtrl.push(MenuPage);
    } else {
      let alert = this.alertCtrl.create({
      title: 'Datos incorrectos',
      message: 'Compruebe nombre de usuario y contraseña ingresados',
      buttons: ['Ok']
    });
    alert.present()
    }
  }

}
