import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NoRegistradoPage } from '../usuario/noRegistrado/noRegistrado';
import { MenuPage } from '../menu/menu';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public loginService: LoginService) { }

  pushPageNoRegistrado() {
    this.navCtrl.push(NoRegistradoPage);
  }

  login(email: string, password: string) {
    this.loginService.postUserCredentials({ email, password }).then(response => {
      if (response.error) {
        const alertMessage = this.alertCtrl.create({
          title: 'Datos incorrectos',
          message: 'Compruebe nombre de usuario y contraseña ingresados',
          buttons: ['Ok']
        });
        alertMessage.present();
        return;
      }

      // guardo la session
      this.loginService.saveSession(response.data);

      // redirijo al usuario al menu principal
      this.navCtrl.push(MenuPage);
    });
  }
}
