import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavParams, AlertController } from 'ionic-angular';
import { RegistroUsuarioService } from './registroUsuario.service';
import { Residencia } from '../../../app/models/residencia.model';
import { Barrio } from '../../../app/models/barrio.model';
import { Persona } from '../../../app/models/persona.model';
import { Usuario } from '../../../app/models/usuario.model';
import { Residente } from '../../../app/models/residente.model';

@Component({
  templateUrl: 'registroUsuario.html'
})

export class RegistroUsuarioPage {
  public barrio: Barrio;
  public residencia: Residencia;

  constructor(public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private RegistroUsuarioService: RegistroUsuarioService) {
    this.barrio = navParams.get("barrio");
    this.residencia = navParams.get("residencia");
    this.presentToast();
  }

  registrarUsuario(nombre, apellido, idTipoDocumento, numeroDocumento, telefono, fechaNacimiento, email, password) {
    const persona: Persona = {
      nombre: nombre,
      apellido: apellido,
      idTipoDocumento: idTipoDocumento,
      numeroDocumento: numeroDocumento,
      telefono: telefono,
      fechaNacimiento: fechaNacimiento
    };
    const usuario: Usuario = {
      email: email,
      password: password
    };
    const residente: Residente = {
      idResidencia: this.residencia.id,
    };

    this.RegistroUsuarioService.registrarUsuario({ persona: persona, usuario: usuario, residente: residente })
      .then(response => {
        if (response.error) {
          alert('No se pudo completar el registro de usuario.');
        } else {
          alert('El usuario se ha registrado correctamente.');
        }
      });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Código de verificación correcto',
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
}