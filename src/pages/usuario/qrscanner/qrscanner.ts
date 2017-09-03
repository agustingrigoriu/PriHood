import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { CodigoRegistroService } from '../codigoRegistro/codigoRegistro.service';
import { RegistroUsuarioPage } from '../registroUsuario/registroUsuario';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'page-qr',
  templateUrl: 'qrscanner.html'
})
export class QRScannerPage {
  scanSub;

  constructor(public navCtrl: NavController,
    private CodigoRegistroService: CodigoRegistroService,
    public alertCtrl: AlertController,
    public qrScanner: QRScanner) {
  }

  errorVerificacionCodigo(message = null, title = null) {
    let alert = this.alertCtrl.create({
      title: title || 'Código no encontrado',
      message: message || 'No se ha podido escanear el código QR.',
      buttons: ['Ok']
    });
    alert.present();
  }

  verificarCodigo(codigoVerificacion: any) {
    this.CodigoRegistroService.verificarCodigo({ codigo_residencia: codigoVerificacion }).then(response => {
      if (response.error) {
        this.errorVerificacionCodigo('Código inválido.', 'Error con el QR');
        this.navCtrl.pop();
      } else {
        const residencia = response.data;
        const barrio = response.data.idBarrioNavigation;
        this.pushRegistroUsuarioPage(barrio, residencia);
      }
    });
  }

  pushRegistroUsuarioPage(barrio, residencia) {
    this.navCtrl.push(RegistroUsuarioPage, {
      barrio,
      residencia
    });
  }

  qrscanner() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.verificarCodigo(text);

            this.qrScanner.hide(); // hide camera preview
            this.scanSub.unsubscribe(); // stop scanning
          });

          this.qrScanner.resumePreview().then(a => console.log(a), a => console.log('error', a));
          this.qrScanner.show().then(a => console.log(a), a => console.log('error', a));
        } else if (status.denied) {
          this.errorVerificacionCodigo();
        }
      })
      .catch((e: any) => {
        this.errorVerificacionCodigo();
      });
  }

  ionViewWillEnter() {
    this.qrscanner();
  }

  ionViewWillLeave() {
    this.scanSub.unsubscribe();
  }
}
