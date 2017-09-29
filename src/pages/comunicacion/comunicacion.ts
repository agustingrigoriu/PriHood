import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Publicacion } from '../../app/models/publicacion.model';
import { ComunicacionService } from './comunicacion.service';
import { LoginService } from '../../services/login.service';
import { DetallePublicacionPage } from './detallePublicacion/detallePublicacion';
import { MensajeDirectoPage } from './mensajeDirecto/mensajeDirecto';
@Component({
  selector: 'comunicacion',
  templateUrl: 'comunicacion.html'

})
export class ComunicacionPage {

  private publicaciones: Publicacion[];
  private publicacionSeleccionada: Publicacion;
  private nombre_barrio;

  constructor(private ComunicacionService: ComunicacionService,
    public navCtrl: NavController, private LoginService: LoginService) { }

  actualizar() {
    this.nombre_barrio = this.LoginService.getSession().barrio.nombre;
    this.ComunicacionService.getPublicaciones().then(response => {
      if (response.error) {
        alert('No se lograron obtener publicaciones');
      } else {
        this.publicaciones = response.data;
      }
    });
  }

  detallesPublicacion(publicacionSeleccionada: Publicacion) {
    this.publicacionSeleccionada = publicacionSeleccionada;
    this.navCtrl.push(DetallePublicacionPage, {
      publicacion: this.publicacionSeleccionada
    });;
  }

  mensajesDirectos() {
    this.navCtrl.push(MensajeDirectoPage);
  }

  ionViewWillEnter() {
    this.actualizar();
  }

}