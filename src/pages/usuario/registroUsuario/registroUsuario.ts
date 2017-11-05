import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { NavParams, AlertController, NavController } from 'ionic-angular';

import { RegistroUsuarioService } from './registroUsuario.service';
import { Residencia } from '../../../app/models/residencia.model';
import { Barrio } from '../../../app/models/barrio.model';

import { LoginPage } from '../../login/login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'registroUsuario.html'
})

export class RegistroUsuarioPage {
  public barrio: Barrio;
  public residencia: Residencia;

  avatar = '/assets/img/pruebas/visitas/lucas.png';

  form: FormGroup;

  constructor(public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private RegistroUsuarioService: RegistroUsuarioService,
    private navCtrl: NavController, public formBuilder: FormBuilder) {
    this.barrio = navParams.get("barrio");
    this.residencia = navParams.get("residencia");

    this.form = formBuilder.group({
      nombreUsuario: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      apellidoUsuario: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      emailUsuario: ['', Validators.compose([Validators.email, Validators.required])],
      passwordUsuario: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      confirmacionPasswordUsuario: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      fechaNacimientoUsuario: ['', Validators.compose([Validators.required])],
      telefonoUsuario: ['', Validators.compose([Validators.maxLength(20), Validators.pattern('[0-9]*'), Validators.required])],
      tipoDocumentoUsuario: ['', Validators.compose([Validators.required])],
      numeroDocumentoUsuario: ['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9]*'), Validators.required])]
    });

    this.presentToast('Código de verificación correcto');
  }

  registrarUsuario() {
    const usuario = {
      nombre: this.form.value.nombreUsuario,
      apellido: this.form.value.apellidoUsuario,
      id_tipo_documento: this.form.value.id_tipo_documento,
      numero_documento: this.form.value.numeroDocumentoUsuario,
      telefono: this.form.value.telefonoUsuario,
      fecha_nacimiento: this.form.value.fechaNacimientoUsuario,
      email: this.form.value.emailUsuario,
      password: this.form.value.passwordUsuario,
      id_residencia: this.residencia.id,
      avatar: this.avatar
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