import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Publicacion } from '../../app/models/publicacion.model';

import { MisSolicitudesPage } from './misSolicitudes/misSolicitudes';
import { NuevoCarpoolingPage } from './nuevoCarpooling/nuevoCarpooling';

@Component({
  selector: 'carpooling',
  templateUrl: 'carpooling.html'

})
export class CarpoolingPage {

  misSolicitudesPage: any;
  nuevoCarpoolingPage: any;

  constructor() {
    this.nuevoCarpoolingPage = NuevoCarpoolingPage;
    this.misSolicitudesPage = MisSolicitudesPage;
  }


}