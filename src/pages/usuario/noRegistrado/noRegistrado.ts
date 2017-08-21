import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { CodigoRegistroPage } from '../codigoRegistro/codigoRegistro';
import { AlertController, NavController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-noRegistrado',
  templateUrl: 'noRegistrado.html'
})
export class NoRegistradoPage {

  constructor(public modalCtrl: ModalController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private qrScanner: QRScanner) {

  }

  ingresarCodigo() {
    let modal = this.modalCtrl.create(CodigoRegistroPage);
    modal.present();
  }

  volver() {
    this.navCtrl.pop();
  }

  errorVerificacionCodigo() {
    let alert = this.alertCtrl.create({
      title: 'Código no encontrado',
      message: 'No se ha podido escanear el código QR.',
      buttons: ['Ok']
    });
    alert.present()
  }

  escanearCodigo() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          let scanSub = this.qrScanner.scan().subscribe((codigo: string) => {
            this.verificarCodigo(codigo);
            this.qrScanner.hide();
            scanSub.unsubscribe();
          });
          this.qrScanner.show();
        }
      })
      .catch((e: any) => this.errorVerificacionCodigo());
  }

  verificarCodigo(codigo: any) {
    console.log('Codigo escaneado: ' + codigo)
  }


  slides = [
    {
      title: "Obtené tu código",
      description: "Debes <b>comunicarte con la administracion</b> de tu barrio para obtener el código de registro ",
      image: "assets/img/slides/tarjeta_codigoUsuario.png"
    }
  ];

}
