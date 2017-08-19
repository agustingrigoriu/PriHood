import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'registroVisita.html'
})

export class RegistroVisitaPage {

  constructor(public navCtrl: NavController) {
  }

  volver(){
    this.navCtrl.pop();
  }

  registrarVisita(){
    
  }

}