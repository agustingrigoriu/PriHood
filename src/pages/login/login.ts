import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NoRegistradoPage } from '../noRegistrado/noRegistrado'
import { VisitasPage } from '../visitas/visitas'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  pushPage(){
    this.navCtrl.push(NoRegistradoPage);
  }

  pushPageVisitas(){
    this.navCtrl.push(VisitasPage);
  }

}
