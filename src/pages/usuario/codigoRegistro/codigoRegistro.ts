import { Component, OnInit } from '@angular/core';
import { Platform, NavParams, ViewController, NavController, AlertController } from 'ionic-angular';
import { RegistroUsuarioPage } from '../registroUsuario/registroUsuario';
import { CodigoRegistroService } from './codigoRegistro.service';
import { CodigoRegistroError } from '../../../app/models/error/codigoRegistroError.model'
import { Barrio } from '../../../app/models/barrio.model'
import { Residencia } from '../../../app/models/residencia.model'

@Component({
  templateUrl: 'codigoRegistro.html'
})
export class CodigoRegistroPage implements OnInit {

  private codigoRegistroError;

  residencia: Residencia;
  barrio: Barrio;

  constructor(
    private CodigoRegistroService: CodigoRegistroService,
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public alertCtrl: AlertController) {
    this.codigoRegistroError = new CodigoRegistroError();
  }

  verificarCodigo(codigoVerificacion: any) {
    this.CodigoRegistroService.verificarCodigo({ codigo_residencia: codigoVerificacion }).then(response => {
      if (response.error) {
        this.alertCodigoRegistroError();
      } else {
        this.residencia = response.data;
        this.barrio = response.data.idBarrioNavigation;
        this.pushRegistroUsuarioPage();
      }
    });
  }

  alertCodigoRegistroError() {
    let alert = this.alertCtrl.create({
      title: this.codigoRegistroError.title,
      message: this.codigoRegistroError.message,
      buttons: ['Ok']
    });
    alert.present()
  }

  pushRegistroUsuarioPage() {
    this.navCtrl.push(RegistroUsuarioPage, {
      barrio: this.residencia,
      residencia: this.barrio
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ngOnInit(): void {
  }

}