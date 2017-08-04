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
      title: "Obtené tu código",
      description: "Debes <b>comunicarte con la administracion</b> de tu barrio para obtener el código de registro ",
      image: "assets/img/slides/tarjeta_codigoUsuario.png"
    }
  ];

}