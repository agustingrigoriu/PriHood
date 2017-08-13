import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { VisitasPage } from '../visitas/visitas'

@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController) {
  }

  pushPageVisitas(){
    this.navCtrl.push(VisitasPage);
  }

}
