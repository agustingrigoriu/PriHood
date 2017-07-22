import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-noRegistrado',
  templateUrl: 'noRegistrado.html'
})
export class NoRegistradoPage {

  constructor(public navCtrl: NavController) {

  }

  slides = [
    {
      title: "Comunicarse con el Administrador!",
      description: "Debes <b>comunicarte con la administracion</b> para ...",
    },
    {
      title: "Ver como explicar",
      description: "<b>Describir</b> la forma de obtener un usuario",
    }
  ];

}