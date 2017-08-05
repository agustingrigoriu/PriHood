import { Component } from '@angular/core';
import { ModalController} from 'ionic-angular';
import { CodigoRegistroPage } from '../codigoRegistro/codigoRegistro';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-noRegistrado',
  templateUrl: 'noRegistrado.html'
})
export class NoRegistradoPage {

  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController) {
    
  }

  ingresarCodigo() {
    let modal = this.modalCtrl.create(CodigoRegistroPage);
    modal.present();
  }

  escanearCodigo() {
    let alert = this.alertCtrl.create({
        title: 'Escanear codigoQR',
        message: 'Todavia no ha sido implementado.',
        buttons: ['Ok']
    });
    alert.present()
  }

  slides = [
    {
      title: "Obtené tu código",
      description: "Debes <b>comunicarte con la administracion</b> de tu barrio para obtener el código de registro ",
      image: "assets/img/slides/tarjeta_codigoUsuario.png"
    }
  ];

}
