import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CodigoRegistroPage } from '../codigoRegistro/codigoRegistro';
import { AlertController, NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { QRScannerPage } from '../qrscanner/qrscanner';

@Component({
  selector: 'page-noRegistrado',
  templateUrl: 'noRegistrado.html'
})
export class NoRegistradoPage {

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    private qrScanner: QRScanner) {

  }

  ingresarCodigo() {
    let modal = this.modalCtrl.create(CodigoRegistroPage);
    modal.present();
  }

  volver() {
    this.navCtrl.pop();
  }

  escanearCodigo() {
    this.navCtrl.push(QRScannerPage);
  }

  slides = [
    {
      title: "Obtené tu código",
      description: "Debes <b>comunicarte con la administracion</b> de tu barrio para obtener el código de registro ",
      image: "assets/img/slides/tarjeta_codigoUsuario.png"
    }
  ];

}
