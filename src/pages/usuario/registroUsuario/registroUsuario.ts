import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavParams, AlertController, NavController } from 'ionic-angular';

import { RegistroUsuarioService } from './registroUsuario.service';
import { Residencia } from '../../../app/models/residencia.model';
import { Barrio } from '../../../app/models/barrio.model';

import { LoginPage } from '../../login/login';

@Component({
  templateUrl: 'registroUsuario.html'
})

export class RegistroUsuarioPage {
  public barrio: Barrio;
  public residencia: Residencia;

  constructor(public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private RegistroUsuarioService: RegistroUsuarioService, private navCtrl: NavController) {
    this.barrio = navParams.get("barrio");
    this.residencia = navParams.get("residencia");

    this.presentToast('Código de verificación correcto');
  }

  registrarUsuario(nombre, apellido, idTipoDocumento, numeroDocumento, telefono, fechaNacimiento, email, password) {
    const usuario = {
      nombre: nombre,
      apellido: apellido,
      id_tipoDocumento: idTipoDocumento,
      nroDocumento: numeroDocumento,
      telefono: telefono,
      fecha_nacimiento: fechaNacimiento,
      email: email,
      password: password,
      id_residencia: this.residencia.id
    };

    this.RegistroUsuarioService.registrarUsuario(usuario).then(response => {
      if (response.error) {
        this.presentToast('No se pudo completar el registro de usuario.');
      } else {
        this.presentToast('El usuario se ha registrado correctamente.');
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}