import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VisitasPage } from '../visitas/visitas'
import { LoginPage } from '../login/login';
import { LoginService } from '../../services/login.service';

@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController, public loginService: LoginService) {
  }

  pushPageVisitas(){
    this.navCtrl.push(VisitasPage);
  }

  logout() {
    this.loginService.clearSession();
    this.navCtrl.setRoot(LoginPage);
  }

}
