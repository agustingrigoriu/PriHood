import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Publicacion } from '../../app/models/publicacion.model';
import { ComunicacionService } from './comunicacion.service';

import { PublicacionesPage } from './publicaciones/publicaciones'
import { MensajeDirectoPage } from './mensajeDirecto/mensajeDirecto'

@Component({
  selector: 'comunicacion',
  templateUrl: 'comunicacion.html'

})
export class ComunicacionPage {

  publicacionesPage: any;
  mensajesPage: any;

  constructor() {
    this.publicacionesPage = PublicacionesPage;
    this.mensajesPage = MensajeDirectoPage;
  }


}